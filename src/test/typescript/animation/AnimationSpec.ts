import { expect } from "chai"
import "mocha"
import {JSDOM} from "jsdom";
import {Animation, DataObject} from "../../../main/typescript/animatedcharts/animation/Animation";
import {Observer} from "../../../main/typescript/animatedcharts/interfaces/Observer";
import {AnimationFrameWindowLoop} from "../../../main/typescript/animatedcharts/animation/AnimationFrameWindowLoop";
import {NullError} from "../../../main/typescript/animatedcharts/utility/NullError";
import {instance, mock, verify} from "ts-mockito";
import {WindowLoop} from "../../../main/typescript/animatedcharts/animation/WindowLoop";
import {FrameData} from "../../../main/typescript/animatedcharts/animation/data/FrameData";
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);

describe("Animation", () => {

    let animation: Animation;
    let animationObject: Observer;
    let windowLoop : WindowLoop;

    beforeEach( () => {
        const dom = new JSDOM(`<!DOCTYPE html><div id='bar'></div>`, { pretendToBeVisual: true }).window;
        windowLoop = new AnimationFrameWindowLoop(dom);
        animation = new Animation(windowLoop);
        animationObject = instance(mock<Observer>());
    });

    describe("constructor", () => {
        it("should initialize with empty animationObject list", () => {
            expect(animation.objectCount()).is.equal(0);
        });
    });

    describe("register", () => {
        it("should contain AnimationChart when registering it", () => {
            animation.register(animationObject);

            expect(animation.objectCount()).is.equal(1);
            expect(animation.AnimationObjects).contains(animationObject);
        });

        it("should contain only one reference to the same AnimationChart when registering multiple times", () => {
            animation.register(animationObject);
            animation.register(animationObject);
            animation.register(animationObject);

            expect(animation.objectCount()).is.equal(1);
            expect(animation.AnimationObjects).contains(animationObject);
        });

        it("should contain only one reference to the same AnimationChart when registering multiple times", () => {
            animation.register(animationObject);
            animation.register(animationObject);
            animation.register(animationObject);

            expect(animation.objectCount()).is.equal(1);
            expect(animation.AnimationObjects).contains(animationObject);
        });

        it("should throw error when registering null", () => {
            expect( () => animation.register(null)).to.throw(NullError);
        });
    });

    describe("AnimationChart getter", () => {
        it("should return a copy of the original animationObject list when calling getter", () => {
            animation.register(animationObject);
            let animationObjects : Observer[] = animation.AnimationObjects;
            animationObjects.pop();

            expect(animation.objectCount()).is.equal(1);
            expect(animationObjects.length).is.equal(0);
            expect(animation.AnimationObjects).contains(animationObject);
        });

    });

    describe("unregister", () => {
        it("should fail when unregistering an missing object when nothing has been registered", () => {
            expect( () => animation.unregister(animationObject)).to.throw("no such object");
         });

        it("should fail when unregistering an missing object when other objects have been registered already", () => {
            animation.register(instance(mock<Observer>()));
            animation.register(instance(mock<Observer>()));

            expect( () => animation.unregister(instance(mock<Observer>()))).to.throw("no such object");
        });


        it("should remove the object when unregistering it", () => {
            const animationObserverInstance = instance(mock<Observer>());
            animation.register(animationObserverInstance);

            expect(animation.objectCount()).to.be.equal(1);

            animation.unregister(animationObserverInstance);

            expect(animation.objectCount()).to.be.equal(0);
        });
    });

    describe("notifyAnimationObjects", () => {
        it("should call update on AnimationChart when notifyAnimationObjects is called", () => {
            const animationObserverMock = mock<Observer>();
            const animationObserverInstance = instance(animationObserverMock);

            animation.register(animationObserverInstance);
            animation.notifyObservers();

            verify(animationObserverMock.update()).once();
        });
    });

    describe("getData", () => {

        it("should return first dataset after initializing animation instance", () => {
            const dataObject = createDataObject(instance(mock<FrameData>()));

            animation.setDataObject(dataObject);

            expect(animation.getCurrentFrameData()).to.deep.equal(dataObject.frameData[0]);
        });

        it("should return correct dataSet after each frame", () => {
            const frameDataSet1 = instance(mock<FrameData>());
            const frameDataSet2 = instance(mock<FrameData>());

            const dataObj = createDataObject(frameDataSet1, frameDataSet2);

            animation = new Animation(windowLoop);
            animation.setDataObject(dataObj);

            expect(animation.getCurrentFrameData()).to.be.eq(frameDataSet1);

            animation.incrementFrame();
            expect(animation.getCurrentFrameData()).to.be.eq(frameDataSet2);

            animation.incrementFrame();
            expect(animation.getCurrentFrameData()).to.be.eq(frameDataSet1);
        });

    });

    describe("start and stop", () => {

        it("should delegate to animationLoop", async () => {

            //incrementFrame and notifyAnimationObjects get called in tickStrategy, which gets called in an animationLoop tick
            chai.spy.on(animation, "incrementFrame");
            chai.spy.on(animation, "notifyObservers");

            const dataObject = createDataObject(instance(mock<FrameData>()));
            animation.setDataObject(dataObject);

            windowLoop.start();
            animation.start();

            await new Promise(resolve => setTimeout(() => { resolve() }, 2100))
            .then( () => {
                expect(animation.incrementFrame).to.have.been.called.exactly(4);
                expect(animation.notifyObservers).to.have.been.called.exactly(4);
            }).finally(() => {
                animation.stop();
                windowLoop.stop();
            });

        }).timeout(2500);

    });

    describe("pause", () => {
         //TODO
    });

    describe("resume", () => {
        //TODO
    });

    function createDataObject(...frameData) : DataObject{
        return {
            frameData : frameData,
            samplesCount : frameData.length,
            entriesCount : frameData.length > 0 ? frameData[0].least : 0
        } as DataObject
    }
})