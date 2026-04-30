const TransactionService = require('../services/transaction.service');
const redisClient = require('../database/redis');

class TransactionController {
  // Soal 4: Logging Transaksi menggunakan Redis Streams
  static async createTransaction(req, res, next) {
    try {
      const { user_id, item_id, quantity, description } = req.body;
      const transaction = await TransactionService.createTransaction({ user_id, item_id, quantity, description });

      // Logging ke Redis Stream 'transaction-logs' menggunakan XADD
      // Pesan wajib berisi: userId, itemId, dan total transaksi
      try {
        const messageId = await redisClient.xAdd(
          'transaction-logs',
          '*',
          {
            userId: user_id.toString(),
            itemId: item_id.toString(),
            total: transaction.total.toString()
          }
        );
        console.log(`Transaction logged to Redis Stream. Message ID: ${messageId}`);
      } catch (redisError) {
        console.error('Failed to log to Redis Stream:', redisError);
        // Kita tidak menghentikan respon hanya karena logging redis gagal
      }

      res.status(201).json({
        success: true,
        message: 'Transaction created successfully',
        payload: transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransactionById(req, res, next) {
    try {
      const { id } = req.params;
      const transaction = await TransactionService.getTransactionById(id);
      res.status(200).json({
        success: true,
        message: 'Transaction retrieved successfully',
        payload: transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  static async payTransaction(req, res, next) {
    try {
      const { id } = req.params;
      await TransactionService.payTransaction(id);

      res.status(200).json({
        success: true,
        message: 'Payment successful',
        payload: {
          transaction_id: id,
          status: 'paid',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTransaction(req, res, next) {
    try {
      const { id } = req.params;
      await TransactionService.deleteTransaction(id);

      res.status(200).json({
        success: true,
        message: 'Transaction deleted successfully',
        payload: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;