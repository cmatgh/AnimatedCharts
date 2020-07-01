import {View} from "../View";
import {DataSet, FrameDataSet} from "../../animation/Animation";

export interface AnimationView extends View{

    setProperty(property: string)

    setChart(type : string) : void

    setTitle(title : string) : void

    updateChart(datasets: FrameDataSet[]) : void

}