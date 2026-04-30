const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379
    }
});

redisClient.on('error', (err) => {
    console.log('Redis Client Error (Optional)', err.message);
    // Silent error in production to prevent crash if Redis is not critical
});

redisClient.on('connect', () =>
    console.log('Redis Client Connected'));

redisClient.on('ready', () =>
    console.log('Redis Client Ready'));

const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log('Redis Connected');
    }
}

connectRedis();

module.exports = redisClient;
