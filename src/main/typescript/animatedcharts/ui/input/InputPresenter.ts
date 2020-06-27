import {Presenter} from "../Presenter";
import {Command} from "../../commands/Command";
import {InputView} from "./InputView";

export abstract class InputPresenter implements Presenter {

    protected view : InputView;
    protected onClickCommand : Command;
    protected onSubmitCommand : Command;
    protected onSelectCommand : Command;
    protected onChangeCommand : Command;

    protected constructor(view : InputView) {
        this.setView(view);
        view.setComponent(this);
    }

    initialize(): void {
        this.view.initialize();
        this.doInitialize();
    }

    protected abstract doInitialize();

    setView(view: InputView) {
        this.view = view;
        this.view.setComponent(this);
    }

    onClick(event: Event): void {
        this.onClickCommand(event);
    }

    onChange(event: Event): void {
        this.onChangeCommand(event);
    }

    onSelect(event: Event): void {
        this.onSelectCommand(event);
    }

    onSubmit(event: Event): void {
        this.onSubmitCommand(event);
    }

    getElement(): JQuery {
        return this.view.getElement();
    }

    setOnClick(command: Command): void {
        this.onClickCommand = command;
    }

    setOnChange(command: Command): void {
        this.onChangeCommand = command;
    }

    setOnSelect(command: Command): void {
        this.onSelectCommand = command;
    }

    setOnSubmit(command: Command): void {
        this.onSubmitCommand = command;
    }

}
