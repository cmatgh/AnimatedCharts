import {InputPresenter} from "../InputPresenter";

export class ButtonPresenter extends InputPresenter {

    protected doInitialize() {
    }

    setLabel(label: string): void {
        this.view.setLabel(label);
    }

}