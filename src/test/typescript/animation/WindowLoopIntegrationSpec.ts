import { JSDOM } from "jsdom";
import {AnimationFrameWindowLoop} from "../../../main/typescript/animatedcharts/animation/AnimationFrameWindowLoop";
import {instance, mock, verify} from "ts-mockito";
import {AnimationObserver} from "../../../main/typescript/animatedcharts/animation/AnimationObserver";

describe("AnimationFrameWindowLoop Integration", () => {

    let dom : Window;

    before( () => {
        dom = new JSDOM(`<!DOCTYPE html><div id='bar'></div>`, { pretendToBeVisual: true }).window;
        AnimationFrameWindowLoop.initialize(dom);
    });


    describe("loop", () => {
        it("should notify observers when ticking", async () => {
            const observerMock = mock<AnimationObserver>();
            const observerMockInstance = instance(observerMock);
            const observerMock2 = mock<AnimationObserver>();
            const observerMockInstance2 = instance(observerMock2);

            AnimationFrameWindowLoop.getInstance().register(observerMockInstance);
            AnimationFrameWindowLoop.getInstance().register(observerMockInstance2);
            (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).start();

            await new Promise(resolve => setTimeout(() => { resolve() }, 200))
                .then( () => {
                    verify(observerMock.update()).atLeast(1);
                    verify(observerMock2.update()).atLeast(1);
                }).finally(() => {
                    (<AnimationFrameWindowLoop> AnimationFrameWindowLoop.getInstance()).stop()
                });

        });
    });

});