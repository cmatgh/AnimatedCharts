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

    start() : void {
        if(!this.started) {
            this.started = true;
            this.loop();
        }
    }

    stop() : void {
        if(this.started){
            this.window.cancelAnimationFrame(this.animationFrameNumber);
            this.started = false;
        }
    }

    pause() : void {
        this.paused = true;
    }

    resume() : void {
        this.paused = false;
    }

    private loop() : void {
        if(this.started && !this.paused){
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