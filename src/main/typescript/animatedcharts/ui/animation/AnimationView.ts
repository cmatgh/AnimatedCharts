import {FrameDataSet} from "../../animation/Animation";
import {AbstractView} from "../AbstractView";

export abstract class AnimationView extends AbstractView{

    abstract setProperty(property: string)

    abstract setChart(type : string) : void

    abstract setTitle(title : string) : void

    abstract updateChart(datasets: FrameDataSet[]) : void

}