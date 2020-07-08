import {Iterator} from "./Iterator";
import {Preconditions} from "./Preconditions";

export class Iterators {

    static default<T>(array : Array<T>, offset? : number) : Iterator<T>{
        return new class implements Iterator<T> {

            private readonly array : Array<T>;
            private position : number;

            constructor(array : Array<T>, offset?: number) {
                Preconditions.checkRange(0, array.length, offset);

                this.array = array;
                this.position = offset != null ? offset : 0;
            }

            getNext(): T {
                if(this.position >= this.array.length) {
                    throw new Error("No such element.");
                }

                return this.array[this.position++];
            }

            hasNext(): boolean {
                if(this.position < this.array.length) {
                    return true;
                }
                return false;
            }
        }(array, offset);
    }

    static cyclic<T>(array : Array<T>, offset? : number) : Iterator<T> {
        return new class implements Iterator<T> {

            array : Array<T>
            position : number;

            constructor(array : Array<T>, offset : number = 0) {
                if(array.length < 1) {
                    throw new Error("Array may not be empty.");
                }
                if(offset) {
                    Preconditions.checkRange(0, array.length, offset);
                }

                this.array = array;
                this.position = offset - 1;
            }

            getNext(): T {
                this.position = (this.position + 1) % this.array.length;
                return this.array[this.position];
            }

            hasNext(): boolean {
                return true;
            }

        }(array, offset);
    }

    static emptyIterator<T>() : Iterator<T> {
        return new class implements Iterator<T> {

            getNext(): T {
                return null
            }

            hasNext(): boolean {
                return false;
            }

        }();
    }
}