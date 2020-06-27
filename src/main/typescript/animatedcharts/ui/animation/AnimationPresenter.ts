import {Presenter} from "../Presenter";

export interface AnimationPresenter extends Presenter{

    setTitle(title: string);
    loadDataset(event: Event) : void;
    start() : void;
    stop() : void;
    pause() : void;
    resume() : void;
    reverse() : void;
    sortBy(type : string);

}