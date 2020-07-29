import "mocha"
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);
import { JSDOM } from "jsdom";
import { AnimationFrameWindowLoop } from "../../../main/typescript/animatedcharts/animation/AnimationFrameWindowLoop";
import { expect } from "chai";
import {NullError} from "../../../main/typescript/animatedcharts/utility/NullError";
import {anyNumber, anything, instance, mock, reset, verify} from "ts-mockito";
import {Observer} from "../../../main/typescript/animatedcharts/utility/Observer";
describe("WindowLoop", () => {

    let animationLoop: AnimationFrameWindowLoop;
    let windowMock : Window;

    before(() => {
        windowMock = mock<Window>()
        let windowMockInstance = instance(windowMock);
        animationLoop = AnimationFrameWindowLoop.initialize(windowMockInstance);
    });

    beforeEach(() => {
        reset(windowMock);
        (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).stop();
    });

    describe("initialize", () => {
        it("should throw an error when called a second time", () => {
            expect(() => AnimationFrameWindowLoop.initialize(new JSDOM(``, { pretendToBeVisual: true }).window))
                .to.throw("Initialize has been called before already");
        });

        it("should throw an NullPointer when called a with null", () => {
            expect(() => AnimationFrameWindowLoop.initialize(null))
                .to.throw(NullError);
        });
    })

    describe("start", () => {
        it("should call a request animation frame", () => {
            (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).start();

            verify(windowMock.requestAnimationFrame(anything())).atLeast(1);
        });

        it("should lead to a running state", () => {
            (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).start();

            expect((<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).isRunning()).to.be.true;
        });

        it("should only start when not in running", () => {
            (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).start();
            (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).start();

            verify(windowMock.requestAnimationFrame(anything())).once()
        });

    });

    describe("stop", () => {
        it("should not call cancel animation request frame", () => {
            (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).stop();

            verify(windowMock.cancelAnimationFrame(anyNumber())).never();
        });

        it("should lead to a running state", () => {
            (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).start();
            (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).stop();

            expect((<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).isRunning()).to.be.false;
        });

        it("should call cancel animation request frame", () => {
            (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).start();
            (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).stop();

            verify(windowMock.cancelAnimationFrame(anything())).once()
        });
    });

    describe("register", () => {
        it("should throw NullError when argument null", () => {
            expect(() => AnimationFrameWindowLoop.getInstance().register(null)).to.throw(NullError)
        })
    });

    describe("unregister", () => {
        it("should do nothing when element not in list", () => {
            AnimationFrameWindowLoop.getInstance().unregister(instance(mock<Observer>()))
        })
    });

})