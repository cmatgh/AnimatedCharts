import {View} from "../interfaces/View";
import {Presenter} from "../interfaces/Presenter";
import {Template} from "../interfaces/Template";
import {Preconditions} from "../utility/Preconditions";
import {Command} from "../interfaces/Command";
import {TemplateFactory} from "../utility/creating/ui/TemplateFactory";

export abstract class Component {

    protected templateFactory : TemplateFactory;
    private presenter : Presenter;
    private view : View;
    private template : Template;

    constructor(templateFactory : TemplateFactory) {
        Preconditions.checkNotNull(templateFactory);

        this.templateFactory = templateFactory;
        this.presenter =  this.createPresenter();
        this.view = this.createView();
        this.template = this.createTemplate();
    }

    abstract createPresenter() : Presenter;

    abstract createView() : View;

    abstract createTemplate() : Template;

    getPresenter() : Presenter {
        return this.presenter;
    }

    getView() : View {
        return this.view;
    }

    getTemplate() : Template {
        return this.template;
    }

    getElement() : JQuery {
        return this.view.getElement();
    }

    setTemplate(template : Template) : void {
        this.template = template;
    }

    initialize() : void {
        this.presenter.setView(this.view);
        this.view.setPresenter(this.presenter);
        this.view.setTemplate(this.template);
        this.presenter.initialize();
        this.view.initialize();
    }

    setCommand(event : string, command : Command) : void {
        this.presenter.setCommand(event, command);
    }

    unsetCommand(event : string) : void {
        this.presenter.unsetCommand(event);
    }
}