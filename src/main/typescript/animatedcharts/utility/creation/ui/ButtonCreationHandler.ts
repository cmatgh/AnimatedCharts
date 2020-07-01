import {CreationHandler} from "./CreationHandler";
import {Presenter} from "../../../ui/Presenter";
import {PresenterCreator} from "./PresenterCreator";
import {ButtonPresenter} from "../../../ui/input/button/ButtonPresenter";
import {ButtonView} from "../../../ui/input/button/ButtonView";
import {DefaultButtonTemplate} from "../../../ui/input/button/templates/DefaultButtonTemplate";

export class ButtonCreationHandler extends CreationHandler{

    constructor(type : string) {
        super(type);
    }

    protected doCreate(): Presenter<any> {
        const presenterCreator = new PresenterCreator();
        return presenterCreator.create<ButtonPresenter<ButtonView>, ButtonView>(new ButtonPresenter<ButtonView>(), new ButtonView(), new DefaultButtonTemplate());
    }

}