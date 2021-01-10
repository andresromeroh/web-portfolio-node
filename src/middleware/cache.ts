import { Request, Response, NextFunction } from 'express';
import Cache from '../utils/cache';
import Logger from '../utils/logger';

const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.connection.remoteAddress}:${req.originalUrl}`;
    Logger.info(`Redis: Looking for ${key} in cache`);
    Cache.get(key, (err: Error, data: any) => {
        if (data) {
            Logger.info('Redis: Requested data found in cache');
            res.status(200).json(JSON.parse(data));
        } else {
            Logger.info(`Redis: Not found, saving ${key} to cache`);
            res.locals.cache = (content: any) => Cache.set(key, content);
            next();
        }
    });
};

export default cacheMiddleware;
