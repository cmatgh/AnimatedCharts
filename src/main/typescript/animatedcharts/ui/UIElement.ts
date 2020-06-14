import {UIComposite} from "./UIComposite";

export abstract class UIElement implements UIComposite{
    protected static id: number = 0;

    protected abstract html() : string;
    protected abstract events() : void;

    protected id: number
    protected childUIElements: Set<UIElement>;
    protected $element: JQuery;
    protected elementId: string;

    protected constructor(elementId : string){
        this.id = UIElement.id++;
        this.childUIElements = new Set<UIElement>();
        this.$element = $(this.html());
        this.elementId = elementId;
        this.events();
    }

    abstract getJQueryElement() : JQuery;

    public addElement(element : UIElement) : void {
        this.childUIElements.add(element);
    }

    public removeElement(element : UIElement) : void {
        this.childUIElements.delete(element);
    }

    public drawElements() : void {
        $( `#${this.elementId}`).append(this.$element);
        this.childUIElements.forEach( element => {
            element.drawElements();
        });
    }
}