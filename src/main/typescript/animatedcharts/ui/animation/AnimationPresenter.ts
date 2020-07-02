import {Presenter} from "../Presenter";
import {Animation, DataObject} from "../../animation/Animation";

export interface AnimationPresenter extends Presenter {

    getAnimation() : Animation
    setTitle(title: string);
    loadDataset(data: DataObject) : void;
    start() : void;
    stop() : void;
    pause() : void;
    resume() : void;
    isRunning(): boolean;
    hasPaused(): boolean;
    reverse() : void;
    sortBy(type : string);
    setChart(type : string);

}