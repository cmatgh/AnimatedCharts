import {InputView} from "../InputView";
import {Template} from "../../Template";

export class ButtonView extends InputView {

    protected doInitialize(): void {
        this.getElement().on("click", this.presenter.onClick.bind(this.presenter));
    }

    setLabel(label: string): void {
        this.getElement().html(label);
    }

}