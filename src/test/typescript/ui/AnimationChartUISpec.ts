import "mocha"
import { expect } from "chai";
import {AnimationChartUI} from "../../../main/typescript/animatedcharts/ui/AnimationChartUI";
import jsdom = require('jsdom');
import {Animation} from "../../../main/typescript/animatedcharts/animation/Animation";
var document = new jsdom.JSDOM(`<!DOCTYPE html><html></html>`).window.document;
var window = document.defaultView;

global.window = window
global.$ = require('jquery');

describe("AnimationChartUI", () => {

    let animationObjectUI : AnimationChartUI;

    beforeEach( () => {
        animationObjectUI = new AnimationChartUI("bar", new Animation(global.window));
    });

    describe("getJQueryElement", () => {
       it("has loaded the html after initilization", () => {
           const $element = animationObjectUI.getJQueryElement();

           expect($element.find("[id^=chart-sort-select_]").length).to.be.greaterThan(0);
           expect($element.find("[id^=chart-sort-check_]").length).to.be.greaterThan(0);
       })
    });
});