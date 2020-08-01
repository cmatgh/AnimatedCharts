import {Presenter} from "./Presenter";
import {Template} from "./Template";

export interface View {

    initialize() : void;
    getElement() : JQuery
    setTemplate(template : Template) : void
    getTemplate() : Template;
    setPresenter(presenter : Presenter) : void;

}