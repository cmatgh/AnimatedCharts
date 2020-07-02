import {View} from "../View";
import {InputPresenter} from "./InputPresenter";
import {Template} from "../Template";

export abstract class InputView implements View {

    protected presenter: InputPresenter;
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

    setPresenter(presenter: InputPresenter): void {
        this.presenter = presenter;
    }

    setTemplate(template: Template): void {
        if(this.getElement() != null) {
            this.getElement().off();
        }

        this.template = template;
        this.initialize();
    }

    getTemplate(): Template {
        return this.template;
    }

    protected abstract doInitialize() : void;

    abstract setLabel(label : String) : void;
}
