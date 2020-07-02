import {InputView} from "../InputView";
import {Template} from "../../Template";

export class FileDialogView extends InputView{

    protected doInitialize(): void {
        this.getElement().on("change", this.presenter.onChange.bind(this.presenter));
    }

    setLabel(label: String): void {
        this.getElement().find("label").html(label);
    }


}