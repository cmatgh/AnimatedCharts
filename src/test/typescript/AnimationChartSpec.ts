import { expect } from "chai";
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);
import Chart from "chart.js";
import { AnimationChart } from "../../main/typescript/animatedcharts/animation/AnimationChart";
import { Animation } from "../../main/typescript/animatedcharts/animation/Animation";
import * as mockito from "../../../node_modules/ts-mockito/lib/ts-mockito";
import {ValueComparator} from "../../main/typescript/animatedcharts/utility/comparing/ValueComparator";
import {ComparatorFactory} from "../../main/typescript/animatedcharts/utility/comparing/ComparatorFactory";
import {ColorComparator} from "../../main/typescript/animatedcharts/utility/comparing/ColorComparator";

describe("AnimationChart", () => {

    let animationObject: AnimationChart;
    let animation: Animation;
    let mockedChart: Chart;

    beforeEach( () => {
        animation = new Animation(null);
        animation.setDataObject({
            columnDefs: ["labels", "colors", "1960"],
            dataSets: [
                {
                    label: "Asia",
                    color: [255,255,255],
                    values: [1040, 2080]
                },
                {
                    label: "America",
                    color: [155,155,155],
                    values: [49444, 50000]
                }
            ],
            valuesLength : 2
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
        it("should set default comparator to ValueComparator", () => {
            expect(animationObject.getComparator()).is.instanceOf(ValueComparator);
        });

        it("should have set the first frame data set", () => {
            expect(mockedChart.data.labels).is.deep.eq(["Asia", "America"]);
            expect(mockedChart.data.datasets[0].backgroundColor).to.deep.eq(["rgba(255,255,255)", "rgba(155,155,155)"]);
            expect(mockedChart.data.datasets[0].data).to.deep.eq([1040, 49444]);
        });

    });

    describe("setComparator", () => {
        it("should set the comparator", () => {
           animationObject.setComparator(ComparatorFactory.getInstance().create("color"));

           expect(animationObject.getComparator()).instanceOf(ColorComparator);
        });
    });

    describe("update", () => {
        it("should set the current frame data set", () => {
            animation.incrementFrame();
            animationObject.update();

            expect(mockedChart.data.labels).is.deep.eq(["Asia", "America"]);
            expect(mockedChart.data.datasets[0].backgroundColor).to.deep.eq(["rgba(255,255,255)", "rgba(155,155,155)"]);
            expect(mockedChart.data.datasets[0].data).to.deep.eq([2080, 50000]);
        })

        it("should use the comparator", () => {
            animationObject.setComparator(ComparatorFactory.getInstance().create("label"))
            animation.incrementFrame();
            animationObject.update();

            expect(mockedChart.data.labels).is.deep.eq(["America", "Asia"]);
            expect(mockedChart.data.datasets[0].backgroundColor).to.deep.eq(["rgba(155,155,155)", "rgba(255,255,255)"]);
            expect(mockedChart.data.datasets[0].data).to.deep.eq([50000, 2080]);
        })
    });


});