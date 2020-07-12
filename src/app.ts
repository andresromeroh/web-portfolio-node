import express, { Application, Request, Response } from 'express';

import figlet from 'figlet';
import chalk from 'chalk';

class App {
    public app: Application;

    public port: Number;

    constructor(options: { port: Number, middleWares: Array<any>, controllers: Array<any> }) {
        this.app = express();
        this.port = options.port;

        this.app.set('trust proxy', true);
        this.app.set('strict routing', true);
        this.middlewares(options.middleWares);
        this.routes(options.controllers);

        this.health();
        this.assets();
        this.template();
    }

    private middlewares(middleWares: Array<any>) {
        this.app.use(express.json()); // equals to bodyParser.json()
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: Array<any>) {
        controllers.forEach((controller) => {
            this.app.use('/api/v1', controller.router);
        });
    }

    private health() {
        this.app.get('/api/v1/health', (req: Request, res: Response) => res.json({ status: 'UP' }));
    }

    private assets() {
        this.app.use(express.static('public'));
        this.app.use(express.static('views'));
    }

    private template() {
        this.app.set('view engine', 'ejs');
    }

    public listen() {
        figlet('Express JS v4.17.1', (err, data) => console.log(chalk.greenBright(data)));
        this.app.listen(this.port, async () => {
            console.log(chalk.blueBright(`App listening on http://localhost:${this.port}`));
        });
    }
}

export default App;
