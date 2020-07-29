import "mocha"
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);
import { AnimationFrameWindowLoop } from "../../../main/typescript/animatedcharts/animation/AnimationFrameWindowLoop";
import { expect } from "chai";
import {NullError} from "../../../main/typescript/animatedcharts/utility/NullError";
import {anyNumber, anything, instance, mock, verify} from "ts-mockito";
import {Observer} from "../../../main/typescript/animatedcharts/utility/Observer";
describe("AnimationFrameWindowLoop", () => {

    let animationLoop: AnimationFrameWindowLoop;
    let windowMock : Window;

    beforeEach(() => {
        windowMock = mock<Window>()
        let windowMockInstance = instance(windowMock);
        animationLoop = new AnimationFrameWindowLoop(windowMockInstance);
    });

    describe("constructor", () => {
        it("should throw an NullPointer when called a with null", () => {
            expect(() => new AnimationFrameWindowLoop(null))
                .to.throw(NullError);
        });
    })

    describe("start", () => {
        it("should call a request animation frame", () => {
            animationLoop.start();

            verify(windowMock.requestAnimationFrame(anything())).atLeast(1);
        });

        it("should lead to a running state", () => {
            animationLoop.start();

            expect(animationLoop.isRunning()).to.be.true;
        });

        it("should only start when not in running", () => {
            animationLoop.start();
            animationLoop.start();

            verify(windowMock.requestAnimationFrame(anything())).once()
        });

    });

    describe("stop", () => {
        it("should not call cancel animation request frame", () => {
            animationLoop.stop();

            verify(windowMock.cancelAnimationFrame(anyNumber())).never();
        });

        it("should lead to a running state", () => {
            animationLoop.start();
            animationLoop.stop();

            expect(animationLoop.isRunning()).to.be.false;
        });

        it("should call cancel animation request frame", () => {
            animationLoop.start();
            animationLoop.stop();

            verify(windowMock.cancelAnimationFrame(anything())).once()
        });
    });

    describe("register", () => {
        it("should throw NullError when argument null", () => {
            expect(() => animationLoop.register(null)).to.throw(NullError)
        })
    });

    describe("unregister", () => {
        it("should do nothing when element not in list", () => {
            animationLoop.unregister(instance(mock<Observer>()))
        })
    });

    describe("countObservers", () => {
        it("should return zero when newly initialized", () => {
            expect(animationLoop.countObservers()).to.to.be.eq(0);
        })

        it("should return correct count when adding observers", () => {
            animationLoop.register(instance(mock<Observer>()));
            animationLoop.register(instance(mock<Observer>()));
            animationLoop.register(instance(mock<Observer>()));

            expect(animationLoop.countObservers()).to.to.be.eq(3);
        })

        it("should return correct count when removing observers when newly initialized", () => {
            animationLoop.unregister(instance(mock<Observer>()));

            expect(animationLoop.countObservers()).to.to.be.eq(0);
        })

        it("should return correct count when adding same observer twice", () => {
            const observer = instance(mock<Observer>());
            animationLoop.register(observer);
            animationLoop.register(observer);

            expect(animationLoop.countObservers()).to.to.be.eq(1);
        })

        it("should return correct count when adding and removing same observer", () => {
            const observer = instance(mock<Observer>());
            animationLoop.register(observer);
            animationLoop.unregister(observer);

            expect(animationLoop.countObservers()).to.to.be.eq(0);
        })
    });

})