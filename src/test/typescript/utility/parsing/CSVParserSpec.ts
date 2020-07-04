import { expect } from "chai";
import {CSVParsingStrategy} from "../../../../main/typescript/animatedcharts/utility/parsing/CSVParsingStrategy";

describe("CSVParser", () => {

    let csvParser: CSVParsingStrategy;

    beforeEach( () => {
        csvParser = new CSVParsingStrategy();
    });


    describe("parse", () => {
        it("should throw error when head line is empty", () => {
            const data = Buffer.from("");

            expect(() => csvParser.parseRows(data)).to.throw("missing head line");
        });

        it("should throw error when head line does not contain required fields", () => {
            expect(() => csvParser.parseRows(Buffer.from("label"))).to.throw("missing head field or wrong order, expected head line: 'label,color,...'");
            expect(() => csvParser.parseRows(Buffer.from("color"))).to.throw("missing head field or wrong order, expected head line: 'label,color,...'")
        });

        it("should throw error when head line is in wrong order", () => {
            expect(() => csvParser.parseRows(Buffer.from("color,label"))).to.throw("missing head field or wrong order, expected head line: 'label,color,...'");
        });

        it("should succeed when required head fields in input", () => {
            const data = Buffer.from("label,color");

            const parsedObj = csvParser.parseRows(data);

            expect(parsedObj.columnDefs).to.deep.equal(["label", "color"]);
            expect(parsedObj.dataSets).to.deep.equal([]);
            expect(parsedObj.valuesLength).to.equal(0);
        });

        it("should parse csv head line", () => {
            const data = Buffer.from("label,color,columnName1,columnName2");

            const parsedObj = csvParser.parseRows(data);

            expect(parsedObj.columnDefs).to.deep.equal(["label", "color", "columnName1", "columnName2"]);
            expect(parsedObj.dataSets).to.deep.equal([]);
            expect(parsedObj.valuesLength).to.equal(2);
        });

        it("should parse multiple csv lines", () => {
            const data = Buffer.from("label,color,column1,column2\n" +
                "label1,color1,2,3");

            const parsedObj = csvParser.parseRows(data);

            expect(parsedObj.columnDefs).to.deep.equal(["label", "color", "column1", "column2"]);
            expect(parsedObj.dataSets).to.deep.equal([{ label: "label1", color: "color1", values: [2, 3]}]);
            expect(parsedObj.valuesLength).to.equal(2);
        });

        it("should throw error when number of values per line are not uniform", () => {
            const data = Buffer.from("label,color,column1\n" +
                "label1,color1");

            expect(() => csvParser.parseRows(data)).to.throw("invalid format");
        });
    });

});