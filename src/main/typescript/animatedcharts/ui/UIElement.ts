import {UIComposite} from "./UIComposite";
import {Visitable} from "./visitor/Visitable";
import {Visitor} from "./visitor/Visitor";

export abstract class UIElement implements UIComposite, Visitable {

    protected static id: number = 0;

    protected abstract html(): string;

    protected abstract events(): void;

    protected id: number
    protected childUIElements: Set<UIElement>;
    protected $element: JQuery;
    protected elementId: string;

    public getId() {
        return this.id;
    }

    protected constructor(elementId: string) {
        this.id = UIElement.id++;
        this.childUIElements = new Set<UIElement>();
        this.$element = $(this.html());
        this.elementId = elementId;
        this.events();
    }

    abstract getJQueryElement(): JQuery;

    public addElement(element: UIElement): void {
        this.childUIElements.add(element);
    }

    public removeElement(element: UIElement): void {
        this.childUIElements.delete(element);
    }

    public getElements() : Set<UIElement> {
        return this.childUIElements;
    }

    public drawElements(): void {
        const $element = $(`#${this.elementId}`);
        if (!this.hasElement($element)) {
            $element.append(this.$element);
        }

        this.childUIElements.forEach(element => {
            element.drawElements();
        });
    }

    private hasElement($element: JQuery): boolean {
        return $element.html() != ""
    }

    abstract accept(visitor: Visitor): void;
}
