import {StoppedState} from "../../../../main/typescript/animatedcharts/animation/state/StoppedState";
import {Animation} from "../../../../main/typescript/animatedcharts/animation/Animation";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {AnimationFrameWindowLoop} from "../../../../main/typescript/animatedcharts/animation/AnimationFrameWindowLoop";
import {RunningState} from "../../../../main/typescript/animatedcharts/animation/state/RunningState";
import { expect } from "chai";
import {NullError} from "../../../../main/typescript/animatedcharts/utility/errors/NullError";

describe("StoppedState", () => {

    let windowLoopInstance : AnimationFrameWindowLoop;
    let windowLoopMock : AnimationFrameWindowLoop
    let animationMock : Animation;
    let animationMockInstance : Animation;

    beforeEach(() => {
        windowLoopMock = mock(AnimationFrameWindowLoop);
        windowLoopInstance = instance(windowLoopMock);

        animationMock = mock(Animation);
        animationMockInstance = instance(animationMock);
    })

    describe("constructor", () =>{
        it("should fail when parameters are null", () => {
           expect(() => new StoppedState(null, windowLoopInstance)).to.throw(NullError);
           expect(() => new StoppedState(animationMockInstance, null)).to.throw(NullError);
        });
    });

    describe("start", () => {

        it("should hook onto window loop when there is a data object", () => {
            when(animationMock.hasDataObject()).thenReturn(true);
            when(animationMock.getRunningState()).thenReturn(instance(mock(RunningState)));

            const state = new StoppedState(animationMockInstance, windowLoopInstance);

            state.start();
            verify(animationMock.hasDataObject()).once();
            verify(windowLoopMock.register(animationMockInstance)).once();
            verify(animationMock.getRunningState()).once();
            verify(animationMock.setState(animationMockInstance.getRunningState())).once();
        });

        it("should not hook onto window loop when there is no data object", () => {
            when(animationMock.hasDataObject()).thenReturn(false);

            const state = new StoppedState(animationMockInstance, windowLoopInstance);

            state.start();
            verify(animationMock.hasDataObject()).once();
            verify(animationMock.setState(anything())).never();
            verify(windowLoopMock.register(animationMockInstance)).never();
        });
    });

    describe("stop", () => {

        it("should do nothing", () => {
            const state = new StoppedState(animationMockInstance, windowLoopInstance);

            state.stop();
            verifyNoInteractionsWithLoopWindow();
            verifyNoInteractionsWithAnimationObject();
        });

    });

    describe("pause", () => {

        it("should do nothing", () => {
            const state = new StoppedState(animationMockInstance, windowLoopInstance);

            state.pause();
            verifyNoInteractionsWithLoopWindow();
            verifyNoInteractionsWithAnimationObject();
        });

    });

    describe("resume", () => {

        it("should do nothing", () => {
            const state = new StoppedState(animationMockInstance, windowLoopInstance);

            state.resume();
            verifyNoInteractionsWithLoopWindow();
            verifyNoInteractionsWithAnimationObject();
        });

    });

    function verifyNoInteractionsWithLoopWindow() {
        verify(windowLoopMock.register(anything())).never();
        verify(windowLoopMock.unregister(anything())).never();
        verify(windowLoopMock.start()).never();
        verify(windowLoopMock.notifyObservers()).never();
        verify(windowLoopMock.stop()).never();
        verify(windowLoopMock.isRunning()).never();
    }

    function verifyNoInteractionsWithAnimationObject() {
        verify(animationMock.getRunningState()).never();
        verify(animationMock.getStoppedState()).never();
        verify(animationMock.getPausedState()).never();
        verify(animationMock.getCurrentFrameData()).never();
        verify(animationMock.hasDataObject()).never();
        verify(animationMock.setUpdatesPerSecond(anything())).never();
        verify(animationMock.setState(anything())).never();
        verify(animationMock.setFrame(anything())).never();
        verify(animationMock.start()).never();
        verify(animationMock.stop()).never();
        verify(animationMock.pause()).never();
        verify(animationMock.resume()).never();
        verify(animationMock.incrementFrame()).never();
        verify(animationMock.hasPaused()).never();
        verify(animationMock.register(anything())).never();
        verify(animationMock.hasStopped()).never();
        verify(animationMock.objectCount()).never();
        verify(animationMock.update()).never();
    }

});