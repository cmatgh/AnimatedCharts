import {FrameDataSet} from "../Animation";

export interface FrameData {
    getProperty() : string;

    getFrameDataSet() : FrameDataSet[];
}
