import { config } from 'dotenv';
import cors from 'cors';
import App from './app';

import rateLimitMiddleware from './middleware/rateLimit';
import loggerMiddleware from './middleware/logger';
import RepositoryController from './controllers/repository.controller';
import EmailController from './controllers/email.controller';
import BadgeController from './controllers/badge.controller';

config();

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
    ],
});

app.listen();
