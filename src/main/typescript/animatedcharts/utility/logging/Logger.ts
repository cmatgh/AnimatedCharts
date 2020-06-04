import {LogLevel} from "./LogLevel";

export class Logger {

    private static logger: Logger;

    private logLevel: LogLevel;

    private constructor() {
        if(process.env.TEST) {
            this.logLevel = LogLevel.DEBUG;
        }else {
            this.logLevel = LogLevel.INFO;
        }
    }

    public static getInstance() : Logger {
        if(this.logger == null) {
            this.logger = new Logger();
        }
        return this.logger;
    }

    public setLogLevel(logLevel: LogLevel) : void {
        this.logLevel = logLevel;
    }

    public debug(msg: string) : void {
        this.log(msg, LogLevel.DEBUG);
    }

    public info(msg: string) : void {
        this.log(msg, LogLevel.INFO);
    }

    public warn(msg: string) : void {
        this.log(msg, LogLevel.WARN);
    }

    public error(msg: string) : void {
        this.log(msg, LogLevel.ERROR);
    }

    private log(msg: string, logLevel: LogLevel) : void {
        if(this.logLevel <= logLevel) {
            let levelName = LogLevel[logLevel];
            console[levelName.toLowerCase()](`${this.getDate()} [${levelName}] : %s`, msg)
        }
    }

    private getDate() : string {
        let date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
    }
}