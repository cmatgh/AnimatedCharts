import {View} from "../View";
import {InputPresenter} from "./InputPresenter";
import {Template} from "../Template";

export abstract class InputView implements View {

    protected component: InputPresenter;
    protected template: Template;
    protected $element: JQuery;

    protected constructor(template: Template) {
        this.template = template;
    }

    initialize(): void {
        this.$element = $(this.template.html());
        this.doInitialize();
    }

    getElement(): any {
        return this.$element;
    }

    setComponent(component: InputPresenter): void {
        this.component = component;
    }

    setTemplate(template: Template): void {
        if(this.getElement() != null) {
            this.getElement().off("click");
        }

        this.template = template;
        this.initialize();
    }

    protected abstract doInitialize() : void;

    abstract setLabel(label : String) : void;
}
