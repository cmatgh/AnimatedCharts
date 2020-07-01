import {View} from "./View";

export interface Presenter<V extends View> {

    initialize() : void;

    setView(view : V)

    getView() : V;

    getElement() : JQuery

}
