import {Parser} from "./Parser";
import {DataObject} from "../../animation/Animation";
import {ParsingStrategy} from "./ParsingStrategy";
import {Preconditions} from "../Preconditions";

export class FileParser implements Parser{

    private static parsingStrategies : Map<string, ParsingStrategy> = new Map<string, ParsingStrategy>();

    private REQUIRED_COLUMNS : String[] = ["label", "color"]

    public static add(type : string, parsingStrategy : ParsingStrategy) {
        this.parsingStrategies.set(type, parsingStrategy);
    }

    parse(buffer: Buffer, type : string): DataObject {
        Preconditions.checkNotNull(buffer);
        Preconditions.checkNotNull(type)

        if(!FileParser.parsingStrategies.has(type)) {
            throw Error("No parsing strategy for this type found.");
        }

        let parsedData = FileParser.parsingStrategies.get(type).parseRows(buffer);
        this.validate(parsedData);
        return this.transform(parsedData);
    }

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
                color: this.rgbTripletToArray(row[1].toString()),
                values: row.slice(2).map(value => parseInt(value.toString()))
            }
        } )
        return {
            columnDefs : data[0].map( val => val.toString()),
            dataSets : datasets,
            valuesLength: data[0].length - 2,
        }
    }

    private rgbTripletToArray(color : string) : number[] {
        if(color == "") {
            return [];
        }
        this.isValidColor(color.toString());

        const colorTripletString = color
            .toString()
            .substring(4, color.toString().length - 1)
            .split(",");
        return [
            parseInt(colorTripletString[0]),
            parseInt(colorTripletString[1]),
            parseInt(colorTripletString[2])
        ];
    }

    private isValidColor(color : string) : void {
        //regex for 'rgb(xxx,xxx,xxx)' where xxx can be between 0 and 255
        const regexTemplate = /rgb\(([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\)/g;
        if(color.match(regexTemplate) == null) {
            throw new Error("Invalid color field. Valid format: rgb(xx,xxx,x).");
        }
    }

}