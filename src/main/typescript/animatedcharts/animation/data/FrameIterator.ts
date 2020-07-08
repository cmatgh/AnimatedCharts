import {FrameData} from "./FrameData";
import {Iterators} from "../../utility/Iterators";
import {Iterator} from "../../utility/Iterator";
import {Preconditions} from "../../utility/Preconditions";

export class FrameIterator implements Iterator<FrameData>{

    private frameData : FrameData[];
    private iterator : Iterator<FrameData>;
    private currentFrame : FrameData;

    constructor(frameData : FrameData[], frame : number = 0) {
        Preconditions.checkRange(0, frameData.length + (frame == 0 ? 1 : 0), frame);

        this.frameData = frameData;
        this.setFrame(frame);
    }

    setFrame(frame : number) : void {
        Preconditions.checkRange(0, this.frameData.length + (frame == 0 ? 1 : 0), frame);

        if(this.frameData.length == 0) {
            this.iterator = Iterators.emptyIterator<FrameData>();
        }  else {
            this.iterator = Iterators.cyclic<FrameData>(this.frameData, frame);
        }

        this.currentFrame = null;
    }

    getCurrentFrame() : FrameData {
        return this.currentFrame;
    }

    getNext(): FrameData {
        this.currentFrame = this.iterator.getNext();
        return this.currentFrame;
    }

    hasNext(): boolean {
        return this.iterator.hasNext();
    }

}