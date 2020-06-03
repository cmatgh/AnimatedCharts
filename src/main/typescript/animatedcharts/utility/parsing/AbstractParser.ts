import {Parser} from "./Parser";
import {DataObject} from "../../animation/Animation";

export abstract class AbstractParser implements Parser{

    private REQUIRED_COLUMNS : String[] = ["label", "color"]

    parse(buffer: Buffer): DataObject {
        let parsedData = this.parseRows(buffer);
        this.validate(parsedData);
        return this.transform(parsedData);
    }
    protected abstract parseRows(buffer: Buffer) : object[][];

    public validate(data: object[][]) : void {
        this.checkHasHeadLine(data);
        this.checkHasRequiredFields(data);
        this.checkHasValidFormat(data);
    }

    private checkHasHeadLine(data: object[][]) : void {
        if(data.length === 0){
            throw Error("missing head line");
        }
    }

    private checkHasRequiredFields(data: object[][]) : void {
        if(!this.containsCorrectOrderedRequiredFields(data[0])) {
            throw Error("missing head field or wrong order, expected head line: 'label,color,...'");
        }
    }

    private containsCorrectOrderedRequiredFields(headline: object[]) : boolean {
        for(let i = 0; i < this.REQUIRED_COLUMNS.length; i++) {
            if(headline.length <= i || headline[i] != this.REQUIRED_COLUMNS[i]) return false;
        }

        return true;
    }

    private checkHasValidFormat(data: object[][]) : void {
        const headLength = data[0].length;
        for(let i = 1; i < data.length; i++) {
            if(data[i].length != headLength) {
                throw Error("invalid format: line " + (i + 1));
            }

        }
    }

    private transform(data:object[][]) : DataObject {
        const valueRows = data.filter((row, index, array) => index > 0);
        const datasets = valueRows.map( row => {
            return {
                label: row[0].toString(),
                color: row[1] as number[],
                values: row.filter((row, index) => index > 1)
                    .map(value => parseInt(value.toString()))
            }
        } )
        return {
            columnDefs : data[0].map( val => val.toString()),
            dataSets : datasets,
            valuesLength: data[0].length - 2,
        }
    }
}