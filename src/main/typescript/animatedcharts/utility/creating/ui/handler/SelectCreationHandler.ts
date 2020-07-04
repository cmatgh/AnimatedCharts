import {CreationHandler} from "./CreationHandler";
import {Presenter} from "../../../../ui/Presenter";
import {PresenterCreator} from "../PresenterCreator";
import {ButtonPresenter} from "../../../../ui/input/button/ButtonPresenter";
import {ButtonView} from "../../../../ui/input/button/ButtonView";
import {DefaultButtonTemplate} from "../../../../ui/input/button/templates/DefaultButtonTemplate";
import {SelectView} from "../../../../ui/input/select/SelectView";
import {SelectTemplate} from "../../../../ui/input/select/SelectTemplate";
import {SelectPresenter} from "../../../../ui/input/select/SelectPresenter";

export class SelectCreationHandler extends CreationHandler{

    constructor(type : string) {
        super(type);
    }

    protected doCreate(): Presenter {
        const presenterCreator = new PresenterCreator();
        return presenterCreator.create(new SelectPresenter(), new SelectView(), new SelectTemplate());
    }

}