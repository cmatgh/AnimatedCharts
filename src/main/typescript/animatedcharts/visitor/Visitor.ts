import {ButtonComponent} from "../button/ButtonComponent";
import {AnimationComponent} from "../animation/AnimationComponent";
import {ChartComponent} from "../chart/ChartComponent";

export interface Visitor {

    visitButton(button : ButtonComponent) : void;

    visitAnimationUI(animationUI : AnimationComponent) : void;

    visitAnimationCharUI(animationChartUI : ChartComponent) : void;

}