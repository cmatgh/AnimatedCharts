import {NumberFormat} from "./NumberFormat";

export class NumberFormatter {

    private static formattings : Map<string, NumberFormat> = new Map<string, NumberFormat>();

    static add(numberFormat : NumberFormat) {
        this.formattings.set(numberFormat.identifier(), numberFormat);
    }

    static format(number : string, numberFormatIdentifier : string) {
        this.assertIsNumber(number);

        if(this.formattings.has(numberFormatIdentifier)) {
            return this.formattings.get(numberFormatIdentifier).format(number);
        }

        throw new Error("Format does not exist.")
    }

    private static assertIsNumber(number : string) {
        if(isNaN(parseInt(number, 10))){
            throw new Error("Given string is not a valid number.");
        };
    }
}