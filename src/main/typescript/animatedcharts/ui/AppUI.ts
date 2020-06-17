import { AnimationUI } from "./AnimationUI";
import {UIElement} from "./UIElement";
import {Visitor} from "./visitor/Visitor";

export class AppUI extends UIElement{

    protected html(): string {
        return `
                <div>
                    <div id="chart-animation1"></div>
                    <div id="chart-animation2"></div>
                    <div id="chart-animation3"></div>
                </div>
               
            `;
    }

    protected events(): void {
    }

    constructor(elementId : string) {
        super(elementId);

        this.addElement(new AnimationUI("chart-animation1", "CO2 emission per country in million"));
        this.addElement(new AnimationUI("chart-animation2", "CO2 emission per country in million"));
        this.addElement(new AnimationUI("chart-animation3", "CO2 emission per country in million"));

        this.drawElements();
    }

    accept(visitor: Visitor): void {
        throw Error("not yet implemented");
    }

    getJQueryElement(): JQuery {
        return this.$element;
    }

}