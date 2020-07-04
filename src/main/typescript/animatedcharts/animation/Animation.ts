import { Observable } from "./Observable";
import { Preconditions } from "../utility/Preconditions";
import { AnimationLoop } from "./AnimationLoop";
import * as convert from "color-convert";
import {Observer} from "./Observer";
import {Command} from "../commands/Command";
import {FrameDataImpl} from "./data/FrameDataImpl";

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

 export interface FrameDataSet {
    label : string,
    color : number[],
    value: number
}

export class Animation implements Observable{

    private animationObjects : Set<Observer>;
    private dataObject: DataObject;
    private animationLoop: AnimationLoop;
    private frame: number;
    private numFrames: number;

    constructor(window: Window) {
        this.animationObjects = new Set();
        this.dataObject = null;
        this.animationLoop = new AnimationLoop(window, { updatesPerSecond : 2 });
        this.frame = 0;
        this.numFrames = 0;
        this.animationLoop.setOnTickCommand( new class implements Command {

            private animation : Animation;

            constructor(animation : Animation) {
                this.animation = animation;
            }

            execute(map: Map<string, any>): void {
                this.animation.incrementFrame();
                this.animation.notifyObservers();
            }
        }(this))
    }

    setDataObject(dataObject: DataObject) : void {
        this.dataObject = dataObject;
        this.frame = 0;
        this.numFrames = dataObject.valuesLength;
        this.setColors(dataObject);
    }

    get AnimationObjects() : Observer[] {
        return Array.from(this.animationObjects);
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

    getCurrentFrameData() : FrameDataImpl {
        const frameData = new FrameDataImpl();
        frameData.setProperty("");
        frameData.setFrameDataSet([]);
        if(this.dataObject != null) {
            frameData.setProperty( this.dataObject.columnDefs[2 + this.frame]);
            frameData.setFrameDataSet(this.dataObject.dataSets.map( set => {
                return {
                    label: set.label.slice(),
                    color : [...set.color],
                    value: set.values[this.frame]
                }
            }));
        }

        return frameData;
    }

    incrementFrame() : void{
        this.frame++;
        this.frame %= this.numFrames;
    }

    start() : void{
        if(this.dataObject != null) {
            this.animationLoop.start();
        }
    }

    stop() : void{
        this.animationLoop.stop();
        this.frame = 0;
        this.notifyObservers();
    }

    pause() : void {
        this.animationLoop.pause();
    }

    resume() : void {
        this.animationLoop.resume();
    }

    hasPaused() : boolean {
        return this.animationLoop.hasPaused();
    }

    isRunning() : boolean {
        return this.animationLoop.isRunning();
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

}