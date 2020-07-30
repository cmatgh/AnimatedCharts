import { Comparator } from "../../interfaces/Comparator";
import {ChartData} from "../../animation/data/FrameData";


export class LabelComparator implements Comparator<ChartData> {
    compare(o1: ChartData, o2: ChartData): number {
        return o1.label.localeCompare(o2.label);
    }

}