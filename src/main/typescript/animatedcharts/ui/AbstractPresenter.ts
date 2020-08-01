import {Presenter} from "../interfaces/Presenter";
import {View} from "../interfaces/View";

export abstract class AbstractPresenter implements Presenter{

    protected view : View;

    public getElement(): JQuery {
        return this.getView().getElement();
    }

    setView(view: View) : void{
        this.view = view;
        this.view.setPresenter(this);
    }

    getView(): View {
        return this.view;
    }

    public initialize(): void {
        this.doInitialize();
    }

    protected abstract doInitialize() : void;

}