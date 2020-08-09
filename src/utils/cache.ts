import { RedisClient } from 'redis';
import { config } from 'dotenv';

config();

class Cache {
    private static _instance: Cache;

    private client: RedisClient;

    private constructor() {
        if (process.env.REDIS_HOST) { // running locally
            this.client = new RedisClient({
                host: process.env.REDIS_HOST,
            });
        } else {
            this.client = new RedisClient({
                url: process.env.REDIS_URL,
            });
        }
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
