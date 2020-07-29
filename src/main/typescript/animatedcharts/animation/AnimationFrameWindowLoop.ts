import {Preconditions} from "../utility/Preconditions";
import {Observable} from "../utility/Observable";
import {LoopObserver} from "./LoopObserver";
import {WindowLoop} from "./WindowLoop";

export class AnimationFrameWindowLoop implements WindowLoop{

    private observers : Set<LoopObserver>;
    private window: Window;
    private animationFrameNumber: number;
    private running : boolean;

    constructor(window : Window) {
        Preconditions.checkNotNull(window);

        this.observers = new Set<LoopObserver>();
        this.window = window;
        this.running = false;
    }

    countObservers() : number {
        return this.observers.size;
    }

    isRunning() : boolean {
        return this.running;
    }

    start() : void {
        if(!this.isRunning()){
            this.animationFrameNumber = this.window.requestAnimationFrame(this.loop.bind(this));
            this.running = true;
        }
    }

    stop() : void {
        if(this.isRunning()){
            this.running = false;
            this.window.cancelAnimationFrame(this.animationFrameNumber);
        }
    }

    private loop() : void {
        this.notifyObservers();
        this.animationFrameNumber = this.window.requestAnimationFrame(this.loop.bind(this));
    }

    notifyObservers(): void {
        this.observers.forEach(observer => observer.update());
    }

    register(object: LoopObserver): void {
        Preconditions.checkNotNull(object);

        this.observers.add(object);
    }

    unregister(object: LoopObserver): void {
        this.observers.delete(object);
    }
}