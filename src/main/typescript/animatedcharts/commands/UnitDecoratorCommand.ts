import {Command} from "./Command";
import {AnimationPresenter} from "../ui/animation/AnimationPresenter";
import {PropertyNumberFormatDecorator} from "../utility/decorating/PropertyNumberFormatDecorator";
import {AppendPropertyDecorator} from "../utility/decorating/AppendPropertyDecorator";

export class UnitDecoratorCommand implements Command {

    private presenter : AnimationPresenter;
    protected decorator : AppendPropertyDecorator;

    constructor(presenter : AnimationPresenter, appendPropertyDecorator : AppendPropertyDecorator) {
        this.presenter = presenter;
        this.decorator = appendPropertyDecorator;
    }

    execute(map: Map<string, any>): void {
        this.decorator.setAppendValue(map.get("event"));
        this.presenter.update();
    }

}