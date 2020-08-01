import {Command} from "../interfaces/Command";
import {ChartAnimationPresenter} from "../ui/chartanimation/ChartAnimationPresenter";
import {AppendPropertyDecorator} from "../utility/decorating/AppendPropertyDecorator";

export class UnitDecoratorCommand implements Command {

    private presenter : ChartAnimationPresenter;
    protected decorator : AppendPropertyDecorator;

    constructor(presenter : ChartAnimationPresenter, appendPropertyDecorator : AppendPropertyDecorator) {
        this.presenter = presenter;
        this.decorator = appendPropertyDecorator;
    }

    execute(map: Map<string, any>): void {
        this.decorator.setAppendValue(map.get("value"));
        this.presenter.update();
    }

}