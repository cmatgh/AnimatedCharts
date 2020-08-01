import { Comparator } from "../../interfaces/Comparator";
import {ChartData} from "../../animation/data/FrameData";

export class ValueComparator implements Comparator<ChartData> {

    compare(o1: ChartData, o2: ChartData): number {
        return o1.value - o2.value;
    }

}