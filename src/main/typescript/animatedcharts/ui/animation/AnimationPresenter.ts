import {Presenter} from "../Presenter";
import {Animation, DataObject} from "../../animation/Animation";
import {AnimationView} from "./AnimationView";

export interface AnimationPresenter<V extends AnimationView> extends Presenter<V>{

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

}