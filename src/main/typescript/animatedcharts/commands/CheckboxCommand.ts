import {Command} from "./Command";

export abstract class CheckboxCommand implements Command {

    execute(map: Map<string, any>): void {
        if(map.get("event").target.checked) {
            this.doOnSelect(map);
        } else {
            this.doOnDeselect(map);
        }
    }

    abstract doOnSelect(map : Map<string, any>);
    abstract doOnDeselect(map : Map<string, any>);

}