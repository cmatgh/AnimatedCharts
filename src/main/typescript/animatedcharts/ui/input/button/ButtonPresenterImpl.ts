import {InputPresenter} from "../InputPresenter";
import {Command} from "../../../commands/Command";
import {InputView} from "../InputView";

export class ButtonPresenterImpl extends InputPresenter {

    constructor(view : InputView ) {
        super(view);
    }

    protected doInitialize() {
    }

    setLabel(label: string): void {
        this.view.setLabel(label);
    }

}