import {Command} from "../interfaces/Command";
import {ChartAnimationPresenter} from "../ui/chartanimation/ChartAnimationPresenter";
import {PropertyNumberFormatDecorator} from "../utility/decorating/PropertyNumberFormatDecorator";

export class NumberFormatDecoratorCommand implements Command {

    private presenter : ChartAnimationPresenter;
    protected decorator : PropertyNumberFormatDecorator;

    constructor(presenter : ChartAnimationPresenter, decorator : PropertyNumberFormatDecorator) {
        this.presenter = presenter;
        this.decorator = decorator;
    }

    execute(map: Map<string, any>): void {
        this.decorator.setFormat(map.get("value"));
        this.presenter.update();
    }

}