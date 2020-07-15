import {Animation} from "../Animation";
import {AnimationState} from "./AnimationState";
import {AnimationLoop} from "../AnimationLoop";
import {RunningState} from "./RunningState";

export class StoppedState implements AnimationState {

    pause(animation: Animation, animationLoop: AnimationLoop): void {
    }

    resume(animation: Animation, animationLoop: AnimationLoop): void {
    }

    start(animation: Animation, animationLoop: AnimationLoop): void {
        if(animation.hasDataObject()) {
            animationLoop.start();
            animation.setState(new RunningState());
        }
    }

    stop(animation: Animation, animationLoop: AnimationLoop): void {
    }

}