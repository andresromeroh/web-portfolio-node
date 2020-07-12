import rateLimit from 'express-rate-limit';

const rateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests
    message: JSON.parse('{ "error": "Too many requests" }'),
    statusCode: 429,
});

export default rateLimitMiddleware;
