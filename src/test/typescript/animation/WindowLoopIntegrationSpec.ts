import { JSDOM } from "jsdom";
import {AnimationFrameWindowLoop} from "../../../main/typescript/animatedcharts/animation/AnimationFrameWindowLoop";
import {instance, mock, verify} from "ts-mockito";
import {Observer} from "../../../main/typescript/animatedcharts/interfaces/Observer";

describe("AnimationFrameWindowLoop Integration", () => {

    let windowLoop : AnimationFrameWindowLoop;

    beforeEach( () => {
        const dom = new JSDOM(`<!DOCTYPE html><div id='bar'></div>`, { pretendToBeVisual: true }).window;
        windowLoop = new AnimationFrameWindowLoop(dom);
    });


    describe("loop", () => {
        it("should notify observers when ticking", async () => {
            const observerMock = mock<Observer>();
            const observerMockInstance = instance(observerMock);
            const observerMock2 = mock<Observer>();
            const observerMockInstance2 = instance(observerMock2);

            windowLoop.register(observerMockInstance);
            windowLoop.register(observerMockInstance2);
            windowLoop.start();

            await new Promise(resolve => setTimeout(() => { resolve() }, 200))
                .then( () => {
                    verify(observerMock.update()).atLeast(1);
                    verify(observerMock2.update()).atLeast(1);
                }).finally(() => {
                    windowLoop.stop()
                });

        });
    });

});