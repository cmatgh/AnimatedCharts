import { expect } from "chai";
import {NumberFormatter} from "../../../../main/typescript/animatedcharts/utility/formatting/NumberFormatter";
import {IntegerNumberFormat} from "../../../../main/typescript/animatedcharts/utility/formatting/IntegerNumberFormat";
import {IntegerMillePointFormat} from "../../../../main/typescript/animatedcharts/utility/formatting/IntegerMillePointFormat";
import {IntegerMilleSpaceFormat} from "../../../../main/typescript/animatedcharts/utility/formatting/IntegerMilleSpaceFormat";

describe("NumberFormatter", () => {

    beforeEach( () => {

    });

    describe("format", () => {
        it("should throw error when number format does not exist", () => {
            expect(() => NumberFormatter.format("4141,44", "INTEGER"))
                .to.throw("Format does not exist.")
        });

        it("should throw error when given number string is not a number", () => {
            expect(() => NumberFormatter.format("asd,44", "INTEGER"))
                .to.throw("Given string is not a valid number.")
        });
    });

    describe("IntegerNumberFormat", () => {

        it("should format correctly", () => {
            // given
            const expected = "4003";
            const numberFormat = new IntegerNumberFormat();
            NumberFormatter.add(numberFormat);

            //when
            const number = NumberFormatter.format("4003,30", IntegerNumberFormat.IDENTIFIER);

            //then
            expect(number).to.be.eq(expected);
        });
    });

    describe("IntegerMillePointNumberFormat", () => {

        it("should format correctly", () => {
            // given
            const expected = "4.003";
            const numberFormat = new IntegerMillePointFormat();
            NumberFormatter.add(numberFormat);

            //when
            const number = NumberFormatter.format("4003,30", IntegerMillePointFormat.IDENTIFIER)

            //then
            expect(number).to.be.eq(expected);
        });
    });

    describe("IntegerMillePointNumberFormat", () => {

        it("should format correctly", () => {
            // given
            const expected = "4 003";
            const numberFormat = new IntegerMilleSpaceFormat();
            NumberFormatter.add(numberFormat);

            //when
            const number = NumberFormatter.format("4003,30", IntegerMilleSpaceFormat.IDENTIFIER)

            //then
            expect(number).to.be.eq(expected);
        });
    });

});