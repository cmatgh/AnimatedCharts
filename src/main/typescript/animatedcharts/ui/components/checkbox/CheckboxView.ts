import {AbstractView} from "../../AbstractView";

export class CheckboxView extends AbstractView{

    private static checkboxId = 0;

    protected doInitialize(): void {
        this.getElement().find("[type=checkbox]").attr("id", "checkbox_" + CheckboxView.checkboxId);
        this.getElement().find("label").attr("for", "checkbox_" + CheckboxView.checkboxId);
        this.bindEvent("click", "click","#checkbox_" + CheckboxView.checkboxId);
        CheckboxView.checkboxId++;
    }

    setLabel(label: string): void {
        this.getElement()
            .find("label")
            .html(label);
    }

}