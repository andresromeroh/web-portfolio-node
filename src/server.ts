import App from './app';
import rateLimitMiddleware from './middleware/rateLimit';
import loggerMiddleware from './middleware/logger';
import cacheMiddleware from './middleware/cache';
import crossOriginMiddleware from './middleware/crossOrigin';
import RepositoryController from './controllers/repository.controller';
import EmailController from './controllers/email.controller';
import BadgeController from './controllers/badge.controller';

const app = new App({
    port: Number(process.env.PORT),
    controllers: [
        new RepositoryController(),
        new EmailController(),
        new BadgeController(),
    ],
    middleWares: [
        crossOriginMiddleware,
        rateLimitMiddleware,
        loggerMiddleware,
        cacheMiddleware,
    ],
});

app.listen();
