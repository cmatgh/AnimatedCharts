import {CreationHandler} from "./CreationHandler";
import {Presenter} from "../../../ui/Presenter";
import {PresenterCreator} from "./PresenterCreator";
import {ButtonPresenter} from "../../../ui/input/button/ButtonPresenter";
import {ButtonView} from "../../../ui/input/button/ButtonView";
import {DefaultButtonTemplate} from "../../../ui/input/button/templates/DefaultButtonTemplate";
import {SelectView} from "../../../ui/input/select/SelectView";
import {SelectTemplate} from "../../../ui/input/select/SelectTemplate";
import {SelectPresenter} from "../../../ui/input/select/SelectPresenter";

export class SelectCreationHandler extends CreationHandler{

    constructor(type : string) {
        super(type);
    }

    protected doCreate(): Presenter<any> {
        const presenterCreator = new PresenterCreator();
        return presenterCreator.create<SelectPresenter<SelectView>, SelectView>(new SelectPresenter<SelectView>(), new SelectView(), new SelectTemplate());
    }

}