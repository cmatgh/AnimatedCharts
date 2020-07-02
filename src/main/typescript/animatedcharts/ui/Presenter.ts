import {View} from "./View";

export interface Presenter {

    initialize() : void;

    setView(view : View)

    getView() : View;

    getElement() : JQuery

}
