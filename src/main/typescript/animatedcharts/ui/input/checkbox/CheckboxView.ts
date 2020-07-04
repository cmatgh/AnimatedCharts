import {InputView} from "../InputView";

export class CheckboxView extends InputView{

    private static checkboxId = 0;

    protected doInitialize(): void {
        this.getElement().find("[type=checkbox]").attr("id", "checkbox_" + CheckboxView.checkboxId);
        this.getElement().find("label").attr("for", "checkbox_" + CheckboxView.checkboxId);
        this.bind("click", this.presenter.onClick.bind(this.presenter),"#checkbox_" + CheckboxView.checkboxId);
        CheckboxView.checkboxId++;
    }

    setLabel(label: string): void {
        this.getElement()
            .find("label")
            .html(label);
    }

}