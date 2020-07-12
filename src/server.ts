import App from './app';

import rateLimitMiddleware from './middleware/rateLimit';
import loggerMiddleware from './middleware/logger';
import RepositoryController from './controllers/repository.controller';
import EmailController from './controllers/email.controller';
import cacheMiddleware from './middleware/cache';

const app = new App({
    port: 5000,
    controllers: [
        new RepositoryController(),
        new EmailController(),
    ],
    middleWares: [
        rateLimitMiddleware,
        cacheMiddleware,
        loggerMiddleware,
    ],
});

app.listen();
