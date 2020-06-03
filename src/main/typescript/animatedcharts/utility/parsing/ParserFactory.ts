import {CSVParser} from "./CSVParser";
import {Parser} from "./Parser";
import {XLSParser} from "./XLSParser";

export class ParserFactory {
    parsers : Map<string, Parser>;

    constructor() {
        this.parsers = new Map<string, Parser>([
            ["csv", new CSVParser()],
            ["xls", new XLSParser()],
        ]);
    }

    getTypes(): string[] {
        return Array.from(this.parsers.keys());
    }

    create(type: string) : Parser{
        if(this.parsers.has(type)){
            return this.parsers.get(type);
        }

        throw new Error("comparator type does not exist: " + type );
    }

}