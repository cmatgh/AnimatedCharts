import "mocha"
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);
import { JSDOM } from "jsdom";
import { WindowLoop } from "../../../main/typescript/animatedcharts/animation/WindowLoop";
import { expect } from "chai";
import {NullError} from "../../../main/typescript/animatedcharts/utility/NullError";
import {anyNumber, anything, instance, mock, reset, verify} from "ts-mockito";
import {Observer} from "../../../main/typescript/animatedcharts/utility/Observer";
describe("WindowLoop", () => {

    let animationLoop: WindowLoop;
    let windowMock : Window;

    before(() => {
        windowMock = mock<Window>()
        let windowMockInstance = instance(windowMock);
        animationLoop = WindowLoop.initialize(windowMockInstance);
    });

    beforeEach(() => {
        reset(windowMock);
        (<WindowLoop> WindowLoop.getInstance()).stop();
    });

    describe("initialize", () => {
        it("should throw an error when called a second time", () => {
            expect(() => WindowLoop.initialize(new JSDOM(``, { pretendToBeVisual: true }).window))
                .to.throw("Initialize has been called before already");
        });

        it("should throw an NullPointer when called a with null", () => {
            expect(() => WindowLoop.initialize(null))
                .to.throw(NullError);
        });
    })

    describe("start", () => {
        it("should call a request animation frame", () => {
            (<WindowLoop> WindowLoop.getInstance()).start();

            verify(windowMock.requestAnimationFrame(anything())).atLeast(1);
        });

        it("should lead to a running state", () => {
            (<WindowLoop> WindowLoop.getInstance()).start();

            expect((<WindowLoop> WindowLoop.getInstance()).isRunning()).to.be.true;
        });

        it("should only start when not in running", () => {
            (<WindowLoop> WindowLoop.getInstance()).start();
            (<WindowLoop> WindowLoop.getInstance()).start();

            verify(windowMock.requestAnimationFrame(anything())).once()
        });

    });

    describe("stop", () => {
        it("should not call cancel animation request frame", () => {
            (<WindowLoop> WindowLoop.getInstance()).stop();

            verify(windowMock.cancelAnimationFrame(anyNumber())).never();
        });

        it("should lead to a running state", () => {
            (<WindowLoop> WindowLoop.getInstance()).start();
            (<WindowLoop> WindowLoop.getInstance()).stop();

            expect((<WindowLoop> WindowLoop.getInstance()).isRunning()).to.be.false;
        });

        it("should call cancel animation request frame", () => {
            (<WindowLoop> WindowLoop.getInstance()).start();
            (<WindowLoop> WindowLoop.getInstance()).stop();

            verify(windowMock.cancelAnimationFrame(anything())).once()
        });
    });

    describe("register", () => {
        it("should throw NullError when argument null", () => {
            expect(() => WindowLoop.getInstance().register(null)).to.throw(NullError)
        })
    });

    describe("unregister", () => {
        it("should do nothing when element not in list", () => {
            WindowLoop.getInstance().unregister(instance(mock<Observer>()))
        })
    });

})