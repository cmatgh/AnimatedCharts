import {UIButton} from "../UIButton";
import {AnimationUI} from "../AnimationUI";
import {AnimationChartUI} from "../AnimationChartUI";

export interface Visitor {

    visitButton(button : UIButton) : void;

    visitAnimationUI(animationUI : AnimationUI) : void;

    visitAnimationCharUI(animationChartUI : AnimationChartUI) : void;

}