import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import CacheService from '../services/cache.service';
import Logger from '../utilities/logger';

const getKeyFromRequest = (req: Request) => `${req.connection.remoteAddress}::${req.originalUrl}`;

const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const key = getKeyFromRequest(req);
    CacheService.get(key, (err: Error, data: any) => {
        if (data && !err) {
            Logger.info(`[Redis]: Requested data ${key} found in cache`);
            res.status(HttpStatus.OK).json(JSON.parse(data));
        } else {
            Logger.info(`[Redis]: Not found, saving ${key} to cache`);
            res.locals.cache = (content: any) => CacheService.set(key, content);
            next();
        }
    });
};

export default cacheMiddleware;
