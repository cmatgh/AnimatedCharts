import {Presenter} from "../../../../interfaces/Presenter";
import {View} from "../../../../interfaces/View";
import {Template} from "../../../../interfaces/Template";

export interface ComponentKit {

    createPresenter() : Presenter;
    createView() : View;
    createTemplate() : Template;

}