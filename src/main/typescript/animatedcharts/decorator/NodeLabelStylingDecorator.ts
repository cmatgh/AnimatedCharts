import {LabelStylingDecorator} from "./LabelStylingDecorator";
import {Preconditions} from "../utility/Preconditions";

export class NodeLabelStylingDecorator extends LabelStylingDecorator{

    nodeType : string

    constructor(nodeType : string) {
        super();
        Preconditions.checkNotNull(nodeType);
        Preconditions.checkNotEmpty(nodeType);

        this.nodeType = nodeType;
    }

    apply(label: string): string {
        let decoratedLabel = `<${this.nodeType}>${label}</${this.nodeType}>`;
        if(this.labelStyling != null) {
            return this.labelStyling.apply(decoratedLabel);
        }

        return decoratedLabel;
    }

}