import {Command} from "./Command";
import {Animation} from "../../animation/Animation";

export class StopAnimationCommand implements Command {

    private animation : Animation;

    constructor(animation : Animation) {
        this.animation = animation;
    }

    execute(event: Event): void {
        this.animation.stop();
    }

}