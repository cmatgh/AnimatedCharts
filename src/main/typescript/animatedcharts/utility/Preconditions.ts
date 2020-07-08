
export class Preconditions {

    static checkNotNull(obj: any) {
        if(obj === null) {
            throw Error("May not be null.");
        }
    }

    static checkNotEmpty(obj: any) {
        if(!obj.length || obj.length == 0) {
            throw Error("May not be empty.");
        }
    }

    /**
     *
     * @param start inclusive
     * @param end exclusive
     * @param position index to check
     * @param message that should be displayed
     */

    static checkRange(start: number, end: number, position: number, message? : string) : void {
        if(position < 0 || position >= end) {
            let m = message != null ? message : "Position out of range.";

            throw RangeError(m);
        }
    }
}