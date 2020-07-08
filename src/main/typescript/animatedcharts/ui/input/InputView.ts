import {InputPresenter} from "./InputPresenter";
import {AbstractView} from "../AbstractView";

export abstract class InputView extends AbstractView {

    protected presenter: InputPresenter;

    setPresenter(presenter: InputPresenter): void {
        this.presenter = presenter;
    }

    protected bind(event : string, func : Function, selector? : string) {

        if(selector) {
            // @ts-ignore
            this.getElement().find(selector).addBack().on(event, func);
        } else {
            // @ts-ignore
            this.getElement().on(event, func);
        }
    }

    abstract setLabel(label : String) : void;
}
