import {Command} from "../interfaces/Command";
import {AnimationPresenter} from "../ui/animation/AnimationPresenter";
import {PropertyNumberFormatDecorator} from "../utility/decorating/PropertyNumberFormatDecorator";

export class NumberFormatDecoratorCommand implements Command {

    private presenter : AnimationPresenter;
    protected decorator : PropertyNumberFormatDecorator;

    constructor(presenter : AnimationPresenter, decorator : PropertyNumberFormatDecorator) {
        this.presenter = presenter;
        this.decorator = decorator;
    }

    execute(map: Map<string, any>): void {
        this.decorator.setFormat(map.get("event"));
        this.presenter.update();
    }

}