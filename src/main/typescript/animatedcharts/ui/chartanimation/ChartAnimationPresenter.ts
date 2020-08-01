import {DataObject} from "../../animation/Animation";
import {AbstractPresenter} from "../AbstractPresenter";
import {FrameDataDecorator} from "../../utility/decorating/FrameDataDecorator";

export abstract class ChartAnimationPresenter extends AbstractPresenter{

    abstract loadDataset(data: DataObject) : void;
    abstract start() : void;
    abstract stop() : void;
    abstract pause() : void;
    abstract resume() : void;
    abstract isRunning(): boolean;
    abstract hasPaused(): boolean;
    abstract reverse() : void;
    abstract sortBy(type : string) : void;
    abstract setFrame(frame: number) : void;
    abstract addFrameDataDecorator(propertyDecorator: FrameDataDecorator) : void;
    abstract removeFrameDataDecorator(propertyDecorator: FrameDataDecorator) : void;
    abstract setChart(type : string) : void;
    abstract update() : void;

}