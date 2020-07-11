import App from './app';

import loggerMiddleware from './middleware/logger';
import RepositoryController from './controllers/repository.controller';
import EmailController from './controllers/email.controller';

const app = new App({
    port: 5000,
    controllers: [
        new RepositoryController(),
        new EmailController(),
    ],
    middleWares: [
        loggerMiddleware,
    ],
});

app.listen();
