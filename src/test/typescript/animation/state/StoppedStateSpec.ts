import {StoppedState} from "../../../../main/typescript/animatedcharts/animation/state/StoppedState";
import {Animation} from "../../../../main/typescript/animatedcharts/animation/Animation";
import {anyOfClass, anything, instance, mock, verify, when} from "ts-mockito";
import {AnimationLoop} from "../../../../main/typescript/animatedcharts/animation/AnimationLoop";
import {RunningState} from "../../../../main/typescript/animatedcharts/animation/state/RunningState";

describe("StoppedState", () => {

    describe("start", () => {

        it("should start when there is a data object", () => {
            const animationMock = mock(Animation);
            const animationMockInstance = instance(animationMock);
            when(animationMock.hasDataObject()).thenReturn(true);

            const animationLoopMock = mock(AnimationLoop);
            const animationLoopMockInstance = instance(animationLoopMock);

            const state = new StoppedState();

            state.start(animationMockInstance, animationLoopMockInstance);
            verify(animationMock.setState(anyOfClass(RunningState))).once();
            verify(animationLoopMock.start()).once();
        });

        it("should start when there is a data object", () => {
            const animationMock = mock(Animation);
            const animationMockInstance = instance(animationMock);
            when(animationMock.hasDataObject()).thenReturn(false);

            const animationLoopMock = mock(AnimationLoop);
            const animationLoopMockInstance = instance(animationLoopMock);

            const state = new StoppedState();

            state.start(animationMockInstance, animationLoopMockInstance);
            verify(animationMock.hasDataObject()).once();
            verify(animationMock.setState(anything())).never();
            verify(animationLoopMock.start()).never();
        });
    });

    describe("stop", () => {

        it("should do nothing", () => {
            const state = new StoppedState();

            state.stop(null, null);
        });

    });

    describe("pause", () => {

        it("should do nothing", () => {
            const state = new StoppedState();

            state.pause(null, null);
        });

    });

    describe("resume", () => {

        it("should do nothing", () => {
            const state = new StoppedState();

            state.resume(null, null);
        });

    });

});