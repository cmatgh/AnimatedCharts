import {NumberFormat} from "./NumberFormat";
import {StringGrouper} from "./StringGrouper";

export class IntegerMillePointFormat implements NumberFormat{

    public static readonly IDENTIFIER = "INTEGER_MILLE_POINT"
    private stringGrouper : StringGrouper;

    constructor() {
        this.stringGrouper = new StringGrouper(3, ".");
    }

    format(number: string): string {
        const parsedNumber = parseInt(number, 10).toString();
        return this.stringGrouper.apply(parsedNumber);
    }

    identifier(): string {
        return IntegerMillePointFormat.IDENTIFIER;
    }

}