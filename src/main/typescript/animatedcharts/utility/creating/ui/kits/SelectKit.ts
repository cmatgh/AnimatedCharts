import {ComponentKit} from "./ComponentKit";
import {Presenter} from "../../../../interfaces/Presenter";
import {Template} from "../../../../interfaces/Template";
import {View} from "../../../../interfaces/View";
import {TemplateFactory} from "../TemplateFactory";
import {SelectPresenter} from "../../../../ui/input/select/SelectPresenter";
import {SelectView} from "../../../../ui/input/select/SelectView";

export class SelectKit implements ComponentKit {

    private templateFactory : TemplateFactory;

    constructor(templateFactory : TemplateFactory) {
        this.templateFactory = templateFactory;
    }

    createPresenter(): Presenter {
        return new SelectPresenter();
    }

    createTemplate(): Template {
        return this.templateFactory.createSelectTemplate();
    }

    createView(): View {
        return new SelectView();
    }

}