import {InputPresenter} from "../InputPresenter";
import {InputView} from "../InputView";

export class ButtonPresenter<V extends InputView> extends InputPresenter<V> {

    protected doInitialize() {
    }

    setLabel(label: string): void {
        this.view.setLabel(label);
    }

}