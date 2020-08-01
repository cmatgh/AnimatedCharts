import {ComponentKit} from "./ComponentKit";
import {Presenter} from "../../../../interfaces/Presenter";
import {Template} from "../../../../interfaces/Template";
import {View} from "../../../../interfaces/View";
import {ButtonPresenter} from "../../../../ui/input/button/ButtonPresenter";
import {TemplateFactory} from "../TemplateFactory";
import {ButtonView} from "../../../../ui/input/button/ButtonView";

/**
 * Abstract factory design pattern
 *
 * Participants:
 *      AbstractFactory : {@link ComponentKit}
 *      ConcreteFactory: {@link ButtonKit}
 *      AbstractProduct: {@link Presenter}, {@link View}, {@link Template}
 *      ConcreteProduct: {@link ButtonPresenter}, {@link ButtonView}, {@link DefaultButtonTemplate}
 *      Client: application
 *
 */
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