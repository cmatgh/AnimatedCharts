import {AbstractView} from "../../AbstractView";

export class RangeView extends AbstractView {

    constructor() {
        super();
    }

    protected doInitialize(): void {
        this.bindEvent("change", "change", "#range");
    }

    setMin(min : number) : void {
        this.getElement().find("#range").addBack().attr("min", min);
    }

    setMax(max : number) : void {
        this.getElement().find("#range").addBack().attr("max", max);
    }

    setStep(step : number) : void {
        this.getElement().find("#range").addBack().attr("step", step);
    }

    setValue(value : number) {
        this.getElement().find("#range").val(value);
    }

    setLabel(label: String): void {
        // @ts-ignore
        this.getElement().find(`label`).html(label);
    }

}