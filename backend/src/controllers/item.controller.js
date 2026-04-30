const ItemService = require('../services/item.service');
const redisClient = require('../database/redis');

const DEFAULT_EXPIRATION = 3600; // 1 hour in seconds

class ItemController {
  static async getAllItems(req, res, next) {
    try {
      const cacheKey = 'items:all';

      // Check Redis cache
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log('Cache HIT for', cacheKey);
        return res.status(200).json({
          success: true,
          message: 'Items retrieved successfully (from cache)',
          payload: JSON.parse(cachedData),
        });
      }

      console.log('Cache MISS for', cacheKey);
      const items = await ItemService.getAllItems();

      // Store in Redis cache
      await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(items));

      res.status(200).json({
        success: true,
        message: 'Items retrieved successfully',
        payload: items,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getItemById(req, res, next) {
    try {
      const { id } = req.params;
      const cacheKey = `item:${id}`;

      // Check Redis cache
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log('Cache HIT for', cacheKey);
        return res.status(200).json({
          success: true,
          message: 'Item retrieved successfully (from cache)',
          payload: JSON.parse(cachedData),
        });
      }

      console.log('Cache MISS for', cacheKey);
      const item = await ItemService.getItemById(id);

      // Store in Redis cache
      await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(item));

      res.status(200).json({
        success: true,
        message: 'Item retrieved successfully',
        payload: item,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createItem(req, res, next) {
    try {
      const { name, price, stock } = req.body;
      const item = await ItemService.createItem({ name, price, stock });

      // Invalidate items cache when a new item is created
      await redisClient.del('items:all');

      res.status(201).json({
        success: true,
        message: 'Item created successfully',
        payload: item,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateItem(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const item = await ItemService.updateItem(id, updateData);

      // Invalidate both the specific item cache and all items cache
      await redisClient.del(`item:${id}`);
      await redisClient.del('items:all');

      res.status(200).json({
        success: true,
        message: 'Item updated successfully',
        payload: item,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ItemController;