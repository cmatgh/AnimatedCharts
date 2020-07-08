import {InputView} from "../InputView";

export class FileDialogView extends InputView{

    protected doInitialize(): void {
        this.bind("change", this.presenter.onChange.bind(this.presenter))
    }

    setLabel(label: string): void {
        this.getElement().find("label").html(label);
    }


}