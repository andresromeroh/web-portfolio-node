import { createClient } from 'redis';
import Logger from '../utilities/logger';
import ConfigService from './config.service';

class CacheService {
    private static _instance: CacheService;

    private client: RedisClient;
    private configService: ConfigService = new ConfigService();

    private constructor() {
        this.client = createClient(this.configService.getRedisCredentias());
        this.client.on('ready', () => Logger.info('Redis: Connection success!'));
        this.client.on('error', (error) => Logger.error(`Redis: ${JSON.stringify(error)}`));
    }

    public static get Instance(): CacheService {
        return this._instance || (this._instance = new this());
    }

    public set(key: string, value: any): void {
        this.client.setex(key, 1800, JSON.stringify(value));
    }

    public get(key: string, callback: any) {
        return this.client.get(key, callback);
    }
}

const singleton: CacheService = CacheService.Instance;

export default singleton;
