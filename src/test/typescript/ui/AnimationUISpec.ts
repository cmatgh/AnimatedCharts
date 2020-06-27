import "mocha"
import { expect } from "chai";
import jsdom = require('jsdom');
import {AnimationPresenterImpl} from "../../../main/typescript/animatedcharts/ui/animation/impl/AnimationPresenterImpl";
var document = new jsdom.JSDOM(`<!DOCTYPE html><html></html>`).window.document;
var window = document.defaultView;

global.window = window
global.$ = require('jquery');

describe("AnimationUI", () => {

    // let animationUI : AnimationPresenterImpl;
    //
    // beforeEach( () => {
    //     animationUI = new AnimationPresenterImpl("", "some title");
    // });
    //
    // describe("getJQueryElement", () => {
    //     it("has loaded the html after initialization", () => {
    //         const $element = animationUI.getElement();
    //
    //         expect($element.find("[id^=animation-content_]").length).to.be.greaterThan(0);
    //         expect($element.find("[id^=title]").length).to.be.greaterThan(0);
    //     })
    // });
});