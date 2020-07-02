import {expect} from "chai";
import {ButtonCreationHandler} from "../../../../main/typescript/animatedcharts/utility/creating/ui/ButtonCreationHandler";
import {SelectCreationHandler} from "../../../../main/typescript/animatedcharts/utility/creating/ui/SelectCreationHandler";
import {SelectPresenter} from "../../../../main/typescript/animatedcharts/ui/input/select/SelectPresenter";
import {SelectView} from "../../../../main/typescript/animatedcharts/ui/input/select/SelectView";
import {SelectTemplate} from "../../../../main/typescript/animatedcharts/ui/input/select/SelectTemplate";
import jsdom = require('jsdom');
var document = new jsdom.JSDOM(`<!DOCTYPE html><html></html>`).window.document;
var window = document.defaultView;

global.window = window
global.$ = require('jquery');

describe("ButtonCreationHandler", () => {

    let handler : SelectCreationHandler;

    beforeEach( () => {
        handler = new SelectCreationHandler("button");
    });

    describe("setNext", () => {

        it("should set next handler correctly", () => {
            // when
            const nextHandler = new SelectCreationHandler("select");
            handler.setNext(nextHandler);

            // then
            expect(handler.getNext()).to.be.eq(nextHandler);
        });

    });

    describe("handle", () => {

        it("should handle the correct type", () => {
            // when
            const selectPresenter = handler.handle("button");

            // then
            expect(selectPresenter).to.be.instanceOf(SelectPresenter);
            expect(selectPresenter.getView()).to.be.instanceOf(SelectView);
            expect(selectPresenter.getView().getTemplate()).to.be.instanceOf(SelectTemplate);
        });

        it("should not handle if the type is not correct", () => {
            // when
            const selectPresenter = handler.handle("notButton");

            // then
            expect(selectPresenter).to.be.null;
        });

    });


});