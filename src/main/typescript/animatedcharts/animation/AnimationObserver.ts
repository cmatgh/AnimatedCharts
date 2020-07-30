import {Observer} from "../interfaces/Observer";
import {Animation} from "./Animation";

export interface AnimationObserver extends Observer {

    setAnimation(animation : Animation) : void;

}