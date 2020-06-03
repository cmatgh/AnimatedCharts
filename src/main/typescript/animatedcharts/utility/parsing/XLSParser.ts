import * as XLSX from "xlsx";
import {AbstractParser} from "./AbstractParser";
import * as Papa from "papaparse";
import {WorkBook} from "xlsx";

export class XLSParser extends AbstractParser {

    protected parseRows(buffer: Buffer): object[][] {
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
