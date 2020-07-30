import {Command} from "../interfaces/Command";
import {AnimationPresenter} from "../ui/animation/AnimationPresenter";

export class SelectChartCommand implements Command {

    presenter: AnimationPresenter;

    constructor(presenter: AnimationPresenter) {
        this.presenter = presenter;
    }

    execute(map: Map<string, any>): void {
        this.presenter.setChart(map.get("event"));
    }

}