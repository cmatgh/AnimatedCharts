import { Observable } from "../utility/Observable";
import { Preconditions } from "../utility/Preconditions";
import {Observer} from "../utility/Observer";
import {FrameDataImpl} from "./data/FrameDataImpl";
import {FrameData} from "./data/FrameData";
import {FrameIterator} from "./data/FrameIterator";
import {AnimationState} from "./state/AnimationState";
import {StoppedState} from "./state/StoppedState";
import {PausedState} from "./state/PausedState";
import {RunningState} from "./state/RunningState";
import {LoopObserver} from "./LoopObserver";
import {AnimationTickCommand} from "./AnimationTickCommand";
import {SmartWindowLoop} from "./SmartWindowLoop";
import {WindowLoop} from "./WindowLoop";

export interface DataSet {
    label : string,
    color : number[],
    values: number[]
}

export interface DataObject {
    columnDefs : string[],
    dataSets : DataSet[],
    valuesLength: number,
 }

export class Animation implements Observable, LoopObserver {

    public static readonly MAX_UPDATES_PER_SECOND = 5;
    public static readonly MIN_UPDATES_PER_SECOND = 0.2;

    private readonly animationObjects : Set<Observer>;
    private frameManager : FrameIterator;
    private dataObject: DataObject;
    private updatesPerSecond: number;

    private stoppedState: StoppedState;
    private runningState : RunningState;
    private pausedState: PausedState;
    private currentState: AnimationState;

    constructor(windowLoop : WindowLoop) {
        this.animationObjects = new Set();
        this.dataObject = null;
        this.frameManager = new FrameIterator([]);
        this.stoppedState = new StoppedState(this, windowLoop);
        this.runningState = new RunningState(this, windowLoop);
        this.runningState.setUpdateCommand(new AnimationTickCommand(this));
        this.setUpdatesPerSecond(2);
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
        this.frameManager = new FrameIterator(this.getArray())
        this.frameManager.getNext();
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
        return this.frameManager.getCurrentFrame();
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
        this.frameManager.getNext();
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

    private getArray() : FrameData[]{
        const frameData = [];
        for(let i = 0; i < this.dataObject.valuesLength; i++) {
            frameData.push(this.asFrameData(i));
        }

        return frameData;
    }

    private asFrameData(frame : number) : FrameData {
        const frameData = new FrameDataImpl();
        frameData.setProperty("");
        frameData.setSampleSize(this.dataObject.valuesLength);
        frameData.setCurrentFrame(frame);
        frameData.setFrameDataSet([]);
        if(this.dataObject != null) {
            frameData.setProperty( this.dataObject.columnDefs[2 + frame]);
            frameData.setCurrentFrame(frame);
            frameData.setFrameDataSet(this.dataObject.dataSets.map( set => {
                return {
                    label: set.label.slice(),
                    color : [...set.color],
                    value: set.values[frame]
                }
            }));
        }
        return frameData;
    }

    setFrame(frame: number) {
        this.frameManager.setFrame(frame);
        this.frameManager.getNext();
    }
}
