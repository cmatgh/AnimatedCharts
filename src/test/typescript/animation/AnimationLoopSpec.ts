import "mocha"
import * as spies from 'chai-spies';
import * as chai from "chai";
chai.use(spies);
import { JSDOM } from "jsdom";
import { AnimationLoop } from "../../../main/typescript/animatedcharts/animation/AnimationLoop";
import { expect } from "chai";
import {Command} from "../../../main/typescript/animatedcharts/commands/Command";
import {Logger} from "../../../main/typescript/animatedcharts/utility/logging/Logger";

describe("AnimationLoop", () => {

    let animationLoop: AnimationLoop;
    let spyCommand : Command = null;
    let timeout;

    beforeEach( () => {
        //set 4 times per second to increase test speed
        let ups = 4;
        timeout = 1000/ups;
        animationLoop = new AnimationLoop(
            new JSDOM(``, { pretendToBeVisual: true }).window, 4);

        spyCommand = new class implements Command {
            execute(map: Map<string, any>): void {}
        }();
    });

    describe("start", () => {
        let iterations = 4;

        it("should start the loop", async () => {
            chai.spy.on(spyCommand, "execute");
            animationLoop.setOnTickCommand(spyCommand);
            animationLoop.start();

            expect(animationLoop.isRunning()).to.be.true;

            await new Promise(resolve => setTimeout(() => { resolve() },  iterations * timeout + 100))
                .then( () => {
                    expect(spyCommand.execute).to.have.been.called.exactly(iterations);
                }).finally(() => {
                    animationLoop.stop()
                });
        }).timeout(iterations * timeout + 200);

        it("should not start a new loop when already started", async() => {
            chai.spy.on(spyCommand, "execute");
            animationLoop.setOnTickCommand(spyCommand);

            animationLoop.start();
            animationLoop.start();

            expect(animationLoop.isRunning()).to.be.true;

            await new Promise(resolve => setTimeout(() => { resolve() }, iterations * timeout + 50))
                .then( () => {
                    expect(spyCommand.execute).to.have.been.called.exactly(iterations);
                }).finally(() => {
                    animationLoop.stop()
                });
        }).timeout(iterations * timeout + 200);
    });

    describe("stop", () => {

        let iterations = 4;

        it("should cancel the loop", async() => {
            chai.spy.on(spyCommand, "execute");
            animationLoop.setOnTickCommand(spyCommand);

            animationLoop.start();
            expect(animationLoop.isRunning()).to.be.true;
            animationLoop.stop();
            expect(animationLoop.isRunning()).to.be.false;

            await new Promise(resolve => setTimeout(() => { resolve() }, timeout * iterations + 100))
                .then( () => {
                    expect(spyCommand.execute).to.have.been.called.exactly(0);
                });
        }).timeout(iterations * timeout + 200);

        it("should have no effect when not started", () => {
            expect(animationLoop.isRunning()).to.be.false;
            animationLoop.stop();
            expect(animationLoop.isRunning()).to.be.false;
        });

        it("should stop running and unpause when paused", () => {
            animationLoop.start();
            animationLoop.stop();

            expect(animationLoop.isRunning()).to.be.false;
        });
    });

    describe("setUpdatesPerSecond", () => {

        it("should increase ticks per second", async () => {
            chai.spy.on(spyCommand, "execute");
            animationLoop.setOnTickCommand(spyCommand);

            animationLoop.setUpdatesPerSecond(5);

            animationLoop.start();
            expect(animationLoop.isRunning()).to.be.true;

            await new Promise(resolve => setTimeout(() => { resolve() }, 1090))
                .then( () => {
                    expect(spyCommand.execute).to.have.been.called.exactly(5);
                }).finally(() => animationLoop.stop());
        });

        it("should cap at max constant", async () => {
            chai.spy.on(spyCommand, "execute");
            animationLoop.setOnTickCommand(spyCommand);

            animationLoop.setUpdatesPerSecond(42);

            animationLoop.start();
            expect(animationLoop.isRunning()).to.be.true;

            await new Promise(resolve => setTimeout(() => { resolve() }, 1090))
                .then( () => {
                    expect(spyCommand.execute).to.have.been.called.exactly(AnimationLoop.MAX_UPDATES_PER_SECOND);
                }).finally(() => animationLoop.stop());
        });

        it("should cap at min constant", async () => {
            chai.spy.on(spyCommand, "execute");
            animationLoop.setOnTickCommand(spyCommand);

            animationLoop.setUpdatesPerSecond(0.01);

            animationLoop.start();
            expect(animationLoop.isRunning()).to.be.true;

            await new Promise(resolve => setTimeout(() => { resolve() }, 5090))
                .then( () => {
                    expect(spyCommand.execute).to.have.been.called.exactly(1 );
                }).finally(() => animationLoop.stop());
        }).timeout(5500);
    });

})