import {WindowLoop} from "./WindowLoop";
import {Preconditions} from "../utility/Preconditions";
import { Observer } from "../interfaces/Observer";
import {Logger} from "../utility/logging/Logger";

/**
 * Proxy for concrete WindowLoop subclasses
 *
 * Participants:
 *      Proxy : {@link SmartWindowLoop}
 *      Subject: {@link WindowLoop}
 *      RealSubject: Concrete {@link WindowLoop} classes
 *
 * This class provides an semi-intelligent handling of the animation loop by only starting the window loop
 * when there is an observer listening. If there is no observer listening the window loop will be stopped.
 */
export class SmartWindowLoop implements WindowLoop {

    private static instance : SmartWindowLoop;

    private windowLoop : WindowLoop;

    private constructor(windowLoop: WindowLoop) {
        this.windowLoop = windowLoop;
    }

    static initialize(windowLoop : WindowLoop) : void {
        Preconditions.checkNotNull(windowLoop);
        Preconditions.checkState(this.instance == null, "Initialize has been called before already");

        this.instance = new SmartWindowLoop(windowLoop);
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

    countObservers(): number {
        return this.windowLoop.countObservers();
    }

}