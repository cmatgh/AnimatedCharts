import {Visitor} from "./Visitor";
import {AnimationChartUI} from "../AnimationChartUI";
import {AnimationUI} from "../AnimationUI";
import {UIButton} from "../UIButton";
import {UIElement} from "../UIElement";
import {LabelStyling} from "../decorator/LabelStyling";
import {LabelStylingDecorator} from "../decorator/LabelStylingDecorator";

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
        let curLabelStyling = this.labelStyling;
        let lastLabelStyling = null;

        while(curLabelStyling instanceof LabelStylingDecorator) {
            if(curLabelStyling === stylingDecorator) {

                if(lastLabelStyling != null) {
                    (<LabelStylingDecorator>lastLabelStyling).setLabelStyling(curLabelStyling.getLabelStyling());
                }else {
                    this.labelStyling = curLabelStyling.getLabelStyling();
                }
                curLabelStyling = curLabelStyling.getLabelStyling();
                stylingDecorator.setLabelStyling(null);
            } else {
                lastLabelStyling = curLabelStyling;
                curLabelStyling = curLabelStyling.getLabelStyling();
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

    visitAnimationCharUI(animationChartUI: AnimationChartUI): void {
        this.applyStyling(animationChartUI.getCheckLabelElement());
        this.applyStyling(animationChartUI.getSelectLabelElement());

        this.visitChildren(animationChartUI);
    }

    visitAnimationUI(animationUI: AnimationUI): void {
        this.applyStyling(animationUI.getTitleElement());
        this.applyStyling(animationUI.getPropertyElement());

        this.visitChildren(animationUI);
    }

    visitButton(button: UIButton): void {
        this.applyStyling(button.getJQueryElement());

        this.visitChildren(button);
    }

    private visitChildren(uiElement : UIElement) : void {
        uiElement.getElements().forEach( element => element.accept(this));
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