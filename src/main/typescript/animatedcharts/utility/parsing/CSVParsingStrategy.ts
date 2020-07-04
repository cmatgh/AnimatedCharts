import * as Papa from "papaparse";
import {ParsingStrategy} from "./ParsingStrategy";

export class CSVParsingStrategy implements ParsingStrategy {

    parseRows(buffer: Buffer): object[][] {
        return Papa.parse(buffer.toString("utf8")).data;
    }

}
