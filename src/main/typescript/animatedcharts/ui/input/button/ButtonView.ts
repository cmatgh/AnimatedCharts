import {InputView} from "../InputView";
import {Template} from "../../Template";

export class ButtonView extends InputView {

    constructor(template : Template) {
        super(template);
    }

    doInitialize(): void {
        this.getElement().on("click", this.component.onClick.bind(this.component));
    }

    setLabel(label: string): void {
        this.getElement().html(label);
    }

}