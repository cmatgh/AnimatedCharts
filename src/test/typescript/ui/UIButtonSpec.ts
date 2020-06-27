import "mocha"
import { expect } from "chai";
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);
import jsdom = require('jsdom');
import {InputPresenter} from "../../../main/typescript/animatedcharts/ui/input/InputPresenter";
import {Command} from "../../../main/typescript/animatedcharts/commands/Command";
var document = new jsdom.JSDOM(`<!DOCTYPE html><html></html>`).window.document;
var window = document.defaultView;

global.window = window
global.document = document;
global.$ = require('jquery');

describe("UIButton", () => {

    // let uiButton : InputPresenter;
    //
    // beforeEach( () => {
    //     uiButton = new InputPresenter("", "title", null);
    // });
    //
    // describe("getJQueryElement", () => {
    //     it("has loaded the html after initialization", () => {
    //         // then
    //         const $element = uiButton.getElement();
    //         expect($element.find("button").addBack().length).to.be.greaterThan(0);
    //     })
    // });
    //
    // describe("command", () => {
    //     it("should get executed when button clicked", () => {
    //         // given
    //         let dummyCommand = new (class implements Command {
    //             execute(event: Event) {}
    //         });
    //         let commandSpy = chai.spy.on(dummyCommand, "execute");
    //         uiButton.setCommand(dummyCommand);
    //
    //         //when
    //         uiButton.getElement().trigger("click");
    //
    //         // then
    //         expect(commandSpy).to.have.been.called.exactly(1);
    //     })
    // });
});