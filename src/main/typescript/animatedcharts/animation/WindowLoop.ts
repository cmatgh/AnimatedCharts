import {Observable} from "../utility/Observable";

export interface WindowLoop extends Observable{

    start() : void;
    stop() : void;
    isRunning() : boolean;

}