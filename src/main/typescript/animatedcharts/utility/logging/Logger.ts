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

    }

    public debug() : void {
        //TODO
    }

    public info() : void {
        //TODO
    }

    public warn() : void {
        //TODO
    }

    public error() : void {
        //TODO
    }
}