import {UIElement} from "./UIElement";
import {Command} from "./command/Command";
import { Visitor } from "./visitor/Visitor";

export class UIButton extends UIElement {

    protected html(): string {
        return `
            <button type="button" class="btn btn-sm btn-primary btn-block mt-1 mb-1"></button>     
        `;
    }

    protected events(): void {
        this.$element.on("click", (event: Event) => this.command.execute(event));
    }

    protected $element: JQuery;
    protected id: number;
    private command: Command;

    constructor(elementId: string, label: string, command: Command) {
        super(elementId);
        this.$element.html(label);
        this.command = command;
    }

    getJQueryElement(): JQuery {
        return this.$element;
    }

    setCommand(command: Command) : void {
        this.command = command;
    }

    accept(visitor: Visitor): void {
        visitor.visitButton(this);
    }

}