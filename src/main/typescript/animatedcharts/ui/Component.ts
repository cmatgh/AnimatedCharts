import {Composite} from "./Composite";
import {Visitable} from "../visitor/Visitable";
import {Visitor} from "../visitor/Visitor";
import {HtmlTemplate} from "./HtmlTemplate";

export abstract class Component implements Composite, Visitable {

    protected static id: number = 0;

    protected childElements: Map<string, Component>;
    protected $element: JQuery;
    protected elementId: string;
    protected template : HtmlTemplate;

    public getId() : string{
        return this.elementId;
    }

    public setTemplate(template : HtmlTemplate) : void {
        this.template = template;
        this.$element = $(this.template.getTemplate());
        this.buildJQueryStructure();
    }

    protected constructor(elementId: string, template : HtmlTemplate) {
        this.template = template;
        this.childElements = new Map<string, Component>();
        this.$element = $(this.template.getTemplate());
        this.elementId = elementId;
        this.events();
    }

    protected events(): void { }

    getJQueryElement() : JQuery {
        return this.$element;
    }

    abstract accept(visitor: Visitor): void;

    public addElement(element: Component): void {
        this.childElements.set(element.getId(), element);
    }

    public removeElement(element: Component): void {
        this.childElements.delete(element.getId());
    }

    public buildJQueryStructure(): void {
        this.childElements.forEach((value, key) => {
            let currentElement = this.$element.find(`#${key}`).first();
            value.buildJQueryStructure();
            currentElement.replaceWith(value.getJQueryElement());
            value.getJQueryElement().attr("id", value.getId() + "_" + Component.id++);
        })
    }

}
