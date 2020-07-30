import { NullError } from "./NullError";

export class Preconditions {

    /**
     * Checks whether object is null. If so throws an Error.
     * @param obj the object you want to check on
     */
    static checkNotNull(obj: any) {
        if(obj === null) {
            throw new NullError();
        }
    }

    /**
     * Checks whether object is empty. If so throws an Error.
     * @param obj the object you want to check on
     */
    static checkNotEmpty(obj: any) {
        if(obj.length || obj.size) {
            let size = obj.length ? obj.length : obj.size;
            if(size > 0) {
                return
            }
        }

        throw Error("May not be empty.");
    }

    /**
     * Checks whether the condition is true. If not throws an Error.
     * @param state the state to check
     * @param message the error message that should be set
     */
    static checkState(state: boolean, message? : string) {
        if(!state) {
            throw Error(message ? message : "Illegal state.");
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