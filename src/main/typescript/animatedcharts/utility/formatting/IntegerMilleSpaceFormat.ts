import {NumberFormat} from "./NumberFormat";

export class IntegerMilleSpaceFormat implements NumberFormat{

    public static readonly IDENTIFIER = "INTEGER_MILLE_SPACE"

    format(number: string): string {
        const formattedInteger = parseInt(number, 10).toString();
        return this.getParts(formattedInteger).join(" ");
    }

    identifier(): string {
        return IntegerMilleSpaceFormat.IDENTIFIER;
    }

    private getParts(number : string) : string[] {
        const numParts = Math.ceil(number.length / 3);
        const parts = [];
        const reversedNumber = this.reverse(number);
        for(let i = 0; i < numParts; i++) {
            const startIndex = i * 3;
            const endIndex = startIndex + 3;
            parts.unshift(this.reverse(reversedNumber.substr(startIndex, endIndex)));
        }

        return parts;
    }
    private reverse(number : string) : string {
        return number.split("").reverse().join("");
    }

}