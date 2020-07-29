import {Template} from "../../../ui/Template";

export abstract class TemplateFactory {

    abstract createButtonTemplate() : Template;
    abstract createCheckboxTemplate() : Template;
    abstract createFileDialogTemplate() : Template;
    abstract createMultiselectTemplate() : Template;
    abstract createRangeTemplate() : Template;
    abstract createSelectTemplate() : Template;
    abstract createTextfieldTemplate() : Template;
}