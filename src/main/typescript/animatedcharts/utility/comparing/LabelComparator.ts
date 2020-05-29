import { FrameDataSet } from "../../animation/Animation";
import { Comparator } from "./Comparator";


export class LabelComparator implements Comparator<FrameDataSet> {
    compare(o1: FrameDataSet, o2: FrameDataSet): number {
        return o1.label.localeCompare(o2.label);
    }

}