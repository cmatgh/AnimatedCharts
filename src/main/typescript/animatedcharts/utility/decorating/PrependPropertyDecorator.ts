import {FrameDataDecorator} from "./FrameDataDecorator";
import {FrameDataSet} from "../../animation/Animation";
import {FrameData} from "../../animation/data/FrameData";

export class PrependPropertyDecorator extends FrameDataDecorator{

    prependValue : string;

    constructor(prependValue : string) {
        super();
        this.prependValue = prependValue;
    }

    setValue(prependValue : string) : void {
        this.prependValue = prependValue;
    }

    getFrameDataSet(): FrameDataSet[] {
        return this.frameData.getFrameDataSet()
    }

    getProperty(): string {
        return `${this.prependValue} ${this.frameData.getProperty()}`;
    }

}
