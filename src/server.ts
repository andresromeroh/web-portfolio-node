import dotenv from 'dotenv';
import cors from 'cors';
import App from './app';

dotenv.config();

import rateLimitMiddleware from './middleware/rateLimit';
import loggerMiddleware from './middleware/logger';
import cacheMiddleware from './middleware/cache';
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
        cors(),
        rateLimitMiddleware,
        loggerMiddleware,
        cacheMiddleware,
    ],
});

app.listen();
