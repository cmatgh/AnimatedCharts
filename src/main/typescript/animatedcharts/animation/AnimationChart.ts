import { Comparator } from "../utility/comparing/Comparator";
import {ComparatorFactory} from "../utility/comparing/ComparatorFactory";
import Chart from "chart.js";
import {AnimationObserver} from "./AnimationObserver";
import {ChartData} from "./data/FrameData";
import {Animation} from "./Animation";

export class AnimationChart implements AnimationObserver {

    chart: Chart;
    animation: Animation;
    comparator: Comparator<ChartData>;

    setAnimation(animation : Animation) : void {
        this.animation = animation;
    }

    constructor(animation: Animation, chart: Chart){
        this.animation = animation;
        this.chart = chart;
        this.comparator = ComparatorFactory.getInstance().create("value");
        this.update();
    }

    getComparator() : Comparator<ChartData> {
        return this.comparator;
    }

    setComparator(comparator : Comparator<ChartData>) : void {
        this.comparator = comparator;
    }

    update() : void {
        const frameData = this.animation.getCurrentFrameData();
        frameData.getFrameDataSet().sort(this.comparator.compare);

        this.chart.data.labels = frameData.getFrameDataSet().map( set => set.label);
        this.chart.data.datasets[0].backgroundColor = frameData.getFrameDataSet().map( set => `rgba(${set.color[0]},${set.color[1]},${set.color[2]})`);
        this.chart.data.datasets[0].data = frameData.getFrameDataSet().map( set => set.value);
        this.chart.update(2500);
    }

}