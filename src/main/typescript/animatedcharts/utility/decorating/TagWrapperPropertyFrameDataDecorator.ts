import {FrameDataDecorator} from "./FrameDataDecorator";

export class TagWrapperPropertyFrameDataDecorator extends FrameDataDecorator {

    private value : string;

    setValue(value : string) : void {
        this.value = value;
    }

    getProperty(): string {
        return `<${this.value}>${this.frameData.getProperty()}</${this.value}>`;
    }

}