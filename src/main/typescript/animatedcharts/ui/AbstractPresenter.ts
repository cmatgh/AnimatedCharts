import {Presenter} from "../interfaces/Presenter";
import {View} from "../interfaces/View";
import {Command} from "../interfaces/Command";

export abstract class AbstractPresenter implements Presenter{

    private commands : Map<string, Command>
    protected view : View;

    constructor() {
        this.commands = new Map<string, Command>();
    }

    public getElement(): JQuery {
        return this.getView().getElement();
    }

    setView(view: View) : void{
        this.view = view;
    }

    getView(): View {
        return this.view;
    }

    public initialize(): void {
        this.doInitialize();
    }

    protected abstract doInitialize() : void;

    setCommand(action : string, command : Command): void {
        this.commands.set(action, command);
    }

    unsetCommand(action : string): void {
        this.commands.delete(action);
    }

    executeCommand(action : string, params : Map<string, any>): void {
        if(this.commands.has(action)){
            this.commands.get(action).execute(params);
        }
    }

}