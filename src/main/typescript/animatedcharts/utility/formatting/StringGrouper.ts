import {Preconditions} from "../Preconditions";

export class StringGrouper {

    constructor(private groupSize : number, private delimiter : string) {
        Preconditions.checkNotNull(groupSize);
        Preconditions.checkNotNull(delimiter);
        Preconditions.checkArgument(groupSize > 0, "Group size must be greater than 0");
    }


    apply(s: string) : string{
        return this.getParts(s).join(this.delimiter);
    }

    private getParts(s : string) : string[] {
        const numParts = Math.ceil(s.length / this.groupSize);
        const parts = [];
        const reversedString = StringGrouper.reverse(s);
        for(let i = 0; i < numParts; i++) {
            const startIndex = i * this.groupSize;
            parts.unshift(StringGrouper.reverse(reversedString.substr(startIndex, this.groupSize)));
        }

        return parts;
    }
    private static reverse(s : string) : string {
        return s.split("").reverse().join("");
    }
}