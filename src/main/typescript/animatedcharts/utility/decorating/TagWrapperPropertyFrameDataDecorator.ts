import {FrameDataDecorator} from "./FrameDataDecorator";

/**
 * Decorator design pattern
 *
 * Participants:
 *      Component : {@link FrameData}
 *      ConcreteComponent: {@link FrameDataImpl}
 *      Decorator: {@link FrameDataDecorator}
 *      ConcreteDecorator: {@link TagWrapperPropertyFrameDataDecorator}
 */
export class TagWrapperPropertyFrameDataDecorator extends FrameDataDecorator {

    private value : string;

    constructor(value : string) {
        super();
        this.value = value;
    }


    setValue(value : string) : void {
        this.value = value;
    }

    getProperty(): string {
        return `<${this.value}>${this.frameData.getProperty()}</${this.value}>`;
    }

}