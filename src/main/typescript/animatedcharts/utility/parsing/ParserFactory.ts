import {CSVParser} from "./CSVParser";
import {Parser} from "./Parser";
import {XLSParser} from "./XLSParser";

export class ParserFactory {

    private static instance : ParserFactory;

    private parsers : Map<string, Parser>;

    private constructor() {
        this.parsers = new Map<string, Parser>([
            ["csv", new CSVParser()],
            ["xls", new XLSParser()],
        ]);
    }

    public static getInstance() : ParserFactory {
        if(this.instance == null) {
            this.instance = new ParserFactory();
        }
        return this.instance;
    }

    getTypes(): string[] {
        return Array.from(this.parsers.keys());
    }

    create(type: string) : Parser {
        if(this.parsers.has(type)){
            return this.parsers.get(type);
        }

        throw new Error("parser type does not exist: " + type );
    }

}