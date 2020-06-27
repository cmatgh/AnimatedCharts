import {InputView} from "../InputView";
import {Template} from "../../Template";

export class SelectView extends InputView{

    constructor(template : Template) {
        super(template);
    }

    protected doInitialize(): void {
        this.getElement().find("#select-input").on("change", (event) => {
            let selectedValue = $(event.target).children("option:selected").val();
            this.component
                .onSelect
                .bind(this.component)(selectedValue);
        });
    }

    setLabel(label: String): void {
        this.getElement().find("label").html(label);
    }

    addOption(label : string, value : string) {
        let option = $("<option>");
        option.val(value);
        option.html(label);

        this.getElement().find("#select-input").append(option);
    }

}