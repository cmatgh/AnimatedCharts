import {FrameData, ChartData} from "../../animation/data/FrameData";

export abstract class FrameDataDecorator implements FrameData {

    protected frameData: FrameData

    setFrameData(frameData : FrameData) : void {
        this.frameData = frameData;
    }

    getFrameDataSet(): ChartData[]{
        return this.frameData.getFrameDataSet();
    }

    getProperty(): string{
        return this.frameData.getProperty();
    }

    getSampleSize(): number {
        return this.frameData.getSampleSize();
    }

    getCurrentFrame(): number {
        return this.frameData.getCurrentFrame();
    }

}
