import {Observer} from "./Observer";
import {Animation} from "./Animation";

export interface AnimationObserver extends Observer {

    setAnimation(animation : Animation) : void;

}