import {Animation} from "../Animation";
import {AnimationState} from "./AnimationState";
import {Command} from "../../interfaces/Command";
import {Observable} from "../../interfaces/Observable";
import {Preconditions} from "../../utility/Preconditions";

export class RunningState implements AnimationState{

    private animation: Animation;
    private windowLoop : Observable;
    private lastTimestamp : number;
    private updateThreshold: number;

    private updateCommand : Command;

    constructor(animation: Animation,  windowLoop: Observable) {
        Preconditions.checkNotNull(animation);
        Preconditions.checkNotNull(windowLoop);

        this.animation = animation;
        this.windowLoop = windowLoop;
        this.lastTimestamp = Date.now();
    }

    setUpdateThreshold(value : number) : void {
        this.updateThreshold = value;
    }

    setUpdateCommand(command : Command) {
        this.updateCommand = command;
    }

    pause(): void {
        this.windowLoop.unregister(this.animation);
        this.animation.setState(this.animation.getPausedState());
    }

    resume(): void {
    }

    start(): void {
    }

    stop(): void {
        this.windowLoop.unregister(this.animation);
        this.animation.setFrame(0);
        this.animation.notifyObservers();
        this.animation.setState(this.animation.getStoppedState())
    }

    update() {
        if(this.updateCommand != null && Date.now() >= this.lastTimestamp + this.updateThreshold){
            this.updateCommand.execute(null);
            this.lastTimestamp = Date.now();
        }
    }

}