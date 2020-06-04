import {UIElement} from "./UIElement";
import {Command} from "./command/Command";

export class UIButton extends UIElement {

    protected html(): string {
        return `
            <button type="button" class="btn btn-primary"></button>     
        `;
    }

    protected events(): void {
        this.$element.on("click", (event: Event) => this.command.execute(event));
    }

    protected $element: JQuery;
    protected id: number;
    private command: Command;

    constructor(label: string, command: Command) {
        super();
        this.$element.html(label);
        this.command = command;
    }

    getJQueryElement(): JQuery {
        return this.$element;
    }

    setCommand(command: Command) : void {
        this.command = command;
    }

}