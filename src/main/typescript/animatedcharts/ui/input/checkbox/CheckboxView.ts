import {InputView} from "../InputView";
import {Template} from "../../Template";

export class CheckboxView extends InputView{

    protected doInitialize(): void {
        this.getElement()
            .find("[type=checkbox]")
            .first()
            .on("click", this.presenter.onClick.bind(this.presenter));
    }

    setLabel(label: String): void {
        this.getElement()
            .find("label")
            .html(label);
    }

}