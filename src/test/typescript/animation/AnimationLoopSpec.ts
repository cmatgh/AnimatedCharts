import "mocha"
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);
import { JSDOM } from "jsdom";
import { AnimationLoop } from "../../../main/typescript/animatedcharts/animation/AnimationLoop";
import { expect } from "chai";

describe("AnimationLoop", () => {

    let animationLoop: AnimationLoop;
    const spyFunc = () => {};

    beforeEach( () => {
        animationLoop = new AnimationLoop(
            new JSDOM(``, { pretendToBeVisual: true }).window,
            { updatesPerSecond: 1});

        //set 4 times per second to increase test speed
        animationLoop.setUpdatesPerSecond(4);
    });

    describe("start", () => {
        it("should start the loop", async () => {
            const spy = chai.spy(spyFunc);
            animationLoop.setFrameTickStrategy(spy);

            animationLoop.start();

            expect(animationLoop.isRunning()).to.be.true;

            await new Promise(resolve => setTimeout(() => { resolve() }, 600))
                .then( () => {
                    expect(spy).to.have.been.called.exactly(2);
                }).finally(() => {
                    animationLoop.stop()
                });
        }).timeout(1000);

        it("should not start a new loop when already started", async() => {
            const spy = chai.spy(spyFunc);
            animationLoop.setFrameTickStrategy(spy);

            animationLoop.start();
            animationLoop.start();

            expect(animationLoop.isRunning()).to.be.true;

            await new Promise(resolve => setTimeout(() => { resolve() }, 600))
                .then( () => {
                    expect(spy).to.have.been.called.exactly(2);
                }).finally(() => {
                    animationLoop.stop()
                });
        }).timeout(1000);
    });

    describe("stop", () => {
        it("should cancel the loop", async() => {
            const spy = chai.spy(spyFunc);
            animationLoop.setFrameTickStrategy(spy);

            animationLoop.start();
            expect(animationLoop.isRunning()).to.be.true;
            animationLoop.stop();
            expect(animationLoop.isRunning()).to.be.false;

            await new Promise(resolve => setTimeout(() => { resolve() }, 600))
                .then( () => {
                    expect(spy).to.have.been.called.exactly(0);
                });
        }).timeout(1000);

        it("should have no effect when not started", () => {

            expect(animationLoop.isRunning()).to.be.false;
            animationLoop.stop();
        });

        it("should stop running and unpause when paused", () => {
            animationLoop.start();

            animationLoop.stop();

            expect(animationLoop.isRunning()).to.be.false;
            expect(animationLoop.hasPaused()).to.be.false;
        });
    });

    describe("pause", () => {
        it("should pause the loop", async() => {
            const spy = chai.spy(spyFunc);
            animationLoop.setFrameTickStrategy(spy);

            animationLoop.start();

            expect(animationLoop.isRunning()).to.be.true;
            expect(animationLoop.hasPaused()).to.be.false;

            // run for approx. 2 seconds
            await new Promise(resolve => setTimeout(() => { resolve() }, 600))
                .then( () => {
                    expect(spy).to.have.been.called.exactly(2);

                    animationLoop.pause();
                    expect(animationLoop.hasPaused()).to.be.true;
                })
                // then pause for approx. 2 seconds
                .then( () => new Promise(resolve => setTimeout(() => { resolve() }, 600)) )
                // then check result
                .then( () => {
                    expect(spy).to.have.been.called.exactly(2);
                })
                .finally(() => {
                    animationLoop.stop()
                });


        }).timeout(2000);

        it("should not pause when not running", () => {
            expect(animationLoop.isRunning()).to.be.false;
            animationLoop.pause();

            expect(animationLoop.hasPaused()).to.be.false;
        });
    });

    describe("resume", () => {
        it("should resume the loop when paused", async() => {
            const spy = chai.spy(spyFunc);
            animationLoop.setFrameTickStrategy(spy);

            animationLoop.start();

            expect(animationLoop.isRunning()).to.be.true;
            expect(animationLoop.hasPaused()).to.be.false;

            // run for approx. 2 seconds
            await new Promise(resolve => setTimeout(() => { resolve() }, 550))
                .then( () => {
                    expect(spy).to.have.been.called.exactly(2);

                    animationLoop.pause();
                    expect(animationLoop.hasPaused()).to.be.true;
                })
                // then pause for approx. 2 seconds
                .then( () => new Promise(resolve => setTimeout(() => { resolve() }, 550)) )
                // then resume again
                .then( () => {
                    expect(spy).to.have.been.called.exactly(2);
                    animationLoop.resume();
                })
                //and check results
                .then( () => new Promise(resolve => setTimeout(() => { resolve() }, 550)) )
                .then( () => {
                    expect(spy).to.have.been.called.exactly(4);
                })
                .finally(() => {
                    animationLoop.stop()
                });


        }).timeout(2000);
    });

    describe("setUpdatesPerSecond", () => {
        it("", () => {
            //TODO
        });
    });

    describe("setFrameTickStrategy", () => {
        //TODO
    });
})