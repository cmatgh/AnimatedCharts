import {View} from "../interfaces/View";
import {Presenter} from "../interfaces/Presenter";
import {Template} from "../interfaces/Template";

export abstract class AbstractView implements View{

    protected template : Template;
    protected $element : JQuery;

    protected add(selector : string, presenter : Presenter) {
        this.getElement().find(selector).append(presenter.getElement());
    }

    public getElement(): JQuery {
        return this.$element;
    }

    public setTemplate(template: Template): void {
        this.template = template;
    }

    public getTemplate(): Template {
        return this.template;
    }

    public initialize(): void {
        if(this.$element != null) {
            this.getElement().off();
            const $newElement = $(this.template.html());
            this.$element.replaceWith($newElement);
            this.$element = $newElement;
        } else {
            this.$element = $(this.template.html());
        }

        this.doInitialize();
    }

    protected abstract doInitialize() : void;

    abstract setPresenter(presenter: Presenter): void;

}