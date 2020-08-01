import {AbstractView} from "../AbstractView";
import {FrameData} from "../../animation/data/FrameData";

export abstract class AnimationView extends AbstractView{

    abstract setProperty(property: string)

    abstract setChart(type : string) : void

    abstract setTitle(title : string) : void

    abstract update(datasets: FrameData) : void

}