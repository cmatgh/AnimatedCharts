import {Animation} from "../Animation";
import {AnimationState} from "./AnimationState";
import {AnimationLoop} from "../AnimationLoop";
import {RunningState} from "./RunningState";
import {StoppedState} from "./StoppedState";


export class PausedState implements AnimationState {

    pause(animation: Animation, animationLoop: AnimationLoop): void {
    }

    resume(animation: Animation, animationLoop: AnimationLoop): void {
        animationLoop.start();
        animation.setState(new RunningState());
    }

    start(animation: Animation, animationLoop: AnimationLoop): void {
        animationLoop.start();
        animation.setState(new RunningState());
    }

    stop(animation: Animation, animationLoop: AnimationLoop): void {
        animationLoop.stop();
        animation.notifyObservers();
        animation.setFrame(0);
        animation.setState(new StoppedState());
    }


}
