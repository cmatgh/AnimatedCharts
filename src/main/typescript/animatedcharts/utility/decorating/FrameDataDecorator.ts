import {FrameData} from "../../animation/data/FrameData";
import {FrameDataSet} from "../../animation/Animation";

export abstract class FrameDataDecorator implements FrameData {

    protected frameData: FrameData

    setFrameData(frameData : FrameData) : void {
        this.frameData = frameData;
    }

    abstract getFrameDataSet(): FrameDataSet[];

    abstract getProperty(): string;

}
