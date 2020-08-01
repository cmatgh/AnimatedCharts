import {Iterators} from "../../utility/Iterators";
import {Iterator} from "../../interfaces/Iterator";
import {Preconditions} from "../../utility/Preconditions";

export class CyclicRandomAccessIterator<T> implements Iterator<T>{

    private data : T[];
    private iterator : Iterator<T>;
    private currentFrameData : T;

    constructor(data : T[], frame : number = 0) {
        Preconditions.checkRange(0, data.length + (frame == 0 ? 1 : 0), frame);

        this.data = data;
        this.setFrame(frame);
    }

    setFrame(frame : number) : void {
        Preconditions.checkRange(0, this.data.length + (frame == 0 ? 1 : 0), frame);

        if(this.data.length == 0) {
            this.iterator = Iterators.emptyIterator<T>();
        }  else {
            this.iterator = Iterators.cyclic<T>(this.data, frame);
        }

        this.currentFrameData = null;
    }

    getCurrentFrame() : T {
        return this.currentFrameData;
    }

    getNext(): T {
        this.currentFrameData = this.iterator.getNext();
        return this.currentFrameData;
    }

    hasNext(): boolean {
        return this.iterator.hasNext();
    }

}