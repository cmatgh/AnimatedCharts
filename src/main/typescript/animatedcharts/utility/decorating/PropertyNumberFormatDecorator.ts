import {NumberFormatter} from "../formatting/NumberFormatter";
import {FrameDataDecorator} from "./FrameDataDecorator";


export class PropertyNumberFormatDecorator extends FrameDataDecorator {

    format : string;

    constructor(format : string) {
        super();
        this.format = format;
    }

    setFormat(format : string) : void {
        this.format = format;
    }

    getProperty(): string {
        return NumberFormatter.format(this.frameData.getProperty(), this.format);
    }

}