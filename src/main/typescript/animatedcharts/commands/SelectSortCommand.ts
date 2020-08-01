import {Command} from "../interfaces/Command";
import {ChartAnimationPresenter} from "../ui/chartanimation/ChartAnimationPresenter";

export class SelectSortCommand implements Command {

    animationPresenter : ChartAnimationPresenter

    constructor(animationPresenter : ChartAnimationPresenter) {
        this.animationPresenter = animationPresenter;
    }

    execute(map: Map<string, any>): void {
        this.animationPresenter.sortBy(map.get("value"));
    }

}