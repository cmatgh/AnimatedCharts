import {Presenter} from "../../../../ui/Presenter";
import {View} from "../../../../ui/View";
import {Template} from "../../../../ui/Template";

export interface ComponentKit {

    createPresenter() : Presenter;
    createView() : View;
    createTemplate() : Template;
    
}