import {DataObject} from "../../animation/Animation";
import {AbstractPresenter} from "../AbstractPresenter";
import {AnimationView} from "./AnimationView";
import {FrameDataDecorator} from "../../utility/decorating/FrameDataDecorator";

export abstract class AnimationPresenter extends AbstractPresenter{

    protected view : AnimationView

    abstract setTitle(title: string) : void;
    abstract loadDataset(data: DataObject) : void;
    abstract start() : void;
    abstract stop() : void;
    abstract pause() : void;
    abstract resume() : void;
    abstract isRunning(): boolean;
    abstract hasPaused(): boolean;
    abstract reverse() : void;
    abstract sortBy(type : string) : void;
    abstract addFrameDataDecorator(propertyDecorator: FrameDataDecorator) : void;
    abstract removeFrameDataDecorator(propertyDecorator: FrameDataDecorator) : void;
    abstract setChart(type : string) : void;
    abstract update() : void;

}