import {Command} from "./Command";

export class CheckboxCommand implements Command {

    onSelectCommand : Command;
    onDeselectCommand : Command;

    constructor(onSelectCommand: Command, onDeselectCommand : Command) {
        this.onSelectCommand = onSelectCommand;
        this.onDeselectCommand = onDeselectCommand;
    }

    execute(map: Map<string, any>): void {
        if(map.get("event").target.checked) {
            this.onSelectCommand.execute(map);
        } else {
            this.onDeselectCommand.execute(map);
        }
    }

}