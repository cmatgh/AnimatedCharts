import { expect } from "chai";
import {StringGrouper} from "../../../../main/typescript/animatedcharts/utility/formatting/StringGrouper";
import {NullError} from "../../../../main/typescript/animatedcharts/utility/errors/NullError";
import {IllegalArgumentError} from "../../../../main/typescript/animatedcharts/utility/errors/IllegalArgumentError";

describe("StringGrouper", () => {

    beforeEach( () => {

    });

    describe("constructor", () => {
        it("should throw error when parameters are null", () => {
            expect(() => new StringGrouper(null, " ")).to.throw(NullError);
            expect(() => new StringGrouper(1, null)).to.throw(NullError);
        });

        it("should throw error when groupSize is below 1", () => {
            expect(() => new StringGrouper(0, " ")).to.throw(IllegalArgumentError);
            expect(() => new StringGrouper(-1, " ")).to.throw(IllegalArgumentError);
            expect(() => new StringGrouper(-10, " ")).to.throw(IllegalArgumentError);
        });
    });

    describe("apply", () => {
        it("should group strings correctly and set the delimiter", () => {
            const stringGrouper = new StringGrouper(2, " ");

            expect(stringGrouper.apply("somestring")).to.be.eq("so me st ri ng");
            expect(stringGrouper.apply("")).to.be.eq("");
            expect(stringGrouper.apply("s")).to.be.eq("s");
            expect(stringGrouper.apply("so")).to.be.eq("so");
            expect(stringGrouper.apply("som")).to.be.eq("s om");
        });

        it("should group numbers correctly and set the delimiter", () => {
            const stringGrouper = new StringGrouper(3, ".");

            expect(stringGrouper.apply("19403")).to.be.eq("19.403");
            expect(stringGrouper.apply("193")).to.be.eq("193");
            expect(stringGrouper.apply("")).to.be.eq("");
            expect(stringGrouper.apply("2")).to.be.eq("2");
            expect(stringGrouper.apply("324234414")).to.be.eq("324.234.414");
        });
    });

});