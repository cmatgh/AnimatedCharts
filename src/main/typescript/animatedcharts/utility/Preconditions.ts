
export class Preconditions {

    static checkNotNull(obj: object) {
        if(obj === null) {
            throw Error("null");
        }
    }
}