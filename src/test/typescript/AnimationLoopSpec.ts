import "mocha"
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);
import { JSDOM } from "jsdom";
import { AnimationLoop } from "../../main/typescript/animatedcharts/animation/AnimationLoop";
import { AnimationChart } from "../../main/typescript/animatedcharts/animation/AnimationChart";
import Chart from "chart.js";

describe("AnimationLoop", () => {

    let animationLoop: AnimationLoop;
    let expect = chai.expect;
    let animationObject: AnimationChart;
    let mockedChart: Chart;

    beforeEach( () => {
        animationLoop = new AnimationLoop(
            new JSDOM(``, { pretendToBeVisual: true }).window,
            { updatesPerSecond: 1});
    });

    describe("setUpdatesPerSecond", () => {
        //TODO
    });

    describe("setFrameTickStrategy", () => {
        //TODO
    });

    describe("start", () => {
        //TODO
    });

    describe("stop", () => {
        //TODO
    });

    describe("pause", () => {
        //TODO
    });

    describe("resume", () => {
        //TODO
    });
})