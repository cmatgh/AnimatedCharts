import * as Papa from "papaparse";
import {ParsingStrategy} from "./ParsingStrategy";

export class CSVParsingStrategy implements ParsingStrategy {

    private static readonly DEFAULT_CHARSET = "utf8"

    parse(buffer: Buffer): object[][] {
        return Papa.parse(buffer.toString(CSVParsingStrategy.DEFAULT_CHARSET)).data;
    }

}
