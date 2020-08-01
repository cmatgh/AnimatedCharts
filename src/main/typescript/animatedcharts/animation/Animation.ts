import { Observable } from "../interfaces/Observable";
import { Preconditions } from "../utility/Preconditions";
import {Observer} from "../interfaces/Observer";
import {FrameData} from "./data/FrameData";
import {CyclicRandomAccessIterator} from "./data/CyclicRandomAccessIterator";
import {AnimationState} from "./state/AnimationState";
import {StoppedState} from "./state/StoppedState";
import {PausedState} from "./state/PausedState";
import {RunningState} from "./state/RunningState";
import {AnimationTickCommand} from "./AnimationTickCommand";
import {WindowLoop} from "./WindowLoop";

export interface DataObject {
    frameData : FrameData[],
    samplesCount: number,
    entriesCount: number,
 }

/**
 * Observable for objects that want to hook into this animation.
 *
 * <ul>
 *      Participants:
 *      <li>Observer : {@link Observer}</li>
 *      <li>ConcreteObserver : {@link AnimationPresenterImpl}</li>
 *      <li>Subject: {@link Observable}</li>
 *      <li>ConcreteSubject: {@link Animation}</li>
 * </ul>
 */
export class Animation implements Observable, Observer {

    public static readonly MAX_UPDATES_PER_SECOND = 5;
    public static readonly MIN_UPDATES_PER_SECOND = 0.2;
    public static readonly DEFAULT_UPDATES_PER_SECOND = 2;

    private readonly animationObjects : Set<Observer>;
    private dataIterator : CyclicRandomAccessIterator<FrameData>;
    private dataObject: DataObject;
    private updatesPerSecond: number;

    private readonly stoppedState: StoppedState;
    private readonly runningState : RunningState;
    private readonly pausedState: PausedState;
    private currentState: AnimationState;

    constructor(windowLoop : WindowLoop) {
        this.animationObjects = new Set();
        this.dataObject = null;
        this.dataIterator = new CyclicRandomAccessIterator<FrameData>([]);
        this.stoppedState = new StoppedState(this, windowLoop);
        this.runningState = new RunningState(this, windowLoop);
        this.runningState.setUpdateCommand(new AnimationTickCommand(this));
        this.setUpdatesPerSecond(Animation.DEFAULT_UPDATES_PER_SECOND);
        this.pausedState = new PausedState(this, windowLoop);
        this.currentState = this.stoppedState;
    }

    getStoppedState() : StoppedState {
        return this.stoppedState;
    }
    getPausedState() : PausedState {
        return this.pausedState;
    }
    getRunningState() : RunningState {
        return this.runningState;
    }

    setDataObject(dataObject: DataObject) : void {
        this.dataObject = dataObject;
        this.dataIterator = new CyclicRandomAccessIterator<FrameData>(dataObject.frameData)
        this.dataIterator.getNext();
    }

    get AnimationObjects() : Observer[] {
        return Array.from(this.animationObjects);
    }

    hasDataObject() : boolean {
        return this.dataObject != null;
    }

    setState(state : AnimationState) {
        this.currentState = state;
    }

    objectCount(): number {
        return this.animationObjects.size;
    }

    register(object: Observer) : void {
        Preconditions.checkNotNull(object);

        this.animationObjects.add(object);
    }

    unregister(object: Observer) : void {
        if(!this.animationObjects.has(object)){
            throw Error("no such object");
        }

        this.animationObjects.delete(object);
    }

    notifyObservers() : void {
        this.animationObjects.forEach( obj => obj.update());
    }

    getCurrentFrameData() : FrameData {
        return this.dataIterator.getCurrentFrame();
    }

    setUpdatesPerSecond(value: number) : void {
        if(value > Animation.MAX_UPDATES_PER_SECOND) {
            value = Animation.MAX_UPDATES_PER_SECOND;
        }
        if(value < Animation.MIN_UPDATES_PER_SECOND){
            value = Animation.MIN_UPDATES_PER_SECOND;
        }
        this.updatesPerSecond = value;
        this.runningState.setUpdateThreshold(1000 / value);
    }

    incrementFrame() : void{
        this.dataIterator.getNext();
    }

    start() : void{
        this.currentState.start();
    }

    stop() : void{
        this.currentState.stop();
    }

    pause() : void {
        this.currentState.pause();
    }

    resume() : void {
        this.currentState.resume();
    }

    update(): void {
        this.currentState.update()
    }

    hasPaused() : boolean {
        return this.currentState instanceof PausedState;
    }

    isRunning() : boolean {
        return this.currentState instanceof RunningState;
    }

    hasStopped() : boolean {
        return this.currentState instanceof StoppedState;
    }

    setFrame(frame: number) {
        this.dataIterator.setFrame(frame);
        this.dataIterator.getNext();
    }
}
