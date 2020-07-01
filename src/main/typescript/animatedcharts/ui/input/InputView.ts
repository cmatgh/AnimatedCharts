import {View} from "../View";
import {InputPresenter} from "./InputPresenter";
import {Template} from "../Template";

export abstract class InputView implements View {

    protected presenter: InputPresenter<InputView>;
    protected template: Template;
    protected $element: JQuery;

    initialize(): void {
        if(this.$element != null) {
            const $newElement = $(this.template.html());
            this.$element.replaceWith($newElement);
            this.$element = $newElement;
        } else {
            this.$element = $(this.template.html());
        }

        this.doInitialize();
    }

    getElement(): any {
        return this.$element;
    }

    setComponent(component: InputPresenter<InputView>): void {
        this.presenter = component;
    }

    setTemplate(template: Template): void {
        if(this.getElement() != null) {
            this.getElement().off();
        }

        this.template = template;
        this.initialize();
    }

    protected abstract doInitialize() : void;

    abstract setLabel(label : String) : void;
}
