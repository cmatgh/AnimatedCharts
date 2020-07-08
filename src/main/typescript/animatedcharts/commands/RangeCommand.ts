import {Command} from "./Command";
import {AnimationPresenter} from "../ui/animation/AnimationPresenter";

export class RangeCommand implements Command {

    animationPresenter : AnimationPresenter

    constructor(animationPresenter : AnimationPresenter) {
        this.animationPresenter = animationPresenter;
    }

    execute(map: Map<string, any>): void {
        const $element = <JQuery> $(map.get("event").target);
        this.animationPresenter.setFrame(parseInt($element.val().toString()));
    }

}