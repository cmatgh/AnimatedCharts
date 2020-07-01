import {InputView} from "../InputView";
import {Template} from "../../Template";

export class CheckboxView extends InputView{

    constructor(template : Template) {
        super(template);
    }

    protected doInitialize(): void {
        this.getElement().find("[type=checkbox]").first().on("click", this.component.onClick.bind(this.component));
    }

    setLabel(label: String): void {
        this.getElement().find("label").html(label);
    }

}