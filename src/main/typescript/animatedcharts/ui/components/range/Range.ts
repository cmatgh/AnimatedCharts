import {Component} from "../../Component";
import {Presenter} from "../../../interfaces/Presenter";
import {Template} from "../../../interfaces/Template";
import {View} from "../../../interfaces/View";
import {RangePresenter} from "./RangePresenter";
import {RangeView} from "./RangeView";

export class Range extends Component {

    createPresenter(): Presenter {
        return new RangePresenter();
    }

    createTemplate(): Template {
        return this.templateFactory.createRangeTemplate();
    }

    createView(): View {
        return new RangeView();
    }

    setLabel(label : string) : void {
        (this.getView() as RangeView).setLabel(label);
    }

    setMin(min : number) : void {
        (this.getPresenter() as RangePresenter).setMin(min);
    }

    setMax(max : number) : void {
        (this.getPresenter() as RangePresenter).setMax(max);
    }

    setStep(step : number) : void {
        (this.getPresenter() as RangePresenter).setStep(step);
    }

    setValue(value: number) : void {
        (this.getPresenter() as RangePresenter).setValue(value);
    }
}