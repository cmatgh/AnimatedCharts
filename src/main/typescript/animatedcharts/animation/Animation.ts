import { Observable } from "./Observable";
import { Preconditions } from "../utility/Preconditions";
import { AnimationLoop } from "./AnimationLoop";
import * as convert from "color-convert";
import {Observer} from "./Observer";

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

    constructor(window: Window, dataObject: DataObject) {
        this.animationObjects = new Set();
        this.dataObject = dataObject;
        this.animationLoop = new AnimationLoop(window, { updatesPerSecond : 2 });
        this.frame = 0;
        this.numFrames = this.dataObject.valuesLength;
        this.animationLoop.setFrameTickStrategy(() => {
            this.incrementFrame();
            this.notifyAnimationObjects();
        })

        this.setColors(this.dataObject);
    }

    setDataObject(dataObject: DataObject) : void {
        this.dataObject = dataObject;
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

    notifyAnimationObjects() : void {
        this.animationObjects.forEach( obj => obj.update());
    }

    getCurrentFrameData() : FrameDataSet[] {
        return this.dataObject.dataSets.map( set => {
            return {
                label: set.label.slice(),
                color : [...set.color],
                value: set.values[this.frame]
            }
        });
    }

    getCurrentColumnProperty() : string {
        return this.dataObject.columnDefs[2 + this.frame];
    }

    incrementFrame() : void{
        this.frame++;
        this.frame %= this.numFrames;
    }

    start() : void{
        this.animationLoop.start();
    }

    stop() : void{
        this.animationLoop.stop();
    }

    pause() : void {
        this.animationLoop.pause();
    }

    resume() : void {
        this.animationLoop.resume();
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