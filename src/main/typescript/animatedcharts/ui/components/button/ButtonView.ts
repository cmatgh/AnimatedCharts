import {AbstractView} from "../../AbstractView";

export class ButtonView extends AbstractView {

    protected doInitialize(): void {
        this.bind( "click", this.presenter.executeCommand.bind(this.presenter, "click"))
    }

    setLabel(label: string): void {
        this.getElement().html(label);
    }

}