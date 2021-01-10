import { RedisClient } from 'redis';
import Logger from './logger';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

class Cache {
    private static _instance: Cache;

    private client: RedisClient;

    private constructor() {
        this.client = new RedisClient({
            host: REDIS_HOST,
            port: Number(REDIS_PORT),
            password: REDIS_PASSWORD,
        });
        this.client.on('ready', () => Logger.info('Redis: Connection success!'));
        this.client.on('error', (e) => Logger.error(`Redis: ${JSON.stringify(e)}`));
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public set(key: string, value: any) { // 30 minutes
        this.client.setex(key, 1800, JSON.stringify(value));
    }

    public get(key: string, callback: any) {
        return this.client.get(key, callback);
    }
}

const singleton = Cache.Instance;
export default singleton;
