import {AbstractView} from "../../AbstractView";

export class FileDialogView extends AbstractView{

    protected doInitialize(): void {
        this.bindEvent("change", "change")
    }

    setLabel(label: string): void {
        this.getElement().find("label").html(label);
    }


}