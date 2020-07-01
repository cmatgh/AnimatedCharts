import {Command} from "./Command";
import {AnimationView} from "../ui/animation/AnimationView";

export class SelectChartCommand implements Command {

    view: AnimationView;

    constructor(view: AnimationView) {
        this.view = view;
    }

    execute(map: Map<string, any>): void {
        this.view.setChart(map.get("event"));
    }

}