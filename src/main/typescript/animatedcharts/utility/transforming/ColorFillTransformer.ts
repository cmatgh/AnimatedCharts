import {Transformer} from "./Transformer";
import {DataObject} from "../../animation/Animation";
import * as convert from "color-convert";

export class ColorFillTransformer implements Transformer {

    private static readonly HUE_MAX : number = 360;
    private static readonly SATURATION : number = 85;
    private static readonly VALUE : number = 85;

    execute(dataObject: DataObject): DataObject {


        dataObject.frameData.forEach(data => {
            let hue = 0;
            let stepLength = Math.floor(ColorFillTransformer.HUE_MAX / dataObject.entriesCount);

            data.getFrameDataSet().forEach( entry => {
                entry.color = ColorFillTransformer.generate(entry.color, hue);
                hue += stepLength;
            })

        });

        return dataObject;
    }


    private static generate(color: number[], hue: number): number[] {
        if(color.length != 3) {
            return convert.hsv.rgb([
                hue % ColorFillTransformer.HUE_MAX,
                ColorFillTransformer.SATURATION,
                ColorFillTransformer.VALUE]);
        }
        return color;
    }


}