import {FrameData, ChartData} from "./FrameData";

export class FrameDataImpl implements FrameData{

    private property: string;
    private data : ChartData[];
    private sampleSize : number;
    private currentFrame: number;

    getProperty() : string {
        return this.property;
    }

    setProperty(property: string) : void {
        this.property = property;
    }

    getFrameDataSet() : ChartData[] {
        return this.data;
    }

    setFrameDataSet(data : ChartData[]) : void{
        this.data = data;
    }

    getSampleSize(): number {
        return this.sampleSize;
    }

    setSampleSize(sampleSize : number): void {
        this.sampleSize = sampleSize;
    }

    getCurrentFrame(): number {
        return this.currentFrame;
    }

    setCurrentFrame(frame : number): void {
        this.currentFrame = frame;
    }

}