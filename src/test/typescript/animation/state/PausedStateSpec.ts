import {PausedState} from "../../../../main/typescript/animatedcharts/animation/state/PausedState";
import {anyNumber, anyOfClass, instance, mock, verify} from "ts-mockito";
import {Animation} from "../../../../main/typescript/animatedcharts/animation/Animation";
import {AnimationLoop} from "../../../../main/typescript/animatedcharts/animation/AnimationLoop";
import {StoppedState} from "../../../../main/typescript/animatedcharts/animation/state/StoppedState";
import {RunningState} from "../../../../main/typescript/animatedcharts/animation/state/RunningState";

describe("PausedStateSpec", () => {

    beforeEach( () => {

    });


    describe("start", () => {
        it("should do nothing", () => {
            const animationMock = mock(Animation);
            const animationMockInstance = instance(animationMock);

            const animationLoopMock = mock(AnimationLoop);
            const animationLoopMockInstance = instance(animationLoopMock);

            const state = new PausedState();

            state.start(animationMockInstance, animationLoopMockInstance);

            verify(animationMock.setState(anyOfClass(RunningState))).once();
            verify(animationLoopMock.start()).once();
        });
    });

    describe("stop", () => {
        it("should stop the animation loop and set state to stopped", () => {
            const animationMock = mock(Animation);
            const animationMockInstance = instance(animationMock);

            const animationLoopMock = mock(AnimationLoop);
            const animationLoopMockInstance = instance(animationLoopMock);

            const state = new PausedState();

            state.stop(animationMockInstance, animationLoopMockInstance);

            verify(animationMock.setState(anyOfClass(StoppedState))).once();
            verify(animationMock.setFrame(0)).once();
            verify(animationMock.notifyObservers()).once();
            verify(animationLoopMock.stop()).once();
        });
    });

    describe("resume", () => {
        it("should start the animation loop and set state to running", () => {
            const animationMock = mock(Animation);
            const animationMockInstance = instance(animationMock);

            const animationLoopMock = mock(AnimationLoop);
            const animationLoopMockInstance = instance(animationLoopMock);

            const state = new PausedState();

            state.resume(animationMockInstance, animationLoopMockInstance);

            verify(animationMock.setState(anyOfClass(RunningState))).once();
            verify(animationLoopMock.start()).once();
        });
    });

    describe("pause", () => {
        it("should do nothing", () => {
            const state = new PausedState();

            state.pause(null, null);
        });
    });

});