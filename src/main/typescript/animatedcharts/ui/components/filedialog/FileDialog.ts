import {Component} from "../../Component";
import {Presenter} from "../../../interfaces/Presenter";
import {Template} from "../../../interfaces/Template";
import {View} from "../../../interfaces/View";
import {FileDialogView} from "./FileDialogView";
import {FileDialogPresenter} from "./FileDialogPresenter";

export class FileDialog extends Component {

    createPresenter(): Presenter {
        return new FileDialogPresenter();
    }

    createTemplate(): Template {
        return this.templateFactory.createFileDialogTemplate();
    }

    createView(): View {
        return new FileDialogView();
    }

    setLabel(label : string) : void {
        (this.getView() as FileDialogView).setLabel(label);
    }
}