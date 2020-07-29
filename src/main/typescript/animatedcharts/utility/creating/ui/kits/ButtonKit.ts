import {ComponentKit} from "./ComponentKit";
import {Presenter} from "../../../../ui/Presenter";
import {Template} from "../../../../ui/Template";
import {View} from "../../../../ui/View";
import {ButtonPresenter} from "../../../../ui/input/button/ButtonPresenter";
import {TemplateFactory} from "../TemplateFactory";
import {ButtonView} from "../../../../ui/input/button/ButtonView";

export class ButtonKit implements ComponentKit{

    private templateFactory : TemplateFactory;

    constructor(templateFactory : TemplateFactory) {
        this.templateFactory = templateFactory;
    }

    createPresenter(): Presenter {
        return new ButtonPresenter();
    }

    createTemplate(): Template {
        return this.templateFactory.createButtonTemplate();
    }

    createView(): View {
        return new ButtonView();
    }

}