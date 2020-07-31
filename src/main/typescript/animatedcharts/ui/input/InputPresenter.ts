import {Command} from "../../interfaces/Command";
import {InputView} from "./InputView";
import {AbstractPresenter} from "../AbstractPresenter";

export abstract class InputPresenter extends AbstractPresenter {

    protected view : InputView;
    protected onClickCommand : Command;
    protected onSubmitCommand : Command;
    protected onSelectCommand : Command;
    protected onChangeCommand : Command;

    setLabel(label : string) {
        this.view.setLabel(label);
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
        console.log(this)
        if(this.onSubmitCommand == null) {
            return;
        }

        this.onSubmitCommand.execute(new Map<string, any>([["event", event]]));
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
