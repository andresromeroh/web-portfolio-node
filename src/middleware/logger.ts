import { Request, Response } from 'express';
import logger from '../utils/logger';

const loggerMiddleware = (req: Request, resp: Response, next) => {
    logger.trace(`Request: ${req.method} ${req.path}, Body: ${JSON.stringify(req.body, null, 4)}`);
    next();
}

export default loggerMiddleware;