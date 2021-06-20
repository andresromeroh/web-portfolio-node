import rateLimit from 'express-rate-limit';

const THIRTY_MIN_MS: number = 150000;

const rateLimitMiddleware: any = rateLimit({
    max: 100,
    statusCode: 429,
    windowMs: THIRTY_MIN_MS,
});

export default rateLimitMiddleware;
