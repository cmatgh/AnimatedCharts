import {Animation} from "../Animation";
import {AnimationState} from "./AnimationState";
import {AnimationLoop} from "../AnimationLoop";
import {PausedState} from "./PausedState";
import {StoppedState} from "./StoppedState";

export class RunningState implements AnimationState{

    pause(animation: Animation, animationLoop: AnimationLoop): void {
        animationLoop.stop();
        animation.setState(new PausedState());
    }

    resume(animation: Animation, animationLoop: AnimationLoop): void {
    }

    start(animation: Animation, animationLoop: AnimationLoop): void {
    }

    stop(animation: Animation, animationLoop: AnimationLoop): void {
        animationLoop.stop();
        animation.setFrame(0);
        animation.notifyObservers();
        animation.setState(new StoppedState())
    }

}