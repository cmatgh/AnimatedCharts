import {InputView} from "../InputView";

export class TextfieldView extends InputView {

    protected doInitialize() : void{
        this.bind("submit", this.presenter.onSubmit.bind(this.presenter), `#textfield-input`);
        this.bind("focusout", this.presenter.onSubmit.bind(this.presenter), `#textfield-input`);
        console.log("events");
    }

    setLabel(label: string): void {
        this.getElement().find(`#label`).html(label);
    }

}