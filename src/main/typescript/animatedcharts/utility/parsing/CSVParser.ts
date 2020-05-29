import * as Papa from "papaparse";
import { ParseResult } from "papaparse";
import { DataObject } from "../../animation/Animation";
import { Parser } from "./Parser";

export class CSVParser implements Parser{

    private REQUIRED_COLUMNS : String[] = ["label", "color"]

    constructor() {

    }

    parse(data: string) : DataObject {
        const dataObj = Papa.parse(data);
        this.validate(dataObj);
        return this.transform(dataObj);
    }

    private validate(dataObj: ParseResult) : void {
        this.checkHasHeadLine(dataObj);
        this.checkHasRequiredFields(dataObj);
        this.checkHasValidFormat(dataObj);
    }

    private checkHasHeadLine(dataObj: ParseResult) : void {
        if(dataObj.data.length === 0){
            throw Error("missing head line");
        }
    }

    private checkHasRequiredFields(dataObj: ParseResult) : void {
        if(!this.containsCorrectOrderedRequiredFields(dataObj.data[0])) {
            throw Error("missing head field or wrong order, expected head line: 'label,color,...'");
        }
    }

    private containsCorrectOrderedRequiredFields(headline: string[]) : boolean {
        for(let i = 0; i < this.REQUIRED_COLUMNS.length; i++) {
            if(headline.length <= i || headline[i] != this.REQUIRED_COLUMNS[i]) return false;
        }

        return true;
    }

    private checkHasValidFormat(dataObj: ParseResult) : void {
        const headLength = dataObj.data[0].length;
        for(let i = 1; i < dataObj.data.length; i++) {
            if(dataObj.data[i].length != headLength) {
                throw Error("invalid format: line " + (i + 1));
            }

        }
    }

    private transform(dataObj: ParseResult) : DataObject {
        const valueRows = dataObj.data.filter((row, index, array) => index > 0);
        const datasets = valueRows.map( row => {
            return {
                label: row[0],
                color: row[1],
                values: row.filter((row, index) => index > 1)
                            .map(value => parseInt(value))
            }
        } )
        return {
            columnDefs : dataObj.data[0],
            dataSets : datasets,
            valuesLength: dataObj.data[0].length - 2,
        }
    }
}