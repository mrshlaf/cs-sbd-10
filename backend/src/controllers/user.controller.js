const UserService = require('../services/user.service');
const redisClient = require('../database/redis');
const { AppError } = require('../middleware/errorHandler');

class UserController {
  static async register(req, res, next) {
    try {
      const { name, username, email, phone, password } = req.body;
      const user = await UserService.register({ name, username, email, phone, password });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        payload: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      res.status(200).json({
        success: true,
        message: 'Login successful',
        payload: result.user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Soal 2: Implementasi Caching pada Endpoint GET /user/:email
  // Strategi: Cache-Aside (Lazy Loading)
  static async getUserByEmail(req, res, next) {
    try {
      const { email } = req.params;
      const cacheKey = `user:${email}`;

      // Cek apakah data ada di Redis cache
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        // Cache HIT - data ditemukan di Redis
        console.log('Cache HIT for', cacheKey);
        return res.status(200).json({
          success: true,
          message: 'User retrieved successfully (from cache)',
          payload: JSON.parse(cachedData),
        });
      }

      // Cache MISS - data tidak ditemukan di Redis, ambil dari PostgreSQL
      console.log('Cache MISS for', cacheKey);
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      // Simpan ke Redis dengan EX (expiration) 60 detik
      await redisClient.setEx(cacheKey, 60, JSON.stringify(user));

      res.status(200).json({
        success: true,
        message: 'User retrieved successfully (from database)',
        payload: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Soal 3: Cache Invalidation pada Update User
  // Setelah update berhasil, hapus key user:{email} dari Redis agar data tidak stale
  static async updateProfile(req, res, next) {
    try {
      const { id, name, username, email, phone, password, balance } = req.body;
      const updatedUser = await UserService.updateProfile(id, { name, username, email, phone, password, balance });

      // Cache Invalidation: Hapus key user:{email} dari Redis
      // agar data yang di-cache tidak usang (stale data)
      if (email) {
        await redisClient.del(`user:${email}`);
        console.log(`Cache invalidated for user:${email}`);
      }

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        payload: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionHistory(req, res, next) {
    try {
      const userId = req.query.user_id || req.user?.userId || 1;
      const history = await UserService.getTransactionHistory(userId);
      res.status(200).json({
        success: true,
        message: 'Transaction history retrieved',
        payload: history,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTotalSpent(req, res, next) {
    try {
      const userId = req.query.user_id || req.user?.userId || 1;
      const totalSpent = await UserService.getTotalSpent(userId);
      res.status(200).json({
        success: true,
        message: 'Total spent retrieved',
        payload: { total_spent: totalSpent },
      });
    } catch (error) {
      next(error);
    }
  }

  static async topUpBalance(req, res, next) {
    try {
      const { amount } = req.body;
      const userId = req.user.userId;

      if (!amount || amount <= 0) {
        throw new AppError('Invalid top-up amount', 400);
      }

      const user = await UserService.getUserById(userId);
      const newBalance = user.balance + amount;
      
      const updatedUser = await UserService.updateProfile(userId, { balance: newBalance });

      res.status(200).json({
        success: true,
        message: `Successfully topped up ${amount}`,
        payload: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;