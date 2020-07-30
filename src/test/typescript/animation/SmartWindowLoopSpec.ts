import {SmartWindowLoop} from "../../../main/typescript/animatedcharts/animation/SmartWindowLoop";
import {WindowLoop} from "../../../main/typescript/animatedcharts/animation/WindowLoop";
import {instance, mock, reset, verify, when} from "ts-mockito";
import {Observer} from "../../../main/typescript/animatedcharts/interfaces/Observer";

describe("SmartWindowLoop", () => {

    let windowLoopMock : WindowLoop;

    before( () => {
        windowLoopMock = mock<WindowLoop>();
        SmartWindowLoop.initialize(instance(windowLoopMock));
    });

    afterEach(() => {
        reset(windowLoopMock);
    })

    describe("register", () => {
        it("it should call register of the underlying window loop and start it", () => {
            const observer = instance(mock<Observer>());

            SmartWindowLoop.getInstance().register(observer);

            verify(windowLoopMock.register(observer)).once();
            verify(windowLoopMock.start()).once();
        });
    });

    describe("unregister", () => {
        it("it should call register of the underlying window loop", () => {
            const observer = instance(mock<Observer>());

            SmartWindowLoop.getInstance().unregister(observer);

            verify(windowLoopMock.unregister(observer)).once();
        });

        it("it should call stop when observer count equals zero", () => {
            when(windowLoopMock.countObservers())
                .thenReturn(0);

            const observer = instance(mock<Observer>());

            SmartWindowLoop.getInstance().unregister(observer);

            verify(windowLoopMock.unregister(observer)).once();
            verify(windowLoopMock.countObservers()).once();
            verify(windowLoopMock.stop()).once();
        });

        it("it should not call stop when observer count greater zero", () => {
            when(windowLoopMock.countObservers())
                .thenReturn(1);

            const observer = instance(mock<Observer>());

            SmartWindowLoop.getInstance().unregister(observer);

            verify(windowLoopMock.unregister(observer)).once();
            verify(windowLoopMock.countObservers()).once();
            verify(windowLoopMock.stop()).never();
        });
    });

    describe("notifyObservers", () => {
        it("should call notifyObservers of the underlying window loop", () => {
            SmartWindowLoop.getInstance().notifyObservers();

            verify(windowLoopMock.notifyObservers()).once();
        })
    })

    describe("start", () => {
        it("should not call start of the underlying window loop", () => {
            SmartWindowLoop.getInstance().start();

            verify(windowLoopMock.start()).never();
        })
    })

    describe("stop", () => {
        it("should not call stop of the underlying window loop", () => {
            SmartWindowLoop.getInstance().stop();

            verify(windowLoopMock.start()).never();
        })
    })

    describe("isRunning", () => {
        it("should call isRunning of the underlying window loop", () => {
            SmartWindowLoop.getInstance().isRunning();

            verify(windowLoopMock.isRunning()).once();
        })
    })

    describe("countObservers", () => {
        it("should call countObservers of the underlying window loop", () => {
            SmartWindowLoop.getInstance().countObservers();

            verify(windowLoopMock.countObservers()).once();
        })
    })

});