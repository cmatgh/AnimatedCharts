import {Preconditions} from "../utility/Preconditions";
import {Observable} from "../utility/Observable";
import {LoopObserver} from "./LoopObserver";

export class AnimationFrameWindowLoop implements Observable{

    private static instance : AnimationFrameWindowLoop;

    private observers : Set<LoopObserver>;
    private window: Window;
    private animationFrameNumber: number;
    private running : boolean;

    private constructor(window : Window) {
        this.observers = new Set<LoopObserver>();
        this.window = window;
        this.running = false;
    }

    static initialize(window : Window) : AnimationFrameWindowLoop {
        Preconditions.checkNotNull(window);
        Preconditions.checkState(this.instance == null, "Initialize has been called before already");

        if(this.instance == null) {
            this.instance = new AnimationFrameWindowLoop(window);
        }

        return this.instance;
    }

    static getInstance() : Observable {
        if(this.instance == null) {
            throw Error("AnimationFrameWindowLoop was not initialized");
        }
        return this.instance;
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