import App from './app';

const app = new App({
    port: 5000,
    controllers: [
        // TODO: Add application controllers
    ],
    middleWares: [
        // TODO: Add application middlewares
    ]
})

app.listen();