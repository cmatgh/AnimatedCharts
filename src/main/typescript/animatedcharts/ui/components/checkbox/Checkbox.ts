import {Component} from "../../Component";
import {Presenter} from "../../../interfaces/Presenter";
import {Template} from "../../../interfaces/Template";
import {View} from "../../../interfaces/View";
import {CheckboxPresenter} from "./CheckboxPresenter";
import {CheckboxView} from "./CheckboxView";

export class Checkbox extends Component {

    createPresenter(): Presenter {
        return new CheckboxPresenter();
    }

    createTemplate(): Template {
        return this.templateFactory.createCheckboxTemplate();
    }

    createView(): View {
        return new CheckboxView();
    }

    setLabel(label : string) : void {
        (this.getView() as CheckboxView).setLabel(label)
    }

}