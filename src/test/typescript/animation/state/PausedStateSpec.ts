import {PausedState} from "../../../../main/typescript/animatedcharts/animation/state/PausedState";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {Animation} from "../../../../main/typescript/animatedcharts/animation/Animation";
import {AnimationFrameWindowLoop} from "../../../../main/typescript/animatedcharts/animation/AnimationFrameWindowLoop";
import {StoppedState} from "../../../../main/typescript/animatedcharts/animation/state/StoppedState";
import {RunningState} from "../../../../main/typescript/animatedcharts/animation/state/RunningState";
import {expect} from "chai";
import {NullError} from "../../../../main/typescript/animatedcharts/utility/NullError";

describe("PausedStateSpec", () => {

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
            expect(() => new PausedState(null, windowLoopInstance)).to.throw(NullError);
            expect(() => new PausedState(animationMockInstance, null)).to.throw(NullError);
        });
    });

    describe("start", () => {
        it("should do nothing", () => {
            when(animationMock.getRunningState()).thenReturn(instance(mock(RunningState)));

            const state = new PausedState(animationMockInstance, windowLoopInstance);

            state.start();

            verify(animationMock.setState(animationMockInstance.getRunningState())).once();
            verify(windowLoopMock.register(animationMockInstance)).once();
        });
    });

    describe("stop", () => {
        it("should stop the animation loop and set state to stopped", () => {
            when(animationMock.getStoppedState()).thenReturn(instance(mock(StoppedState)));
            const state = new PausedState(animationMockInstance, windowLoopInstance);

            state.stop();

            verify(animationMock.setState(animationMockInstance.getStoppedState())).once();
            verify(animationMock.setFrame(0)).once();
            verify(animationMock.notifyObservers()).once();
            verify(windowLoopMock.unregister(animationMockInstance)).once();
        });
    });

    describe("resume", () => {
        it("should start the animation loop and set state to running", () => {
            const state = new PausedState(animationMockInstance, windowLoopInstance);
            when(animationMock.getRunningState()).thenReturn(instance(mock(RunningState)));

            state.resume();

            verify(animationMock.setState(animationMockInstance.getRunningState())).once();
            verify(windowLoopMock.register(animationMockInstance)).once();
        });
    });

    describe("pause", () => {
        it("should do nothing", () => {
            const state = new PausedState(animationMockInstance, windowLoopInstance);

            state.pause();
            verifyNoInteractionsWithAnimationObject();
            verifyNoInteractionsWithLoopWindow();
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