import {Template} from "../../../interfaces/Template";

export abstract class TemplateFactory {

    private static instance : TemplateFactory;

    static initialize(templateFactory : TemplateFactory) : void {
        if(this.instance == null) {
            this.instance = templateFactory;
        }
    }

    static getInstance() : TemplateFactory {
        return this.instance
    }

    abstract createButtonTemplate() : Template;
    abstract createCheckboxTemplate() : Template;
    abstract createFileDialogTemplate() : Template;
    abstract createRangeTemplate() : Template;
    abstract createSelectTemplate() : Template;

}