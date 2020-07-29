import {WindowLoop} from "./WindowLoop";
import {Preconditions} from "../utility/Preconditions";
import {Observable} from "../utility/Observable";
import { Observer } from "../utility/Observer";
import {AnimationFrameWindowLoop} from "./AnimationFrameWindowLoop";
import {Logger} from "../utility/logging/Logger";

export class SmartWindowLoop implements WindowLoop {

    private static instance : SmartWindowLoop;

    private windowLoop : AnimationFrameWindowLoop;

    private constructor(windowLoop: AnimationFrameWindowLoop) {
        this.windowLoop = windowLoop;
    }

    static initialize(window : Window) : void {
        Preconditions.checkNotNull(window);
        Preconditions.checkState(this.instance == null, "Initialize has been called before already");

        this.instance = new SmartWindowLoop(new AnimationFrameWindowLoop(window))
    }

    static getInstance() : WindowLoop {
        if(this.instance == null) {
            throw Error("WindowLoop was not initialized");
        }
        return this.instance;
    }

    start(): void {
        Logger.getInstance().info("No privileges to start the loop");
    }

    stop(): void {
        Logger.getInstance().info("No privileges to stop the loop");
    }

    isRunning(): boolean {
        return this.windowLoop.isRunning();
    }

    register(object: Observer): void {
        this.windowLoop.register(object);
        this.windowLoop.start();
    }
    unregister(object: Observer): void {
        this.windowLoop.unregister(object);
        if(this.windowLoop.countObservers() == 0) {
            this.windowLoop.stop();
        }
    }
    notifyObservers(): void {
        this.windowLoop.notifyObservers();
    }

}