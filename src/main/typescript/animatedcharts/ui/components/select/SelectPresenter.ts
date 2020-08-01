import {SelectView} from "./SelectView";
import {AbstractPresenter} from "../../AbstractPresenter";

export class SelectPresenter extends AbstractPresenter{

    options : Map<string, string>;

    protected doInitialize() {
        this.options = new Map<string, string>();
    }

    addOption(value : string, label : string) {
        this.options.set(value, label);
        (this.view as SelectView).printOptions(this.options);
    }

    removeOption(value : string) {
        this.options.delete(value);
        (this.view as SelectView).printOptions(this.options);
    }

}