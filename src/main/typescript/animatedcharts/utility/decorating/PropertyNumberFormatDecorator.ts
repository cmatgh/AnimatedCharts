import {NumberFormatter} from "../formatting/NumberFormatter";
import {FrameDataDecorator} from "./FrameDataDecorator";

/**
 * Decorator design pattern
 *
 * Participants:
 *      Component : {@link FrameData}
 *      ConcreteComponent: {@link FrameDataImpl}
 *      Decorator: {@link FrameDataDecorator}
 *      ConcreteDecorator: {@link PropertyNumberFormatDecorator}
 */
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