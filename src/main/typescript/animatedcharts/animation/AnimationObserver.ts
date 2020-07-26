import {Observer} from "../utility/Observer";
import {Animation} from "./Animation";

export interface AnimationObserver extends Observer {

    setAnimation(animation : Animation) : void;

}