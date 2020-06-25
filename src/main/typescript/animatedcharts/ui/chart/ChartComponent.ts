import { AnimationChart } from "../../animation/AnimationChart";
import Chart from "chart.js";
import {ChartFactory} from "../../utility/ChartFactory";
import {Animation} from "../../animation/Animation";
import {Component} from "../Component";
import {ComparatorFactory} from "../../utility/comparing/ComparatorFactory";
import {ComparatorUtils} from "../../utility/comparing/ComparatorUtils";
import {Visitor} from "../../visitor/Visitor";
import {ChartTemplate} from "./ChartTemplate";

export class ChartComponent extends Component{

    getSelectLabelElement() : JQuery {
        return this.$element.find(`#chart-sort-select-label_${this.getId()}`);
    }

    getCheckLabelElement() : JQuery {
        return this.$element.find(`#chart-sort-check-label_${this.getId()}`);
    }

    animationObject: AnimationChart;
    chart: Chart;

    constructor(elementId: string, type: string, animation: Animation) {
        super(elementId, new ChartTemplate());
        this.chart = ChartFactory
            .getInstance()
            .create(type, <HTMLCanvasElement> this.$element.find(`#chart`).get(0));
        this.animationObject = new AnimationChart(animation, this.chart);
    }

    protected events() : void {
        this.$element
            .find(`#chart-sort-select`)
            .on("change", (event: Event) => {this.animationObject.setComparator(ComparatorFactory
                .getInstance()
                .create($(event.target).val().toString()))
                this.animationObject.update();
            });

        this.$element
            .find(`#chart-sort-check`)
            .on("change", (event: Event) => {
                this.animationObject.setComparator(ComparatorUtils.reverse(this.animationObject.getComparator()));
                this.animationObject.update();
            });
    }

    getAnimationObject() : AnimationChart {
        return this.animationObject;
    }

    accept(visitor: Visitor): void {
        visitor.visitAnimationCharUI(this);
    }
}
