import { AnimationComponent } from "../animation/AnimationComponent";
import {Component} from "../Component";
import {Visitor} from "../../visitor/Visitor";
import {AppTemplate} from "./AppTemplate";

export class AppComponent extends Component{

    constructor(elementId : string) {
        super(elementId, new AppTemplate());

        this.addElement(new AnimationComponent("chart-animation1", "CO2 emission per country in million"));
        // this.addElement(new AnimationComponent("chart-animation2", "CO2 emission per country in million"));
        // this.addElement(new AnimationComponent("chart-animation3", "CO2 emission per country in million"));
    }

    protected events(): void {
    }

    accept(visitor: Visitor): void {
        throw Error("not yet implemented");
    }
}