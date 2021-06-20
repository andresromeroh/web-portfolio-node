import log4js from 'log4js';

enum LogLevel {
    Debug = 'debug',
    Info = 'info',
    Trace = 'trace',
    Error = 'error',
}

class LoggerService {
    private static _instance: LoggerService;

    private log: any;

    private constructor() {
        this.log = log4js.getLogger();
    }

    public static get Instance(): LoggerService {
        return this._instance || (this._instance = new this());
    }

    public debug(str: String): void {
        this.log.level = LogLevel.Debug;
        this.log.debug(str);
    }

    public info(str: String): void {
        this.log.level = LogLevel.Info;
        this.log.info(str);
    }

    public trace(str: String): void {
        this.log.level = LogLevel.Trace;
        this.log.trace(str);
    }

    public error(str: String): void {
        this.log.level = LogLevel.Error;
        this.log.error(str);
    }
}

const singleton: LoggerService = LoggerService.Instance;
export default singleton;
