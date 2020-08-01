import {Component} from "../../Component";
import {Presenter} from "../../../interfaces/Presenter";
import {Template} from "../../../interfaces/Template";
import {View} from "../../../interfaces/View";
import {SelectPresenter} from "./SelectPresenter";
import {SelectView} from "./SelectView";

export class Select extends Component {

    createPresenter(): Presenter {
        return new SelectPresenter();
    }

    createTemplate(): Template {
        return this.templateFactory.createSelectTemplate();
    }

    createView(): View {
        return new SelectView();
    }

    setLabel(label : string) : void {
        (this.getView() as SelectView).setLabel(label);
    }

    addOption(value : string, label : string) {
        (this.getPresenter() as SelectPresenter).addOption(value, label);
    }

    removeOption(value : string) {
        (this.getPresenter() as SelectPresenter).removeOption(value);
    }
}