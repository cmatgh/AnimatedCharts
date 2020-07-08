import {ChartData} from "./data/FrameData";

export interface Chart {

    drawData(frameData : ChartData) : void;

}