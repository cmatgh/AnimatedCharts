import {expect} from "chai";
import {ButtonCreationHandler} from "../../../../main/typescript/animatedcharts/utility/creating/ui/handler/ButtonCreationHandler";
import {ButtonPresenter} from "../../../../main/typescript/animatedcharts/ui/input/button/ButtonPresenter";
import {ButtonView} from "../../../../main/typescript/animatedcharts/ui/input/button/ButtonView";
import {DefaultButtonTemplate} from "../../../../main/typescript/animatedcharts/ui/input/button/templates/DefaultButtonTemplate";
import jsdom = require('jsdom');
var document = new jsdom.JSDOM(`<!DOCTYPE html><html></html>`).window.document;
var window = document.defaultView;

global.window = window
global.$ = require('jquery');

describe("ButtonCreationHandler", () => {

    let handler : ButtonCreationHandler;

    beforeEach( () => {
        handler = new ButtonCreationHandler("button");
    });

    describe("setNext", () => {

        it("should set next handler correctly", () => {
            // when
            const nextHandler = new ButtonCreationHandler("button");
            handler.setNext(nextHandler);

            // then
            expect(handler.getNext()).to.be.eq(nextHandler);
        });

    });

    describe("handle", () => {

        it("should handle the correct type", () => {
            // when
            const buttonPresenter = handler.handle("button");

            // then
            expect(buttonPresenter).to.be.instanceOf(ButtonPresenter);
            expect(buttonPresenter.getView()).to.be.instanceOf(ButtonView);
            expect(buttonPresenter.getView().getTemplate()).to.be.instanceOf(DefaultButtonTemplate);
        });

        it("should not handle if the type is not correct", () => {
            // when
            const buttonPresenter = handler.handle("notButton");

            // then
            expect(buttonPresenter).to.be.null;
        });

    });


});