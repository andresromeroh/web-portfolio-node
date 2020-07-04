import { Request, Response } from 'express';
import logger from '../utils/logger';

const loggerMiddleware = (req: Request, resp: Response, next) => {
    logger.info(`Request: ${req.method} ${req.path}, Body: ${req.body || null}`);
    next();
}

export default loggerMiddleware;