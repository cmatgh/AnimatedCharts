import { expect } from "chai";
import {CSVParsingStrategy} from "../../../../main/typescript/animatedcharts/utility/parsing/CSVParsingStrategy";

describe("CSVParsingStrategy", () => {

    let csvParser: CSVParsingStrategy;

    beforeEach( () => {
        csvParser = new CSVParsingStrategy();
    });


    describe("parse", () => {
        it("should parse empty string", () => {
            // given
            const buffer = Buffer.from("");

            // when
            const data = csvParser.parse(buffer);

            // then
            expect(data).to.deep.eq([]);
        });

        it("should succeed when required head fields in input", () => {
            // given
            const buffer = Buffer.from("label,color");

            // when
            const parsedObj = csvParser.parse(buffer);

            // then
            expect(parsedObj).to.deep.equal([["label", "color"]]);
        });

        it("should parse csv head line", () => {
            // given
            const buffer = Buffer.from("label,color,columnName1,columnName2\nlabel1,color1,val1,val2");
            const expected = [
                ["label", "color", "columnName1", "columnName2"],
                ["label1", "color1", "val1", "val2"]
            ];

            // when
            const data = csvParser.parse(buffer);

            // then
            expect(data).to.deep.equal(expected);
        });


        it("should parse empty line", () => {
            // given
            const buffer = Buffer.from("label,color,columnName1,columnName2\nlabel1,color1,val1,val2\n\n");
            const expected = [
                ["label", "color", "columnName1", "columnName2"],
                ["label1", "color1", "val1", "val2"],
                [""],
                [""]
            ];

            // when
            const data = csvParser.parse(buffer);

            // then
            expect(data).to.deep.equal(expected);
        });

    });

});