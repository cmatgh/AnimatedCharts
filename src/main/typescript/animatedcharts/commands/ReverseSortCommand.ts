import {AnimationPresenter} from "../ui/animation/AnimationPresenter";
import {CheckboxCommand} from "./CheckboxCommand";

export class ReverseSortCommand extends CheckboxCommand {

    animationPresenter : AnimationPresenter

    constructor(animationPresenter : AnimationPresenter) {
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