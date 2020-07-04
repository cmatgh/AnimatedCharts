import {FrameDataSet} from "../../animation/Animation";
import {FrameDataDecorator} from "./FrameDataDecorator";

export class AppendPropertyDecorator extends FrameDataDecorator {

    appendValue : string;

    constructor(appendValue : string) {
        super();
        this.appendValue = appendValue;
    }

    setAppendValue(value : string) {
        this.appendValue = value;
    }

    getFrameDataSet(): FrameDataSet[] {
        return this.frameData.getFrameDataSet();
    }

    getProperty(): string {
        return `${this.frameData.getProperty()} ${this.appendValue}`;
    }

}