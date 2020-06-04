import {Logger} from "../../../../main/typescript/animatedcharts/utility/logging/Logger";
import {LogLevel} from "../../../../main/typescript/animatedcharts/utility/logging/LogLevel";
import {expect} from "chai";

describe("Logger", () => {

    let logger : Logger = Logger.getInstance();
    let debugMock: any;
    let infoMock: any;
    let warnMock: any;
    let errorMock: any;

    beforeEach( () => {
        debugMock = mockConsole("debug");
        warnMock = mockConsole("warn");
        infoMock = mockConsole("info");
        errorMock = mockConsole("error");
    });

    describe("debug", () => {

        it("should log correctly", () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.debug("message");
            expect(debugMock.called).to.be.true;
            expect(debugMock.value).to.contain("DEBUG");
        });

    });

    describe("info", () => {
        it("should log correctly", () => {
            logger.info("message");
            expect(infoMock.called).to.be.true;
            expect(infoMock.value).to.contain("INFO");
        });
    });

    describe("warn", () => {
        it("should log correctly", () => {
            logger.warn("message");
            expect(warnMock.value).to.contain("WARN");
            expect(warnMock.called).to.be.true;
        });
    });

    describe("error", () => {
        it("should log correctly", () => {
            logger.error("message");
            expect(errorMock.called).to.be.true;
            expect(errorMock.value).to.contain("ERROR");
        });
    });

    describe("LogLevel", () => {
        it("should log correctly", () => {
            logger.setLogLevel(LogLevel.ERROR);

            logger.debug("message");
            logger.info("message");
            logger.warn("message");
            logger.error("message");
            expect(debugMock.called).to.be.false;
            expect(infoMock.called).to.be.false;
            expect(warnMock.called).to.be.false;
            expect(errorMock.called).to.be.true;
            expect(errorMock.value).to.contain("ERROR");
        });
    });

    afterEach(() => {
        debugMock.restore();
        infoMock.restore();
        warnMock.restore();
        errorMock.restore();
    })

    function mockConsole(level : string) {
        let origConsole = console[level];
        let result = {
            called: false,
            value: null,
            restore : () => { console[level] = origConsole; }
        };
        console[level] = (msg: string, arg: string) => {
            result.value = msg;
            result.called = true;
        }

        return result;
    }
});