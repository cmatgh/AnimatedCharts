import { Observable } from "./Observable";
import { Preconditions } from "../utility/Preconditions";
import { AnimationLoop } from "./AnimationLoop";
import * as convert from "color-convert";
import {Observer} from "./Observer";
import {FrameDataImpl} from "./data/FrameDataImpl";
import {FrameData} from "./data/FrameData";
import {FrameIterator} from "./data/FrameIterator";
import {AnimationTickCommand} from "./AnimationTickCommand";
import {AnimationState} from "./state/AnimationState";
import {StoppedState} from "./state/StoppedState";
import {PausedState} from "./state/PausedState";
import {RunningState} from "./state/RunningState";

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

export class Animation implements Observable{

    private readonly animationObjects : Set<Observer>;
    private frameManager : FrameIterator;
    private dataObject: DataObject;
    private animationLoop: AnimationLoop;
    private state: AnimationState;

    constructor(window: Window) {
        this.animationObjects = new Set();
        this.dataObject = null;
        this.frameManager = new FrameIterator([]);
        this.state = new StoppedState();
        this.animationLoop = new AnimationLoop(window, 2);
        this.animationLoop.setOnTickCommand(new AnimationTickCommand(this));
    }

    setDataObject(dataObject: DataObject) : void {
        this.dataObject = dataObject;
        this.setColors(dataObject);
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
        this.state = state;
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

    incrementFrame() : void{
        this.frameManager.getNext();
    }

    start() : void{
        this.state.start(this, this.animationLoop);
    }

    stop() : void{
        this.state.stop(this, this.animationLoop);
    }

    pause() : void {
        this.state.pause(this, this.animationLoop);
    }

    resume() : void {
        this.state.resume(this, this.animationLoop);
    }

    hasPaused() : boolean {
        return this.state instanceof PausedState;
    }

    isRunning() : boolean {
        return this.state instanceof RunningState;
    }

    hasStopped() : boolean {
        return this.state instanceof StoppedState;
    }

    private setColors(dataObj: DataObject) : void {
        let hue = 0;
        let stepLength = Math.floor(360 / this.dataObject.dataSets.length);
        for(let dataset of dataObj.dataSets) {
            dataset.color = this.applyColor(dataset.color, hue % 360);
            hue += stepLength;
        }
    }

    private applyColor(color: number[], hue: number): number[] {
        if(color.length != 3){
            const rgbaVal = convert.hsv.rgb([hue, 85, 85]);
            return [rgbaVal[0], rgbaVal[1], rgbaVal[2]];
        }
        return color;
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
