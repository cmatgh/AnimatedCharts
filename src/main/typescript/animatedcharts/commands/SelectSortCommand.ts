import {Command} from "../interfaces/Command";
import {AnimationPresenter} from "../ui/animation/AnimationPresenter";

export class SelectSortCommand implements Command {

    animationPresenter : AnimationPresenter

    constructor(animationPresenter : AnimationPresenter) {
        this.animationPresenter = animationPresenter;
    }

    execute(map: Map<string, any>): void {
        this.animationPresenter.sortBy(map.get("event"));
    }

}