import {Animation} from "../Animation";
import {AnimationLoop} from "../AnimationLoop";

export interface AnimationState {
    start(animation: Animation, animationLoop: AnimationLoop) : void;
    stop(animation: Animation, animationLoop: AnimationLoop) : void;
    pause(animation: Animation, animationLoop: AnimationLoop) : void;
    resume(animation: Animation, animationLoop: AnimationLoop): void;
}
