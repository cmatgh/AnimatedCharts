export class IllegalArgumentError extends Error {

    constructor(message? : string) {
        super(message);
        Object.setPrototypeOf(this, IllegalArgumentError.prototype);
    }
}