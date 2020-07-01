import {Command} from "./Command";
import {AnimationPresenter} from "../ui/animation/AnimationPresenter";

export class ReverseSortCommand implements Command {

    animationPresenter : AnimationPresenter<any>

    constructor(animationPresenter : AnimationPresenter<any>) {
        this.animationPresenter = animationPresenter;
    }


    execute(map: Map<string, any>): void {
        this.animationPresenter.reverse();
    }

}