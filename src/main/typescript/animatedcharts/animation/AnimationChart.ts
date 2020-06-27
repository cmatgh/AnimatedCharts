import { Animation, FrameDataSet } from "./Animation";
import { Comparator } from "../utility/comparing/Comparator";
import {ComparatorFactory} from "../utility/comparing/ComparatorFactory";
import Chart from "chart.js";
import {AnimationObserver} from "./AnimationObserver";

export class AnimationChart implements AnimationObserver {

    chart: Chart;
    animation: Animation;
    comparator: Comparator<FrameDataSet>;

    setAnimation(animation : Animation) : void {
        this.animation = animation;
    }

    constructor(animation: Animation, chart: Chart){
        this.animation = animation;
        this.chart = chart;
        this.comparator = ComparatorFactory.getInstance().create("value");
        this.update();
    }

    getComparator() : Comparator<FrameDataSet> {
        return this.comparator;
    }

    setComparator(comparator : Comparator<FrameDataSet>) : void {
        this.comparator = comparator;
    }

    update() : void {
        const dataSets = this.animation.getCurrentFrameData();
        dataSets.sort(this.comparator.compare);

        this.chart.data.labels = dataSets.map( set => set.label);
        this.chart.data.datasets[0].backgroundColor = dataSets.map( set => `rgba(${set.color[0]},${set.color[1]},${set.color[2]})`);
        this.chart.data.datasets[0].data = dataSets.map( set => set.value);
        this.chart.update(2500);
    }

}