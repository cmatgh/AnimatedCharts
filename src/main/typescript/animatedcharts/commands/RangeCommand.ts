import {Command} from "../interfaces/Command";
import {ChartAnimationPresenter} from "../ui/chartanimation/ChartAnimationPresenter";

export class RangeCommand implements Command {

    animationPresenter : ChartAnimationPresenter

    constructor(animationPresenter : ChartAnimationPresenter) {
        this.animationPresenter = animationPresenter;
    }

    execute(map: Map<string, any>): void {
        const $element = <JQuery> $(map.get("event").target);
        this.animationPresenter.setFrame(parseInt($element.val().toString()));
    }

}