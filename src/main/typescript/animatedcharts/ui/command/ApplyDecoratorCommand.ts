import {Command} from "./Command";
import {LabelVisitor} from "../visitor/LabelVisitor";
import {UIElement} from "../UIElement";
import {NodeLabelStylingDecorator} from "../decorator/NodeLabelStylingDecorator";

export class ApplyDecoratorCommand implements Command {

    private labelVisitor : LabelVisitor;
    private element : UIElement;
    private decorator : NodeLabelStylingDecorator;

    constructor(nodeType: string, labelVisitor : LabelVisitor, element : UIElement) {
        this.labelVisitor = labelVisitor;
        this.decorator = new NodeLabelStylingDecorator(nodeType);
        this.element = element;
    }

    execute(event: Event): void {
        if(!this.labelVisitor.hasDecorator(this.decorator)) {
            this.labelVisitor.addDecorator(this.decorator);
        } else {
            this.labelVisitor.removeDecorator(this.decorator);
        }

        this.element.accept(this.labelVisitor);
    }

}