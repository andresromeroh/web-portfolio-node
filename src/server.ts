import { config } from 'dotenv';
import App from './app';

import rateLimitMiddleware from './middleware/rateLimit';
import loggerMiddleware from './middleware/logger';
import RepositoryController from './controllers/repository.controller';
import EmailController from './controllers/email.controller';
import BadgeController from './controllers/badge.controller';
import cacheMiddleware from './middleware/cache';

config();

const app = new App({
    port: Number(process.env.PORT),
    controllers: [
        new RepositoryController(),
        new EmailController(),
        new BadgeController(),
    ],
    middleWares: [
        rateLimitMiddleware,
        cacheMiddleware,
        loggerMiddleware,
    ],
});

app.listen();
