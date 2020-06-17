
export class Preconditions {

    static checkNotNull(obj: any) {
        if(obj === null) {
            throw Error("May not be null");
        }
    }

    static checkNotEmpty(obj: any) {
        if(!obj.length || obj.length == 0) {
            throw Error("May not be empty");
        }
    }
}