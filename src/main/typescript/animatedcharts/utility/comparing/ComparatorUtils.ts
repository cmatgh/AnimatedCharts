import { Comparator } from "../../interfaces/Comparator";

export class ComparatorUtils {

    static reverse<T>(comparator: Comparator<T>) : Comparator<T>{
        return new (class implements Comparator<T> {
            compare(o1: T, o2: T): number {
                return comparator.compare(o1,o2) * -1;
            }
        })
    }
}