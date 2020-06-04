export interface AnimationLoopOptions {
     updatesPerSecond? : number,
}

export class AnimationLoop {

    private window: Window;
    private updatesPerSecond: number;
    private lastTimestamp: number;
    private updateThreshold: number;
    private animationFrameNumber: number;
    private frameTickStrategy: Function;
    private paused: boolean;
    private started: boolean;

    constructor(window: Window, options : AnimationLoopOptions) {
        this.window = window;
        this.updatesPerSecond = typeof options === "undefined" || options === null ? 1 : options.updatesPerSecond || 1;
        this.lastTimestamp = Date.now();
        this.updateThreshold = 1000 / this.updatesPerSecond;
        this.frameTickStrategy = null;
        this.paused = false;
        this.started = false;
    }

    setUpdatesPerSecond(value: number) : void {
        this.updatesPerSecond = value;
        this.updateThreshold = 1000 / value;
    }

    setFrameTickStrategy(frameTickStrategy : Function) {
        this.frameTickStrategy = frameTickStrategy;
    }

    isRunning() : boolean {
        return this.started;
    }

    hasPaused() : boolean {
        return this.paused;
    }

    start() : void {
        if(!this.isRunning()){
            this.started = true;
            this.animationFrameNumber = this.window.requestAnimationFrame(this.loop.bind(this));
        }
    }

    stop() : void {
        if(this.isRunning()){
            this.window.cancelAnimationFrame(this.animationFrameNumber);
            this.started = false;
        }
    }

    pause() : void {
        this.paused = true;
    }

    resume() : void {
        //reset the timestamp of last update when resuming, so that tick doesn't get triggered instantly
        this.lastTimestamp = Date.now();
        this.paused = false;
    }

    private loop() : void {
        if(this.isRunning() && !this.hasPaused()){
            if(Date.now() - this.lastTimestamp > this.updateThreshold){
                if(this.frameTickStrategy != null) {
                    this.frameTickStrategy();
                }

                this.lastTimestamp = Date.now();
            }
        }

        this.animationFrameNumber = this.window.requestAnimationFrame(this.loop.bind(this));
    }


}