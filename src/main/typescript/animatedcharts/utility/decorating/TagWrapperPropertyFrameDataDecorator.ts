import {FrameDataDecorator} from "./FrameDataDecorator";
import {FrameDataSet} from "../../animation/Animation";

export class TagWrapperPropertyFrameDataDecorator extends FrameDataDecorator {

    private value : string;

    setValue(value : string) : void {
        this.value = value;
    }

    getFrameDataSet(): FrameDataSet[] {
        return this.frameData.getFrameDataSet();
    }

    getProperty(): string {
        return `<${this.value}>${this.frameData.getProperty()}</${this.value}>`;
    }

}