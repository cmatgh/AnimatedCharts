import {Component} from "../Component";
import {Command} from "../../commands/Command";
import { Visitor } from "../../visitor/Visitor";
import {ButtonTemplate} from "./ButtonTemplate";

export class ButtonComponent extends Component {

    protected $element: JQuery;
    protected id: number;
    private command: Command;

    constructor(elementId: string, label: string, command: Command) {
        super(elementId, new ButtonTemplate());
        this.$element.html(label);
        this.command = command;
    }

    protected events(): void {
        this.$element.on("click", (event: Event) => this.command.execute(event));
    }

    setCommand(command: Command) : void {
        this.command = command;
    }

    accept(visitor: Visitor): void {
        visitor.visitButton(this);
    }
}
