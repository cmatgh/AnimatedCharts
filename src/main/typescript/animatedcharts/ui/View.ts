import {Presenter} from "./Presenter";
import {Template} from "./Template";

export interface View {

    initialize() : void;
    getElement() : any
    setTemplate(template : Template) : void
    setComponent(component : Presenter<any>) : void;

}