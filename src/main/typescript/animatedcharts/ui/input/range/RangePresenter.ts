import {InputPresenter} from "../InputPresenter";
import {RangeView} from "./RangeView";

export class RangePresenter extends InputPresenter {

    min : number;
    max : number;
    step : number;
    currentVal : number;

    protected doInitialize(): void {
        this.currentVal = 0;
        this.min = 0;
        this.max = 1;
        this.step = 1;
    }

    setLabel(label : string) : void {
        this.view.setLabel(label);
    }

    setMin(min : number) : void {
        this.min = min;
        (<RangeView> this.getView()).setMin(min);
    }

    setMax(max : number) : void {
        this.max = max;
        (<RangeView> this.getView()).setMax(max);
    }

    setStep(step : number) : void {
        this.step = step;
        (<RangeView> this.getView()).setStep(step);
    }

    setValue(value: number) : void {
        this.currentVal= value;
        (<RangeView> this.getView()).setValue(value);
    }

    increment() {
        this.currentVal = (this.currentVal + 1) % (this.max + 1);
        this.setValue(this.currentVal);
    }

}