import express from 'express';
import { Application, json } from 'express';
import figlet from 'figlet';
import chalk from 'chalk';

class App {
    public app: Application;
    public port: Number;
    public parser: any;

    constructor(options: { port: Number, middleWares: Array<any>, controllers: Array<any> }) {
        this.app = express();
        this.port = options.port;
        this.parser = json;

        this.middlewares(options.middleWares);
        this.routes(options.controllers);

        this.assets();
        this.template();
    }

    private middlewares(middleWares: Array<any>) {
        this.app.use(this.parser); // equals to bodyParser.json()
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: Array<any>) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });
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
        this.app.listen(this.port, () => {
            console.log(chalk.blueBright(`App listening on the http://localhost:${this.port}`));
        })
    }
}

export default App;