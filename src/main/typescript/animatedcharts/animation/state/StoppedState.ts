import {Animation} from "../Animation";
import {AnimationState} from "./AnimationState";
import {Observable} from "../../utility/Observable";
import {Preconditions} from "../../utility/Preconditions";

export class StoppedState implements AnimationState {

    private animation: Animation;
    private windowLoop : Observable;

    constructor(animation: Animation, windowLoop: Observable) {
        Preconditions.checkNotNull(animation);
        Preconditions.checkNotNull(windowLoop);

        this.animation = animation;
        this.windowLoop = windowLoop;
    }

    pause(): void {
    }

    resume(): void {
    }

    start(): void {
        if(this.animation.hasDataObject()) {
            this.windowLoop.register(this.animation);
            this.animation.setState(this.animation.getRunningState());
        }
    }

    stop(): void {
    }

    update() {

    }

}