import App from './app';

import loggerMiddleware from './middleware/logger';
import RepositoryController from './controllers/repository.controller';

const app = new App({
    port: 5000,
    controllers: [
        new RepositoryController()
    ],
    middleWares: [
        loggerMiddleware
    ]
})

app.listen();