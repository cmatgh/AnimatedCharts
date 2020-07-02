import {InputPresenter} from "../ui/input/InputPresenter";
import {AnimationPresenterImpl} from "../ui/animation/impl/AnimationPresenterImpl";

export interface Visitor {

    visitButton(button : InputPresenter) : void;

    visitAnimationUI(animationUI : AnimationPresenterImpl) : void;

}