import {Command} from "../interfaces/Command";
import {ChartAnimationPresenter} from "../ui/chartanimation/ChartAnimationPresenter";

export class SelectChartCommand implements Command {

    presenter: ChartAnimationPresenter;

    constructor(presenter: ChartAnimationPresenter) {
        this.presenter = presenter;
    }

    execute(map: Map<string, any>): void {
        this.presenter.setChart(map.get("value"));
    }

}