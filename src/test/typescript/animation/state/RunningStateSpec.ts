import {RunningState} from "../../../../main/typescript/animatedcharts/animation/state/RunningState";
import {anyNumber, anyOfClass, anything, instance, mock, verify, when} from "ts-mockito";
import {Animation} from "../../../../main/typescript/animatedcharts/animation/Animation";
import {AnimationLoop} from "../../../../main/typescript/animatedcharts/animation/AnimationLoop";
import {StoppedState} from "../../../../main/typescript/animatedcharts/animation/state/StoppedState";
import {PausedState} from "../../../../main/typescript/animatedcharts/animation/state/PausedState";

describe("RunningState", () => {

    beforeEach( () => {

    });


    describe("start", () => {
        it("should do nothing", () => {
            const state = new RunningState();

            state.start(null, null);
        });
    });

    describe("stop", () => {
        it("should stop the animationloop and set to stop state", () => {
            const animationMock = mock(Animation);
            const animationMockInstance = instance(animationMock);

            const animationLoopMock = mock(AnimationLoop);
            const animationLoopMockInstance = instance(animationLoopMock);

            const state = new RunningState();

            state.stop(animationMockInstance, animationLoopMockInstance);

            verify(animationMock.setState(anyOfClass(StoppedState))).once();
            verify(animationMock.setFrame(0)).once();
            verify(animationMock.notifyObservers()).once();
            verify(animationLoopMock.stop()).once();
        });
    });

    describe("resume", () => {
        it("should do nothing", () => {
            const state = new RunningState();

            state.resume(null, null);
        });
    });

    describe("pause", () => {
        it("should stop the animationloop and set state to pause", () => {
            const animationMock = mock(Animation);
            const animationMockInstance = instance(animationMock);

            const animationLoopMock = mock(AnimationLoop);
            const animationLoopMockInstance = instance(animationLoopMock);

            const state = new RunningState();

            state.pause(animationMockInstance, animationLoopMockInstance);

            verify(animationMock.setState(anyOfClass(PausedState))).once();
            verify(animationMock.setFrame(anyNumber())).never();
            verify(animationLoopMock.stop()).once();
        });
    });
});