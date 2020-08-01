import {View} from "../interfaces/View";
import {Presenter} from "../interfaces/Presenter";
import {Template} from "../interfaces/Template";
import {Component} from "./Component";
import {Command} from "../interfaces/Command";
import TriggeredEvent = JQuery.TriggeredEvent;

export abstract class AbstractView implements View{

    protected presenter : Presenter;
    protected template : Template;
    protected $element : JQuery;

    protected addComponent(selector : string, component : Component) {
        this.getElement().find(selector).append(component.getElement());
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

    setPresenter(presenter: Presenter) : void {
        this.presenter = presenter;
    }

    protected bind(event : string, func : Function, selector? : string) {

        if(selector) {
            // @ts-ignore
            this.getElement().find(selector).addBack().on(event, func);
        } else {
            // @ts-ignore
            this.getElement().on(event, func);
        }
    }

    protected bindEvent(events : string, action : string, selector? : string) {
        if(selector) {
            this.getElement().find(selector).addBack().on(events, event => this.callCommand(event, this.presenter, action));
        } else {
            this.getElement().on(events, event => this.callCommand(event, this.presenter, action));
        }
    }

    private callCommand(event : TriggeredEvent, presenter : Presenter, action : string) {
        presenter.executeCommand(action, new Map<string, any>([["event", event]]))
    }

}