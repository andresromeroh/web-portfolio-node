import { RedisClient } from 'redis';
import { config } from 'dotenv';

config();
const { REDIS_URL } = process.env;

class Cache {
    private static _instance: Cache;

    private client: RedisClient;

    private constructor() {
        this.client = new RedisClient({
            host: REDIS_URL,
        });
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public set(key: string, value: any) { // defaults to 30 minutes of caching
        this.client.setex(`__cache__${key}`, 1800, JSON.stringify(value));
    }

    public get(key: string, callback: any) {
        return this.client.get(`__cache__${key}`, callback);
    }
}

const singleton = Cache.Instance;
export default singleton;
