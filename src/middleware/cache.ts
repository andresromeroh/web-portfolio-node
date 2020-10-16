// import { Request, Response, NextFunction } from 'express';
// import cache from '../utils/cache';

// const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     cache.get(req.originalUrl, (err: Error, data: any) => {
//         if (data) {
//             res.status(200).json(JSON.parse(data));
//         } else {
//             next();
//         }
//     });
// };

// export default cacheMiddleware;
