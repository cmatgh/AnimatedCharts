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
        if(this.onClickCommand == null) {
            return;
        }

        this.onClickCommand.execute(new Map<string, any>([["event", event]]));
    }

    onChange(event: Event): void {
        if(this.onChangeCommand == null) {
            return;
        }

        this.onChangeCommand.execute(new Map<string, any>([["event", event]]));
    }

    onSelect(event: Event): void {
        if(this.onSelectCommand == null) {
            return;
        }

        this.onSelectCommand.execute(new Map<string, any>([["event", event]]));
    }

    onSubmit(event: Event): void {
        if(this.onSubmitCommand == null) {
            return;
        }

        this.onSubmitCommand.execute(new Map<string, any>([["event", event]]));
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
