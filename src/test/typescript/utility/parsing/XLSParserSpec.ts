import { expect } from "chai";
import {XLSParsingStrategy} from "../../../../main/typescript/animatedcharts/utility/parsing/XLSParsingStrategy";
import * as XLSX from "xlsx";
import {WorkBook, WorkSheet} from "xlsx";

describe("XLSParser", () => {

    let xlsParser: XLSParsingStrategy;

    beforeEach( () => {
        xlsParser = new XLSParsingStrategy();

    });


    describe("parse", () => {

        it("should throw error when head line is empty", () => {
            let buffer = createXLSFileBuffer([]);

            expect(() => xlsParser.parse(buffer)).to.throw("missing head line");
        });

        it("should throw error when head line does not contain required fields", () => {
            let onlyLabel = createXLSFileBuffer([["label"]]);
            let onlyColor = createXLSFileBuffer([["color"]]);

            expect(() => xlsParser.parse(onlyLabel)).to.throw("missing head field or wrong order, expected head line: 'label,color,...'");
            expect(() => xlsParser.parse(onlyColor)).to.throw("missing head field or wrong order, expected head line: 'label,color,...'");
        });


        it("should throw error when head line is in wrong order", () => {
            let data = createXLSFileBuffer([["color", "lable"]]);
            expect(() => xlsParser.parse(data)).to.throw("missing head field or wrong order, expected head line: 'label,color,...'");
        });

        it("should succeed when required head fields in input", () => {
            const data = createXLSFileBuffer([["label", "color"]]);
            const parsedObj = xlsParser.parse(data);

            expect(parsedObj.columnDefs).to.deep.equal(["label", "color"]);
            expect(parsedObj.dataSets).to.deep.equal([]);
            expect(parsedObj.valuesLength).to.equal(0);
        });

        it("should parse csv head line", () => {
            const data = createXLSFileBuffer([["label", "color", "columnName1", "columnName2"]]);

            const parsedObj = xlsParser.parse(data);

            expect(parsedObj.columnDefs).to.deep.equal(["label", "color", "columnName1", "columnName2"]);
            expect(parsedObj.dataSets).to.deep.equal([]);
            expect(parsedObj.valuesLength).to.equal(2);
        });

        it("should parse multiple csv lines", () => {
            const data = createXLSFileBuffer([["label","color","column1","column2"], ["label1","color1","2","3"]])

            const parsedObj = xlsParser.parse(data);

            expect(parsedObj.columnDefs).to.deep.equal(["label", "color", "column1", "column2"]);
            expect(parsedObj.dataSets).to.deep.equal([{ label: "label1", color: "color1", values: [2, 3]}]);
            expect(parsedObj.valuesLength).to.equal(2);
        });

        // it("should throw error when number of values per line are not uniform", () => {
        //     const data = createXLSFileBuffer([["label","color","column1"], ["label1","color1", "2", "3"]])
        //
        //     expect(() => xlsParser.parse(data)).to.throw("invalid format");
        // });


    });

    function createXLSFileBuffer(data: string[][]) : Buffer {
        let workBook : WorkBook = XLSX.utils.book_new();
        let workSheet = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");

        return XLSX.write(workBook, {type: "buffer"});
    }

});