import { FrameDataSet } from "../../animation/Animation";
import { Comparator } from "./Comparator";
import * as convert from "color-convert";

export class ColorComparator implements Comparator<FrameDataSet> {

    compare(o1: FrameDataSet, o2: FrameDataSet): number {
        const o1HSV = convert.rgb.hsv([o1.color[0], o1.color[1], o1.color[2]]);
        const o2HSV = convert.rgb.hsv([o2.color[0], o2.color[1], o2.color[2]]);

        //compare hue
        let result = o1HSV[0] - o2HSV[0];
        if(result != 0) return result;

        //then saturation
        result = o1HSV[1] - o2HSV[1];
        if(result != 0) return result;

        //and finally the brightness
        return o1HSV[2] - o2HSV[2];
    }

}