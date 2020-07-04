import log4js from 'log4js';

class Logger
{
    private static _instance: Logger;
    private log: any;

    private constructor()
    {
        this.log = log4js.getLogger();
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    public debug(str: String) {
        this.log.level = "debug";
        this.log.info(str);
    }

    public info(str: String) {
        this.log.level = "info";
        this.log.info(str);
    }

    public trace(str: String) {
        this.log.level = "trace";
        this.log.info(str);
    }
    
    public error(str: String) {
        this.log.level = "error";
        this.log.info(str);
    }

    public warn(str: String) {
        this.log.level = "warn";
        this.log.info(str);
    }
}

const singleton = Logger.Instance;
export default singleton;