import {Animation} from "../Animation";
import {AnimationState} from "./AnimationState";
import {Observable} from "../../interfaces/Observable";
import {Preconditions} from "../../utility/Preconditions";

/**
 * State pattern object that handles the behavior when the animation is paused
 *
 * <ul>
 *      Participants:
 *      <li>Context : {@link Animation}</li>
 *      <li>State : {@link AnimationState}</li>
 *      <li>ConcreteState: {@link PausedState}</li>
 * </ul>
 */
export class PausedState implements AnimationState {

    private animation: Animation;
    private windowLoop : Observable;

    constructor(animation: Animation, windowLoop: Observable) {
        Preconditions.checkNotNull(animation);
        Preconditions.checkNotNull(windowLoop);

        this.animation = animation;
        this.windowLoop = windowLoop;
    }

    pause(): void {
    }

    resume(): void {
        this.windowLoop.register(this.animation);
        this.animation.setState(this.animation.getRunningState());
    }

    start(): void {
        this.windowLoop.register(this.animation);
        this.animation.setState(this.animation.getRunningState());
    }

    stop(): void {
        this.windowLoop.unregister(this.animation);
        this.animation.notifyObservers();
        this.animation.setFrame(0);
        this.animation.setState(this.animation.getStoppedState());
    }

    update() {
    }

}
