import * as Papa from "papaparse";
import {AbstractParser} from "./AbstractParser";

export class CSVParser extends AbstractParser {

    protected parseRows(buffer: Buffer): object[][] {
        return Papa.parse(buffer.toString("utf8")).data;
    }

}
