import { FrameDataSet } from "../../animation/Animation";
import { Comparator } from "./Comparator";

export class ValueComparator implements Comparator<FrameDataSet> {

    compare(o1: FrameDataSet, o2: FrameDataSet): number {
        return o1.value - o2.value;
    }

}