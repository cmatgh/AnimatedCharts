
import {FrameDataDecorator} from "./FrameDataDecorator";
import {ChartData} from "../../animation/data/FrameData";

export class AppendPropertyDecorator extends FrameDataDecorator {

    appendValue : string;

    constructor(appendValue : string) {
        super();
        this.appendValue = appendValue;
    }

    setAppendValue(value : string) {
        this.appendValue = value;
    }

    getProperty(): string {
        return `${this.frameData.getProperty()} ${this.appendValue}`;
    }

}