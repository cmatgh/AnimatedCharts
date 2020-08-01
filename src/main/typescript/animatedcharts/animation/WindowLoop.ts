import {Observable} from "../interfaces/Observable";

export interface WindowLoop extends Observable{

    countObservers(): number;
    start() : void;
    stop() : void;
    isRunning() : boolean;

}