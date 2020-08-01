import {View} from "./View";
import {Command} from "./Command";

export interface Presenter {

    initialize() : void;

    setView(view : View) : void;

    getView() : View;

    getElement() : JQuery;

    setCommand(action : string, command : Command) : void;

    unsetCommand(action : string) : void;

    executeCommand(action : string, params : Map<string, any>) : void;
}
