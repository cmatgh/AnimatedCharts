import { JSDOM } from "jsdom";
import {WindowLoop} from "../../../main/typescript/animatedcharts/animation/WindowLoop";
import {instance, mock, verify} from "ts-mockito";
import {AnimationObserver} from "../../../main/typescript/animatedcharts/animation/AnimationObserver";

describe("WindowLoop Integration", () => {

    let dom : Window;

    before( () => {
        dom = new JSDOM(`<!DOCTYPE html><div id='bar'></div>`, { pretendToBeVisual: true }).window;
        WindowLoop.initialize(dom);
    });


    describe("loop", () => {
        it("should notify observers when ticking", async () => {
            const observerMock = mock<AnimationObserver>();
            const observerMockInstance = instance(observerMock);
            const observerMock2 = mock<AnimationObserver>();
            const observerMockInstance2 = instance(observerMock2);

            WindowLoop.getInstance().register(observerMockInstance);
            WindowLoop.getInstance().register(observerMockInstance2);
            (<WindowLoop> WindowLoop.getInstance()).start();

            await new Promise(resolve => setTimeout(() => { resolve() }, 200))
                .then( () => {
                    verify(observerMock.update()).atLeast(1);
                    verify(observerMock2.update()).atLeast(1);
                }).finally(() => {
                    (<WindowLoop> WindowLoop.getInstance()).stop()
                });

        });
    });

});