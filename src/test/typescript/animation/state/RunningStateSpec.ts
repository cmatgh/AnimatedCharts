import {RunningState} from "../../../../main/typescript/animatedcharts/animation/state/RunningState";
import {anyNumber, anyOfClass, anything, instance, mock, reset, verify, when} from "ts-mockito";
import {Animation} from "../../../../main/typescript/animatedcharts/animation/Animation";
import {WindowLoop} from "../../../../main/typescript/animatedcharts/animation/WindowLoop";
import {StoppedState} from "../../../../main/typescript/animatedcharts/animation/state/StoppedState";
import {PausedState} from "../../../../main/typescript/animatedcharts/animation/state/PausedState";
import { expect } from "chai";
import {NullError} from "../../../../main/typescript/animatedcharts/utility/NullError";
import {Command} from "../../../../main/typescript/animatedcharts/commands/Command";

describe("RunningState", () => {

    let windowLoopInstance : WindowLoop;
    let windowLoopMock : WindowLoop
    let animationMock : Animation;
    let animationMockInstance : Animation;

    beforeEach(() => {
        windowLoopMock = mock(WindowLoop);
        windowLoopInstance = instance(windowLoopMock);

        animationMock = mock(Animation);
        animationMockInstance = instance(animationMock);
    })

    describe("constructor", () => {
        it("should fail when parameters are null", () => {
            expect(() => new RunningState(null, windowLoopInstance)).to.throw(NullError);
            expect(() => new RunningState(animationMockInstance, null)).to.throw(NullError);
        });
    });

    describe("start", () => {
        it("should do nothing", () => {
            const state = new RunningState(animationMockInstance, windowLoopInstance);

            state.start();
            verifyNoInteractionsWithLoopWindow();
            verifyNoInteractionsWithAnimationObject();
        });
    });

    describe("stop", () => {
        it("should stop the animationloop and set to stop state", () => {
            const animationMock = mock(Animation);
            const animationMockInstance = instance(animationMock);
            when(animationMock.getStoppedState()).thenReturn(instance(mock(StoppedState)));

            const animationLoopMock = mock(WindowLoop);
            const animationLoopMockInstance = instance(animationLoopMock);

            const state = new RunningState(animationMockInstance, animationLoopMockInstance);

            state.stop();

            verify(animationMock.setState(animationMockInstance.getStoppedState())).once();
            verify(animationMock.setFrame(0)).once();
            verify(animationMock.notifyObservers()).once();
            verify(animationLoopMock.unregister(animationMockInstance)).once();
        });
    });

    describe("resume", () => {
        it("should do nothing", () => {
            const state = new RunningState(animationMockInstance, windowLoopInstance);

            state.resume();

            verifyNoInteractionsWithLoopWindow();
            verifyNoInteractionsWithAnimationObject();
        });
    });

    describe("pause", () => {
        it("should unregister from windowloop, set state to pause and doesnt reset frames", () => {
            const animationMock = mock(Animation);
            const animationMockInstance = instance(animationMock);

            const pausedStateMockInstance = instance(mock(PausedState));
            when(animationMock.getPausedState())
                .thenReturn(pausedStateMockInstance);

            const animationLoopMock = mock(WindowLoop);
            const animationLoopMockInstance = instance(animationLoopMock);

            const state = new RunningState(animationMockInstance, animationLoopMockInstance);

            state.pause();

            verify(animationMock.setState(pausedStateMockInstance)).once();
            verify(animationMock.setFrame(anyNumber())).never();
            verify(animationLoopMock.unregister(animationMockInstance)).once();
        });
    });

    describe("update", () => {
        it("should work only once after the threshold was reached", async () => {
            const state = new RunningState(animationMockInstance, windowLoopInstance);
            state.setUpdateThreshold(300);

            const commandMock = mock<Command>();
            const commandInstance = instance(commandMock);

            state.setUpdateCommand(commandInstance);
            state.update();
            verify(commandMock.execute(anything())).never();

            await new Promise(resolve => setTimeout(() => { resolve() }, 390))
                .then( () => {
                    state.update();
                    state.update();
                    state.update();
                    verify(commandMock.execute(anything())).once();
                    reset(commandMock);
                });
            await new Promise(resolve => setTimeout(() => { resolve() }, 390))
                .then( () => {
                    state.update();
                    state.update();
                    state.update();
                    verify(commandMock.execute(anything())).once();
                });
        }).timeout(1000);

        it("should not fail when no command was given", async () => {
            const state = new RunningState(animationMockInstance, windowLoopInstance);
            state.setUpdateThreshold(300);
            state.update();

            await new Promise(resolve => setTimeout(() => { resolve() }, 390))
                .then( () => {
                    state.update();
                });
            await new Promise(resolve => setTimeout(() => { resolve() }, 390))
                .then( () => {
                    state.update();
                });
        }).timeout(1000);
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