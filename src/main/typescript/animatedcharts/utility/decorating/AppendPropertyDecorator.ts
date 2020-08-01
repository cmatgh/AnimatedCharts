
import {FrameDataDecorator} from "./FrameDataDecorator";
import {ChartData} from "../../animation/data/FrameData";

/**
 * Decorator design pattern
 *
 * Participants:
 *      Component : {@link FrameData}
 *      ConcreteComponent: {@link FrameDataImpl}
 *      Decorator: {@link FrameDataDecorator}
 *      ConcreteDecorator: {@link AppendPropertyDecorator}
 */
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