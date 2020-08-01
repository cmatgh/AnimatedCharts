import {FrameDataDecorator} from "./FrameDataDecorator";

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
