import { AnimationChart } from "../animation/AnimationChart";
import Chart from "chart.js";
import {ChartFactory} from "../utility/ChartFactory";
import {Animation} from "../animation/Animation";
import {UIElement} from "./UIElement";
import {ComparatorFactory} from "../utility/comparing/ComparatorFactory";
import {ComparatorUtils} from "../utility/comparing/ComparatorUtils";
import {Visitor} from "./visitor/Visitor";

export class AnimationChartUI extends UIElement{

    protected html() : string {
        return `
            <div class="mb-3">
                <div class="col-md-4 mb-1">
                    <form>
                        <div class="form-group" id="chart-buttons_">
                            <label for="chart-sort-select_${this.id}" id="chart-sort-select-label_${this.id}">Sort by</label>
                            <select class="form-control form-control-sm" id="chart-sort-select_${this.id}" required>
                                <option selected value="value">Value</option>
                                <option value="color">Color</option>
                                <option value="label">Label</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="chart-sort-check_${this.id}">
                                <label class="form-check-label" for="chart-sort-check_${this.id}" id="chart-sort-check-label_${this.id}">
                                  reverse
                                </label>
                            </div>
                        </div>
                        <canvas id="chart_${this.id}" width="350" height="350"></canvas>
                    </form>
                </div>
            </div>
        `;
    }

    getSelectLabelElement() : JQuery {
        return this.$element.find(`#chart-sort-select-label_${this.id}`);
    }

    getCheckLabelElement() : JQuery {
        return this.$element.find(`#chart-sort-check-label_${this.id}`);
    }

    protected events() : void {
        this.$element
            .find(`#chart-sort-select_${this.id}`)
            .on("change", (event: Event) => {this.animationObject.setComparator(ComparatorFactory
                .getInstance()
                .create($(event.target).val().toString()))
                this.animationObject.update();
            });

        this.$element
            .find(`#chart-sort-check_${this.id}`)
            .on("change", (event: Event) => {
                this.animationObject.setComparator(ComparatorUtils.reverse(this.animationObject.getComparator()));
                this.animationObject.update();
        });
    }

    animationObject: AnimationChart;
    chart: Chart;

    constructor(elementId: string, type: string, animation: Animation) {
        super(elementId);
        this.chart = ChartFactory
            .getInstance()
            .create(type, <HTMLCanvasElement> this.$element.find(`#chart_${this.id}`).get(0));
        this.animationObject = new AnimationChart(animation, this.chart);
    }

    getAnimationObject() : AnimationChart {
        return this.animationObject;
    }

    getJQueryElement() : JQuery {
        return this.$element;
    }

    accept(visitor: Visitor): void {
        visitor.visitAnimationCharUI(this);
    }
}
