import {Observer} from "./Observer";

export interface Observable {

    register(object: Observer) : void;

    unregister(object: Observer) : void;

    notifyObservers() : void;

}