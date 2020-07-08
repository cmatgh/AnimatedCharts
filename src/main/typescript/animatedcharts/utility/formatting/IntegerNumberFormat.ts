import {NumberFormat} from "./NumberFormat";

export class IntegerNumberFormat implements NumberFormat{

    public static IDENTIFIER = "INTEGER";

    format(number: string): string {
        return parseInt(number, 10).toString(10);
    }

    identifier(): string {
        return IntegerNumberFormat.IDENTIFIER;
    }

}