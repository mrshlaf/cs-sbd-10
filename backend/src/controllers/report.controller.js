const Report = require('../models/report.model');
const redisClient = require('../database/redis');

const DEFAULT_EXPIRATION = 3600; // 1 hour in seconds

class ReportController {
  static async getTopUsers(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const cacheKey = `reports:top-users:${limit}`;

      // Check Redis cache
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log('Cache HIT for', cacheKey);
        return res.status(200).json({
          success: true,
          message: 'Top users retrieved successfully (from cache)',
          payload: JSON.parse(cachedData),
        });
      }

      console.log('Cache MISS for', cacheKey);
      const topUsers = await Report.getTopUsers(limit);

      // Store in Redis cache
      await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(topUsers));

      res.status(200).json({
        success: true,
        message: 'Top users retrieved successfully',
        payload: topUsers,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getItemsSold(req, res, next) {
    try {
      const cacheKey = 'reports:items-sold';

      // Check Redis cache
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log('Cache HIT for', cacheKey);
        return res.status(200).json({
          success: true,
          message: 'Items sold report retrieved successfully (from cache)',
          payload: JSON.parse(cachedData),
        });
      }

      console.log('Cache MISS for', cacheKey);
      const itemsSold = await Report.getItemsSold();

      // Store in Redis cache
      await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(itemsSold));

      res.status(200).json({
        success: true,
        message: 'Items sold report retrieved successfully',
        payload: itemsSold,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMonthlySales(req, res, next) {
    try {
      const year = parseInt(req.query.year) || new Date().getFullYear();
      const cacheKey = `reports:monthly-sales:${year}`;

      // Check Redis cache
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log('Cache HIT for', cacheKey);
        return res.status(200).json({
          success: true,
          message: 'Monthly sales retrieved successfully (from cache)',
          payload: JSON.parse(cachedData),
        });
      }

      console.log('Cache MISS for', cacheKey);
      const monthlySales = await Report.getMonthlySales(year);

      // Store in Redis cache
      await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(monthlySales));

      res.status(200).json({
        success: true,
        message: 'Monthly sales retrieved successfully',
        payload: monthlySales,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;