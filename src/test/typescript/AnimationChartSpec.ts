import { expect } from "chai";
import Chart from "chart.js";
import { AnimationChart } from "../../main/typescript/animatedcharts/animation/AnimationChart";
import { Animation } from "../../main/typescript/animatedcharts/animation/Animation";
import * as mockito from "../../../node_modules/ts-mockito/lib/ts-mockito";

describe("AnimationLoop Object", () => {

    let animationObject: AnimationChart;
    let animation: Animation;
    let mockedChart: Chart;

    beforeEach( () => {
        animation = new Animation(null);
        animation.setDataObject({
            columnDefs: ["labels", "colors", "1960"],
            dataSets: [
                {
                    label: "Africa",
                    color: [255,255,255],
                    values: [1040]
                },
                {
                    label: "America",
                    color: [155,155,155],
                    values: [49444]
                }
            ],
            valuesLength : 1
        });
        mockedChart = mockito.mock(Chart);
        mockedChart.config.options = {};
        mockedChart.config.options.title = {};
        mockedChart.config.options.title.text = "";
        mockedChart.data = {};
        mockedChart.data.datasets = [{}];
        mockedChart.data.datasets[0] = {};
        mockedChart.data.datasets[0].backgroundColor = "";
        mockedChart.data.datasets[0].data = [];
        animationObject = new AnimationChart(animation, mockedChart);
    });

    describe("constructor", () => {
        //TODO
    });

    describe("setComparator", () => {
        //TODO
    });

    describe("update", () => {
        //TODO
    });


});