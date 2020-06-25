import {LabelStyling} from "./LabelStyling";

export abstract class LabelStylingDecorator extends LabelStyling{

    protected labelStyling : LabelStyling;

    getLabelStyling() : LabelStyling {
        return this.labelStyling;
    }

    setLabelStyling(labelStyling : LabelStyling) : void {
        this.labelStyling = labelStyling
    }

    protected constructor() {
        super();
        this.labelStyling = null;
    }

}