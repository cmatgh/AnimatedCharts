import {ChartAnimationPresenter} from "../ui/chartanimation/ChartAnimationPresenter";
import {CheckboxCommand} from "./CheckboxCommand";

export class ReverseSortCommand extends CheckboxCommand {

    animationPresenter : ChartAnimationPresenter

    constructor(animationPresenter : ChartAnimationPresenter) {
        super();
        this.animationPresenter = animationPresenter;
    }

    doOnDeselect(map: Map<string, any>) {
        this.animationPresenter.reverse();
    }

    doOnSelect(map: Map<string, any>) {
        this.animationPresenter.reverse();
    }

}