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

        it("should succeed when required head fields in input", () => {
            const data = createXLSFileBuffer([["label", "color"]]);
            const parsedObj = xlsParser.parse(data);

            expect(parsedObj).to.deep.equal([["label", "color"]]);
        });

        it("should parse csv head line", () => {
            const data = createXLSFileBuffer([["label", "color", "columnName1", "columnName2"]]);

            const parsedObj = xlsParser.parse(data);

            expect(parsedObj).to.deep.equal([["label", "color", "columnName1", "columnName2"]]);
        });

        it("should parse multiple xls lines", () => {
            const data = createXLSFileBuffer([["label","color","column1","column2"], ["label1","color1","2","3"]])

            const parsedObj = xlsParser.parse(data);

            expect(parsedObj).to.deep.equal([["label", "color", "column1", "column2"], [ "label1", "color1", "2", "3"]]);
        });

    });

    function createXLSFileBuffer(data: string[][]) : Buffer {
        let workBook : WorkBook = XLSX.utils.book_new();
        let workSheet = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");

        return XLSX.write(workBook, {type: "buffer"});
    }

});