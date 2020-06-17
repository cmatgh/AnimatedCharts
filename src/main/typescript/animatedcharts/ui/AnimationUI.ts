import { Animation } from "../animation/Animation";
import {AnimationChartUI} from "./AnimationChartUI";
import {UIElement} from "./UIElement";
import {Observer} from "../animation/Observer";
import {UIButton} from "./UIButton";
import {OpenFileDialogCommand} from "./command/OpenFileDialogCommand";
import {StartAnimatonCommand} from "./command/StartAnimatonCommand";
import {StopAnimationCommand} from "./command/StopAnimationCommand";
import {PauseAnimationCommand} from "./command/PauseAnimationCommand";
import {ResumeAnimationCommand} from "./command/ResumeAnimationCommand";
import {Visitor} from "./visitor/Visitor";
import {ApplyDecoratorCommand} from "./command/ApplyDecoratorCommand";
import {LabelVisitor} from "./visitor/LabelVisitor";

export class AnimationUI extends UIElement{

    protected html(): string {
        return `
            <div class="container">
                <div class="row justify-content-center border-bottom mb-3" >  
                    <h1 id="title_${this.id}"></h1>
                    <h2 class="display-2" id="property_${this.id}"></h2>
                </div>
                <div class="row">
                    <div class="col-md-2 border-right">
                        <div class="row">
                            <div class="col-md-12">
                                 <div id="animation-buttons_${this.id}"  class="d-flex flex-column">    
                                    <h3 class="border-bottom pb-2" id="data-label_${this.id}">Data:</h3> 
                                    <div id="load-dataset-button_${this.id}"></div>               
                                </div>
                            </div> 
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <div id="animation-buttons_${this.id}"  class="d-flex flex-column">    
                                    <h3 class="border-bottom pb-2" id="control-label_${this.id}">Control:</h3> 
                                    <div id="load-dataset-button_${this.id}"></div>         
                                    <div id="start-button_${this.id}"></div>         
                                    <div id="stop-button_${this.id}"></div>         
                                    <div id="resume-button_${this.id}"></div>         
                                    <div id="pause-button_${this.id}"></div>         
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <div id="decorator-buttons_${this.id}" class="d-flex flex-column">     
                                    <h3 class="border-bottom pb-2" id="decorators-label_${this.id}">Decorators:</h3>
                                    <div id="bold-decorator-button_${this.id}"></div>         
                                    <div id="underline-decorator-button_${this.id}"></div>         
                                    <div id="small-decorator-button_${this.id}"></div>             
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div class="col-md-10">
                        <div id="animation-content_${this.id}">    
                            <div class="row">
                                <div class="col-md-6">
                                    <div id="bar-chart_${this.id}"></div>         
                                </div>
                                <div class="col-md-6">
                                    <div id="doughnut-chart_${this.id}"></div>   
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div id="pie-chart_${this.id}"></div>         
                                </div>
                                <div class="col-md-6">
                                    <div id="polarArea-chart_${this.id}"></div>           
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    protected events(): void {

    }

    private title : string;
    private animation: Animation;

    getTitleElement() : JQuery {
        return this.$element.find(`#title_${this.id}`);
    }

    getPropertyElement() : JQuery {
        return this.$element.find(`#property_${this.id}`);
    }

    getDecoratorsLabelElement() : JQuery {
        return this.$element.find(`#decorators-label_${this.id}`);
    }

    getControlLabelElement() : JQuery {
        return this.$element.find(`#control-label_${this.id}`);
    }

    getDataLabelElement() : JQuery {
        return this.$element.find(`#data-label_${this.id}`);
    }

    constructor(elementId : string, title: string) {
        super(elementId);

        this.title = title;
        this.animation = new Animation(window);

        this.animation.register(new AnimationUI.YearObserver(this.animation, this.$element));

        this.addElement(new AnimationChartUI(`bar-chart_${this.id}`, "bar", this.animation));
        this.addElement(new AnimationChartUI(`doughnut-chart_${this.id}`, "doughnut", this.animation));
        this.addElement(new AnimationChartUI(`pie-chart_${this.id}`, "pie", this.animation));
        this.addElement(new AnimationChartUI(`polarArea-chart_${this.id}`, "polarArea", this.animation));

        this.addElement(new UIButton(`load-dataset-button_${this.id}`, "Load Dataset", new OpenFileDialogCommand(this.animation)));
        this.addElement(new UIButton(`start-button_${this.id}`, "Start", new StartAnimatonCommand(this.animation)));
        this.addElement(new UIButton(`stop-button_${this.id}`, "Stop", new StopAnimationCommand(this.animation)));
        this.addElement(new UIButton(`pause-button_${this.id}`, "Pause", new PauseAnimationCommand(this.animation)));
        this.addElement(new UIButton(`resume-button_${this.id}`, "Resume", new ResumeAnimationCommand(this.animation)));

        const labelVisitor = new LabelVisitor();
        this.addElement(new UIButton(`bold-decorator-button_${this.id}`, "Bold", new ApplyDecoratorCommand("b", labelVisitor, this)));
        this.addElement(new UIButton(`underline-decorator-button_${this.id}`, "Underline", new ApplyDecoratorCommand("u", labelVisitor, this)));
        this.addElement(new UIButton(`small-decorator-button_${this.id}`, "Small", new ApplyDecoratorCommand("small", labelVisitor, this)));

        Array.from(this.childUIElements)
            .filter(child => child instanceof AnimationChartUI)
            .map(child => <AnimationChartUI> child)
            .forEach(child => this.animation.register(child.getAnimationObject()));

        this.$element.find(`#title_${this.id}`).html(this.title);
    }

    getJQueryElement(): JQuery {
        return this.$element;
    }

    //TODO
    // extract to own class
    //
    // private findNextCol(size : number) : JQuery {
    //     const rowId = Math.floor(size / 2);
    //
    //     if(!this.hasRowSpace(size)){
    //         this.$element
    //             .find(`#animation-content_${this.id}`)
    //             .append(this.buildRow(rowId));
    //     }
    //
    //     const $row = this.getRow(rowId)
    //     const $col = $(`<div class="col"></div>`);
    //     $row.append($col);
    //
    //     return $col;
    // }
    //
    // private hasRowSpace(chartCount: number) : boolean {
    //     // if even it means that the chart is on a new row, so there is no available space
    //     return chartCount % 2 != 0;
    // }
    //
    // private buildRow(rowId: number) : JQuery {
    //     return $(`<div class="row" id="chart_${this.id}-row_${rowId}"></div>`);
    // }
    //
    // private getRow(rowId: number) : JQuery {
    //     return this.$element.find(`#chart_${this.id}-row_${rowId}`);
    // }

    accept(visitor: Visitor): void {
        visitor.visitAnimationUI(this);
    }

    private static YearObserver = class implements Observer {

            private animation: Animation;
            private $element: JQuery;

            constructor(animation: Animation, $element: JQuery) {
                this.animation = animation;
                this.$element = $element;
                this.setPropertyValue();
            }

            update(): void {
                this.setPropertyValue();
            }

            private setPropertyValue() {
                this.$element.find(`[id^='property_']`).html(this.animation.getCurrentColumnProperty());
            }

    }

}
