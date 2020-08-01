import {Command} from "../interfaces/Command";
import {Animation} from "./Animation";

/**
 * Command object that notifies all observers of the receiver when an animation tick triggers
 *
 * <ul>
 *      Participants:
 *      <li>Command : {@link Command}</li>
 *      <li>ConcreteCommand : {@link AnimationTickCommand}</li>
 *      <li>Client: {@link Animation}</li>
 *      <li>Invoker: {@link RunningState}</li>
 *      <li>Receiver: {@link Animation}</li>
 * </ul>
 */
export class AnimationTickCommand implements Command{

    private animation : Animation;

    constructor(animation: Animation) {
        this.animation = animation;
    }

    execute(map: Map<string, any>): void {
        this.animation.incrementFrame();
        this.animation.notifyObservers();
    }
}