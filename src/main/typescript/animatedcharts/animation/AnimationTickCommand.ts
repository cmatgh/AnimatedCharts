import {Command} from "../commands/Command";
import {Animation} from "./Animation";

export class AnimationTickCommand implements Command{

    private animation : Animation;

    constructor(animation: Animation) {
        this.animation = animation;
    }

    execute(map: Map<string, any>): void {
        this.animation.incrementFrame();
        this.animation.notifyObservers();
    }
}