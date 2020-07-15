import {Command} from "../commands/Command";

export class AnimationLoop {

    public static readonly MAX_UPDATES_PER_SECOND = 5;
    public static readonly MIN_UPDATES_PER_SECOND = 0.2;

    private window: Window;
    private updatesPerSecond: number;
    private updateThreshold: number;
    private animationFrameNumber: number;
    private onTickCommand: Command;
    private running : boolean;
    private lastTimestamp: number;

    constructor(window: Window, updatesPerSecond? : number) {
        this.window = window;
        this.updatesPerSecond = typeof updatesPerSecond === "undefined" || updatesPerSecond === null ? 1 : updatesPerSecond || 1;
        this.updateThreshold = 1000 / this.updatesPerSecond;
        this.onTickCommand = null;
        this.running = false;
    }

    setUpdatesPerSecond(value: number) : void {
        if(value > AnimationLoop.MAX_UPDATES_PER_SECOND) {
            value = AnimationLoop.MAX_UPDATES_PER_SECOND;
        }
        if(value < AnimationLoop.MIN_UPDATES_PER_SECOND){
            value = AnimationLoop.MIN_UPDATES_PER_SECOND;
        }
        this.updatesPerSecond = value;
        this.updateThreshold = 1000 / value;
    }

    setOnTickCommand(onTickCommand : Command) {
        this.onTickCommand = onTickCommand;
    }

    isRunning() : boolean {
        return this.running;
    }

    start() : void {
        if(!this.isRunning()){
            this.animationFrameNumber = this.window.requestAnimationFrame(this.loop.bind(this));
            this.running = true;
            this.lastTimestamp = Date.now();
        }
    }

    stop() : void {
        if(this.isRunning()){
            this.running = false;
            this.window.cancelAnimationFrame(this.animationFrameNumber);
        }
    }

    private loop() : void {
        if(Date.now() > this.lastTimestamp + this.updateThreshold){
            this.lastTimestamp = Date.now();
            this.onTickCommand.execute(null);
        }

        this.animationFrameNumber = this.window.requestAnimationFrame(this.loop.bind(this));
    }
}