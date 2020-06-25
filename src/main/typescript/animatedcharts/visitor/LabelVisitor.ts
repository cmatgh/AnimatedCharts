import {Visitor} from "./Visitor";
import {LabelStyling} from "../decorator/LabelStyling";
import {LabelStylingDecorator} from "../decorator/LabelStylingDecorator";
import {ChartComponent} from "../ui/chart/ChartComponent";
import {AnimationComponent} from "../ui/animation/AnimationComponent";
import {ButtonComponent} from "../ui/button/ButtonComponent";
import {Component} from "../ui/Component";

export class LabelVisitor implements Visitor{

    private labelStyling : LabelStyling;

    getLabelStyling() : LabelStyling {
        return this.labelStyling;
    }

    constructor() {
        this.labelStyling = null;
    }

    addDecorator(stylingDecorator : LabelStylingDecorator) : void {
        this.checkHasNotDecorator(stylingDecorator);

        stylingDecorator.setLabelStyling(this.labelStyling);
        this.labelStyling = stylingDecorator;
    }

    removeDecorator(stylingDecorator : LabelStylingDecorator) : void {
        let curDecorator = this.labelStyling;
        let prevDecorator = null;

        while(curDecorator instanceof LabelStylingDecorator) {
            let nextDecorator = <LabelStylingDecorator> curDecorator.getLabelStyling();

            if(curDecorator === stylingDecorator) {
                if(prevDecorator != null) {
                    prevDecorator.setLabelStyling(nextDecorator);
                }else {
                    this.labelStyling = nextDecorator;
                }
                curDecorator = nextDecorator;
                stylingDecorator.setLabelStyling(null);
            } else {
                prevDecorator = curDecorator;
                curDecorator = nextDecorator;
            }

        }
    }

    hasDecorator(stylingDecorator: LabelStylingDecorator) : boolean {
        let curLabelStyling = this.labelStyling;
        while(curLabelStyling != null && curLabelStyling instanceof LabelStylingDecorator) {
            if(stylingDecorator === curLabelStyling) {
                return true;
            }
            curLabelStyling = <LabelStylingDecorator>curLabelStyling.getLabelStyling();
        }
        return false;
    }

    visitAnimationCharUI(animationChartUI: ChartComponent): void {
        this.applyStyling(animationChartUI.getCheckLabelElement());
        this.applyStyling(animationChartUI.getSelectLabelElement());

        this.visitChildren(animationChartUI);
    }

    visitAnimationUI(animationUI: AnimationComponent): void {
        this.applyStyling(animationUI.getTitleElement());
        this.applyStyling(animationUI.getPropertyElement());
        this.applyStyling(animationUI.getControlLabelElement());
        this.applyStyling(animationUI.getDecoratorsLabelElement());
        this.applyStyling(animationUI.getDataLabelElement());

        this.visitChildren(animationUI);
    }

    visitButton(button: ButtonComponent): void {
        this.applyStyling(button.getJQueryElement());

        this.visitChildren(button);
    }

    private visitChildren(uiElement : Component) : void {
      //  uiElement.g().forEach( element => element.accept(this));
    }

    private applyStyling(element : JQuery) : void {
        const label = this.getLeafContent(element);
        if(this.labelStyling != null) {
            element.html(this.labelStyling.apply(label));
        }else {
            element.html(label);
        }

    }

    private getLeafContent(element : JQuery) : string{
        let curElement = element;
        while(curElement.children().length > 0) {

            if(curElement.children().length > 1) {
                throw new Error("There should only be one leaf");
            }
            curElement = curElement.children().first();
        }
        return element.text();
    }

    private checkHasNotDecorator(stylingDecorator: LabelStylingDecorator) {
        if(this.hasDecorator(stylingDecorator)) {
            throw Error("Decorator already exists");
        }
    }
}