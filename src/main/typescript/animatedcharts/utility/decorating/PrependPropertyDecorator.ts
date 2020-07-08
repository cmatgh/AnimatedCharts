import {FrameDataDecorator} from "./FrameDataDecorator";
import {ChartData} from "../../animation/data/FrameData";

export class PrependPropertyDecorator extends FrameDataDecorator{

    prependValue : string;

    constructor(prependValue : string) {
        super();
        this.prependValue = prependValue;
    }

    setValue(prependValue : string) : void {
        this.prependValue = prependValue;
    }

    getProperty(): string {
        return `${this.prependValue} ${this.frameData.getProperty()}`;
    }

}
