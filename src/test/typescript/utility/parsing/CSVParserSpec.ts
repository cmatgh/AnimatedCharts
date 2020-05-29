import { CSVParser } from "../../../../main/typescript/animatedcharts/utility/parsing/CSVParser";
import { expect } from "chai";

describe("CSVDataParser", () => {

    let csvDataParser: CSVParser;

    beforeEach( () => {
        csvDataParser = new CSVParser();
    });


    describe("parse", () => {
        it("should throw error when head line is empty", () => {
            const line = "";

            expect(() => csvDataParser.parse(line)).to.throw("missing head line");
        });

        it("should throw error when head line does not contain required fields", () => {
            expect(() => csvDataParser.parse("label")).to.throw("missing head field or wrong order, expected head line: 'label,color,...'");
            expect(() => csvDataParser.parse("color")).to.throw("missing head field or wrong order, expected head line: 'label,color,...'")
        });

        it("should throw error when head line is in wrong order", () => {
            expect(() => csvDataParser.parse("color,label")).to.throw("missing head field or wrong order, expected head line: 'label,color,...'");
        });

        it("should succeed when required head fields in input", () => {
            const line = "label,color";

            const parsedObj = csvDataParser.parse(line);

            expect(parsedObj.columnDefs).to.deep.equal(["label", "color"]);
            expect(parsedObj.dataSets).to.deep.equal([]);
            expect(parsedObj.valuesLength).to.equal(0);
        });

        it("should parse csv head line", () => {
            const line = "label,color,columnName1,columnName2";

            const parsedObj = csvDataParser.parse(line);

            expect(parsedObj.columnDefs).to.deep.equal(["label", "color", "columnName1", "columnName2"]);
            expect(parsedObj.dataSets).to.deep.equal([]);
            expect(parsedObj.valuesLength).to.equal(2);
        });

        it("should parse multiple csv lines", () => {
            const line =    "label,color,column1,column2\n" +
                            "label1,color1,2,3";

            const parsedObj = csvDataParser.parse(line);

            expect(parsedObj.columnDefs).to.deep.equal(["label", "color", "column1", "column2"]);
            expect(parsedObj.dataSets).to.deep.equal([{ label: "label1", color: "color1", values: [2, 3]}]);
            expect(parsedObj.valuesLength).to.equal(2);
        });

        it("should throw error when number of values per line are not uniform", () => {
            const line =    "label,color,column1\n" +
                            "label1,color1";

            expect(() => csvDataParser.parse(line)).to.throw("invalid format");
        });
    });

});