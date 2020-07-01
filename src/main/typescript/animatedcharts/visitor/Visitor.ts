import {InputPresenter} from "../ui/input/InputPresenter";
import {AnimationPresenterImpl} from "../ui/animation/impl/AnimationPresenterImpl";

export interface Visitor {

    visitButton(button : InputPresenter<any>) : void;

    visitAnimationUI(animationUI : AnimationPresenterImpl<any>) : void;

}