import {NumberFormatter} from "../formatting/NumberFormatter";
import {FrameDataDecorator} from "./FrameDataDecorator";
import {FrameDataSet} from "../../animation/Animation";
import {FrameData} from "../../animation/data/FrameData";


export class PropertyNumberFormatDecorator extends FrameDataDecorator {

    format : string;

    constructor(format : string) {
        super();
        this.format = format;
    }

    setFormat(format : string) : void {
        this.format = format;
    }

    getFrameDataSet(): FrameDataSet[] {
        return this.frameData.getFrameDataSet();
    }

    getProperty(): string {
        return NumberFormatter.format(this.frameData.getProperty(), this.format);
    }

}