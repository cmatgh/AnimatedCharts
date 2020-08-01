import {Component} from "../../Component";
import {ButtonPresenter} from "./ButtonPresenter";
import {ButtonView} from "./ButtonView";
import {Template} from "../../../interfaces/Template";
import {Presenter} from "../../../interfaces/Presenter";
import {View} from "../../../interfaces/View";

export class Button extends Component {

    setLabel(label: string): void {
        (this.getView() as ButtonView).setLabel(label);
    }

    createPresenter(): Presenter {
        return new ButtonPresenter();
    }

    createTemplate(): Template {
        return this.templateFactory.createButtonTemplate();
    }

    createView(): View {
        return new ButtonView();
    }

}