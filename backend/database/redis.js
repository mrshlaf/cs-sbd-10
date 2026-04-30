const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379
    }
});

redisClient.on('error', (err) =>
    console.log('Redis Client Error', err));

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