import {Command} from "./Command";
import {Animation} from "../../animation/Animation";

export class PauseAnimationCommand implements Command {

    private animation : Animation;

    constructor(animation : Animation) {
        this.animation = animation;
    }

    execute(event: Event): void {
        this.animation.pause();
    }
}