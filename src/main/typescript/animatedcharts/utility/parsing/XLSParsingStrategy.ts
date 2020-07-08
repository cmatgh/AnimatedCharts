import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import {WorkBook} from "xlsx";
import {ParsingStrategy} from "./ParsingStrategy";

export class XLSParsingStrategy implements ParsingStrategy {

    parse(buffer: Buffer): object[][] {
        let workBook = XLSX.read(buffer, { type: "buffer"});
        this.checkHasSheet(workBook);

        let data = XLSX.utils.sheet_to_csv(workBook.Sheets[workBook.SheetNames[0]]);
        return Papa.parse(this.removeLastNewline(data)).data;
    }

    private checkHasSheet(workBook: WorkBook) {
        if(workBook.SheetNames.length == 0) {
            throw new Error("no sheets available");
        }
    }

    private removeLastNewline(data: string) : string {
        if(data.endsWith("\n")) {
            return  data.substring(0, data.lastIndexOf("\n"));
        }
        return data;
    }

}
