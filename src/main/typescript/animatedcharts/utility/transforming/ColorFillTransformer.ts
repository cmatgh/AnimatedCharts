import {Transformer} from "./Transformer";
import {DataObject} from "../../animation/Animation";
import * as convert from "color-convert";

export class ColorFillTransformer implements Transformer {

    execute(dataObject: DataObject): DataObject {
        let hue = 0;
        let stepLength = Math.floor(360 / dataObject.valuesLength);

        dataObject.dataSets.forEach(dataset => {
            dataset.color = this.generate(dataset.color, hue);
            hue += stepLength;
        });

        return dataObject;
    }


    private generate(color: number[], hue: number): number[] {
        if(color.length != 3) {
            const rgbaVal = convert.hsv.rgb([hue % 360, 85, 85]);
            return [rgbaVal[0], rgbaVal[1], rgbaVal[2]];
        }
        return color;
    }


}