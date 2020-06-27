import {InputView} from "../InputView";
import {Template} from "../../Template";

export class FileDialogView extends InputView{

    constructor(template : Template) {
        super(template);
    }

    protected doInitialize(): void {
        this.getElement().on("change", this.component.onChange.bind(this.component));
    }

    setLabel(label: String): void {
        this.getElement().find("label").html(label);
    }


}