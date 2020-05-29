import { AnimationChart } from "./AnimationChart";

export interface Observable {

    register(object: AnimationChart) : void;

    unregister(object: AnimationChart) : void;

    notifyAnimationObjects() : void;

}