import "mocha"
import jsdom = require('jsdom');
import {NodeLabelStylingDecorator} from "../../../../main/typescript/animatedcharts/ui/decorator/NodeLabelStylingDecorator";
import { expect } from "chai"
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);
var document = new jsdom.JSDOM(`<!DOCTYPE html><html></html>`).window.document;
var window = document.defaultView;

global.window = window
global.$ = require('jquery');
global.documet = document;

describe("UnderlineLabelStylingDecorator", () => {

    describe("constructor", () => {
        it("should throw error when node type is null", () => {
            expect(() => new NodeLabelStylingDecorator(null)).to.throw("May not be null");
        });

        it("should throw error when node type is empty", () => {
            expect(() => new NodeLabelStylingDecorator("")).to.throw("May not be empty");
        });
    });

    describe("apply", () => {
        it("should set the correct node type when label is empty", () => {
            // given
            let decorator = new NodeLabelStylingDecorator("b");

            // when
            let decorated = decorator.apply("");

            // then
            expect(decorated).to.be.eq("<b></b>");
        });

        it("should set the correct node type when label is not empty", () => {
            // given
            let decorator = new NodeLabelStylingDecorator("b");

            // when
            let decorated = decorator.apply("not empty");

            // then
            expect(decorated).to.be.eq("<b>not empty</b>");
        });

        it("should call apply of the underlying decorator", () => {
            // given
            let decoratorMock = new NodeLabelStylingDecorator("a");
            chai.spy.on(decoratorMock, "apply");

            let decorator = new NodeLabelStylingDecorator("b");
            decorator.setLabelStyling(decoratorMock);

            // when
            let decorated = decorator.apply("not empty");

            // then
            expect(decoratorMock.apply).to.have.been.called.exactly(1);
            expect(decorated).to.be.eq("<a><b>not empty</b></a>");
        });
    });

});