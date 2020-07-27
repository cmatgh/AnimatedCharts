import { expect } from "chai"
import "mocha"
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);
import { JSDOM, DOMWindow } from "jsdom";
import { Animation } from "../../../main/typescript/animatedcharts/animation/Animation";
import * as mockito from "../../../../node_modules/ts-mockito/lib/ts-mockito";
import Chart from "chart.js";
import {Observer} from "../../../main/typescript/animatedcharts/utility/Observer";
import {FrameDataImpl} from "../../../main/typescript/animatedcharts/animation/data/FrameDataImpl";
import {WindowLoop} from "../../../main/typescript/animatedcharts/animation/WindowLoop";
import {NullError} from "../../../main/typescript/animatedcharts/utility/NullError";
import {instance, mock, verify} from "ts-mockito";
import {AnimationObserver} from "../../../main/typescript/animatedcharts/animation/AnimationObserver";

describe("Animation", () => {

    let animation: Animation;
    let animationObject: AnimationObserver;
    let mockedChart: Chart;
    let dom: DOMWindow;

    before(() => {
        dom = new JSDOM(`<!DOCTYPE html><div id='bar'></div>`, { pretendToBeVisual: true }).window;
        WindowLoop.initialize(dom);
    })

    beforeEach( () => {
        animation = new Animation();
        animation.setDataObject({
            columnDefs: ["labels", "colors", "1960"],
            dataSets: [
                {
                    label: "Africa",
                    color: [255,255,255],
                    values: [1040]
                },
                {
                    label: "America",
                    color: [155,155,155],
                    values: [49444]
                }
            ],
            valuesLength : 1
        });
        mockedChart = mockito.mock(Chart);
        mockedChart.config.options = {};
        mockedChart.config.options.title = {};
        mockedChart.config.options.title.text = "";
        mockedChart.data = {};
        mockedChart.data.datasets = [{}];
        mockedChart.data.datasets[0] = {};
        mockedChart.data.datasets[0].backgroundColor = "";
        mockedChart.data.datasets[0].data = [];
        animationObject = instance(mock<AnimationObserver>());
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
            animation.register(instance(mock<AnimationObserver>()));
            animation.register(instance(mock<AnimationObserver>()));

            expect( () => animation.unregister(instance(mock<AnimationObserver>()))).to.throw("no such object");
        });


        it("should remove the object when unregistering it", () => {
            const animationObserverInstance = instance(mock<AnimationObserver>());
            animation.register(animationObserverInstance);

            expect(animation.objectCount()).to.be.equal(1);

            animation.unregister(animationObserverInstance);

            expect(animation.objectCount()).to.be.equal(0);
        });
    });

    describe("notifyAnimationObjects", () => {
        it("should call update on AnimationChart when notifyAnimationObjects is called", () => {
            const animationObserverMock = mock<AnimationObserver>();
            const animationObserverInstance = instance(animationObserverMock);

            animation.register(animationObserverInstance);
            animation.notifyObservers();

            verify(animationObserverMock.update()).once();
        });
    });

    describe("getData", () => {

        it("should return first dataset after initializing animation instance", () => {
            const expectedFrameData = new FrameDataImpl();
            expectedFrameData.setCurrentFrame(0);
            expectedFrameData.setSampleSize(1);
            expectedFrameData.setProperty("1960");
            expectedFrameData.setFrameDataSet([
                {
                    label: "Africa",
                    color: [255,255,255],
                    value: 1040
                },
                {
                    label: "America",
                    color: [155,155,155],
                    value: 49444
                }
            ]);
            expect(animation.getCurrentFrameData()).to.deep.equal(expectedFrameData);
        });

        it("should return correct dataSet after each frame", () => {
            const dataSets = [
                {
                    label : "Africa",
                    color : [255,255,255],
                    values: [13, 14]
                },{
                    label : "America",
                    color : [155,155,155],
                    values: [12, 13]
                }
            ]

            const dataObj = {
                columnDefs: ["labels", "colors", "key1", "key2"],
                dataSets : dataSets,
                valuesLength: 2
            };

            animation = new Animation();
            animation.setDataObject(dataObj);

            const expectedFrameData = new FrameDataImpl();
            expectedFrameData.setProperty("key1");
            expectedFrameData.setCurrentFrame(0);
            expectedFrameData.setSampleSize(2);
            expectedFrameData.setFrameDataSet([{
                label : "Africa",
                color : [255,255,255],
                value: 13
            },{
                label : "America",
                color : [155,155,155],
                value: 12
            }]);
            expect(animation.getCurrentFrameData()).to.deep.equal(expectedFrameData);

            animation.incrementFrame();

            expectedFrameData.setProperty("key2");
            expectedFrameData.setCurrentFrame(1);
            expectedFrameData.setSampleSize(2);
            expectedFrameData.setFrameDataSet([{
                label : "Africa",
                color : [255,255,255],
                value: 14
            },{
                label : "America",
                color : [155,155,155],
                value: 13
            }]);
            expect(animation.getCurrentFrameData()).to.deep.equal(expectedFrameData);

            animation.incrementFrame();

            expectedFrameData.setProperty("key1");
            expectedFrameData.setCurrentFrame(0);
            expectedFrameData.setSampleSize(2);
            expectedFrameData.setFrameDataSet([{
                label : "Africa",
                color : [255,255,255],
                value: 13
            },{
                label : "America",
                color : [155,155,155],
                value: 12
            }]);
            expect(animation.getCurrentFrameData()).to.deep.equal(expectedFrameData);
        });

    });

    describe("start and stop", () => {

        it("should delegate to animationLoop", async () => {

            //inrementFrame and notifyAnimationObjects get called in tickStrategy, which gets called in an animationLoop tick
            chai.spy.on(animation, "incrementFrame");
            chai.spy.on(animation, "notifyObservers");

            (<WindowLoop> WindowLoop.getInstance()).start();
            animation.start();

            await new Promise(resolve => setTimeout(() => { resolve() }, 2100))
            .then( () => {
                expect(animation.incrementFrame).to.have.been.called.exactly(4);
                expect(animation.notifyObservers).to.have.been.called.exactly(4);
            }).finally(() => {
                animation.stop();
                (<WindowLoop> WindowLoop.getInstance()).stop();
            });

        }).timeout(2500);

    });

    describe("pause", () => {
         //TODO
    });

    describe("resume", () => {
        //TODO
    });
})