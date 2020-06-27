import {View} from "./View";

export interface Presenter {

    initialize() : void;

    setView(view : View)

    getElement() : JQuery

}
