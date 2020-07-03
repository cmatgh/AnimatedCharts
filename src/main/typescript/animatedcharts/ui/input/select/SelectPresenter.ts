import {InputPresenter} from "../InputPresenter";
import {SelectView} from "./SelectView";

export class SelectPresenter extends InputPresenter{

    protected view : SelectView;

    options : Map<string, string>;

    protected doInitialize() {
        this.options = new Map<string, string>();
    }

    addOption(value : string, label : string) {
        this.options.set(value, label);
        this.view.printOptions(this.options);
    }

    removeOption(value : string) {
        this.options.delete(value);
        this.view.printOptions(this.options);
    }

}