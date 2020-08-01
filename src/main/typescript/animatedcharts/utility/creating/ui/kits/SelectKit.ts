import {ComponentKit} from "./ComponentKit";
import {Presenter} from "../../../../interfaces/Presenter";
import {Template} from "../../../../interfaces/Template";
import {View} from "../../../../interfaces/View";
import {TemplateFactory} from "../TemplateFactory";
import {SelectPresenter} from "../../../../ui/input/select/SelectPresenter";
import {SelectView} from "../../../../ui/input/select/SelectView";

/**
 * Abstract factory design pattern
 *
 * Participants:
 *      AbstractFactory : {@link ComponentKit}
 *      ConcreteFactory: {@link SelectKit}
 *      AbstractProduct: {@link Presenter}, {@link View}, {@link Template}
 *      ConcreteProduct: {@link SelectPresenter}, {@link SelectView}, {@link SelectTemplate}
 *      Client: application
 *
 */
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