import {Visitor} from "./Visitor";
import {AnimationChartUI} from "../AnimationChartUI";
import {AnimationUI} from "../AnimationUI";
import {UIButton} from "../UIButton";
import {UIElement} from "../UIElement";

export class LabelVisitor implements Visitor{

    private classes : Set<string>

    public getClasses() : string[] {
        return Array.from(this.classes);
    }

    public addClass(clazz: string) : void {
        this.classes.add(clazz);
    }

    public removeClass(clazz: string) : void {
        this.classes.delete(clazz);
    }

    public clearClasses() : void {
        this.classes = new Set<string>();
    }

    constructor(classes : Set<string>) {
        this.classes = classes;
    }

    visitAnimationCharUI(animationChartUI: AnimationChartUI): void {
        this.applyDecorator(animationChartUI.getJQueryElement().find(`#chart-sort-check-label_${animationChartUI.getId()}`));
        this.applyDecorator(animationChartUI.getJQueryElement().find(`#chart-sort-select_${animationChartUI.getId()}`));

        this.visitChildren(animationChartUI);
    }

    visitAnimationUI(animationUI: AnimationUI): void {
        this.applyDecorator(animationUI.getJQueryElement().find(`#title_${animationUI.getId()}`));
        this.applyDecorator(animationUI.getJQueryElement().find(`#property_${animationUI.getId()}`));

        this.visitChildren(animationUI);
    }

    visitButton(button: UIButton): void {
        this.applyDecorator(button.getJQueryElement());

        this.visitChildren(button);
    }

    private visitChildren(uiElement : UIElement) : void {
        uiElement.getElements().forEach( element => element.accept(this));
    }

    private applyDecorator(element : JQuery) : void {
        element.removeClass(this.readActiveDecoratorClasses(element));
        element.addClass(Array.from(this.classes));
        this.addActiveDecoratorClasses(element);
    }

    private readActiveDecoratorClasses(element : JQuery) : string[] {
        const attr = element.attr("decoratorClasses");
        if(attr) {
            return attr.split(" ");
        }
        return [];
    }

    private addActiveDecoratorClasses(element : JQuery) : void {
        element.attr("decoratorClasses", Array.from(this.classes).join(" "));
    }

}