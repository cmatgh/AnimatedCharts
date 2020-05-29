
export interface Comparator<T> {

    /**
     * compares two objects of type T
     * @param o1 type T
     * @param o2 type T
     * @return  > 0 - when o1 is ordered before o2
     * <br> 0 - when o1 is ordered equal to o2
     * <br> < 0  - when o1 is ordered after o2
     */
    compare(o1: T, o2: T) : number;

}