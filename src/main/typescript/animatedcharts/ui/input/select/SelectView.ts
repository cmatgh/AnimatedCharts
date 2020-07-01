import {InputView} from "../InputView";

export class SelectView extends InputView{

    protected doInitialize(): void {
        this.getElement().find("#select-input").on("change", (event) => {
            let selectedValue = $(event.target).children("option:selected").val();
            this.presenter
                .onSelect
                .bind(this.presenter)(selectedValue);
        });
    }

    setLabel(label: String): void {
        this.getElement().find("label").html(label);
    }

    printOptions(map : Map<string, string>) {
        this.getElement().find("#select-input").html("");
        map.forEach((label, value) => this.drawOption(value, label));
    }

    private drawOption(label : string, value : string) {
        let option = $("<option>");
        option.val(value);
        option.html(label);

        this.getElement().find("#select-input").append(option);
    }

}