import {Preconditions} from "../utility/Preconditions";
import {Observable} from "../interfaces/Observable";
import {WindowLoop} from "./WindowLoop";
import {Observer} from "../interfaces/Observer";

export class AnimationFrameWindowLoop implements WindowLoop{

    private observers : Set<Observer>;
    private window: Window;
    private animationFrameNumber: number;
    private running : boolean;

    constructor(window : Window) {
        Preconditions.checkNotNull(window);

        this.observers = new Set<Observer>();
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

    register(object: Observer): void {
        Preconditions.checkNotNull(object);

        this.observers.add(object);
    }

    unregister(object: Observer): void {
        this.observers.delete(object);
    }
}