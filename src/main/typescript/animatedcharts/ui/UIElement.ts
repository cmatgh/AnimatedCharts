import {UIComposite} from "./UIComposite";
import {Visitable} from "./visitor/Visitable";
import {Visitor} from "./visitor/Visitor";

export abstract class UIElement implements UIComposite, Visitable {

    protected static id: number = 0;

    protected id: number
    protected childElements: Set<UIElement>;
    protected $element: JQuery;
    protected elementId: string;

    public getId() {
        return this.id;
    }

    protected constructor(elementId: string) {
        this.id = UIElement.id++;
        this.childElements = new Set<UIElement>();
        this.$element = $(this.html());
        this.elementId = elementId;
        this.events();
    }

    protected abstract html(): string;

    protected abstract events(): void;

    abstract getJQueryElement(): JQuery;

    abstract accept(visitor: Visitor): void;

    public addElement(element: UIElement): void {
        this.childElements.add(element);
    }

    public removeElement(element: UIElement): void {
        this.childElements.delete(element);
    }

    public getElements() : Set<UIElement> {
        return this.childElements;
    }

    public drawElements(): void {
        const $parent = $(`#${this.elementId}`);
        this.checkElementExists($parent)

        if (!this.wasAlreadyDrawn($parent)) {
            // 'draw'
            $parent.replaceWith(this.$element);
            this.$element.attr("id", this.elementId);
        }

        this.childElements.forEach(element => {
            element.drawElements();
        });
    }

    private wasAlreadyDrawn($element: JQuery): boolean {
        return $element.html() != "";
    }

    private checkElementExists(element : JQuery) {
        if(element.length == 0){
            throw Error(`Element does not exist`);
        }
    }
}
