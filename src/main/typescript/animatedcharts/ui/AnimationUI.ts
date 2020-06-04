import { Animation, DataObject } from "../animation/Animation";
import {AnimationChartUI} from "./AnimationChartUI";
import {UIElement} from "./UIElement";
import {Observer} from "../animation/Observer";
import {UIButton} from "./UIButton";
import {OpenFileDialogCommand} from "./command/OpenFileDialogCommand";
import {StartAnimatonCommand} from "./command/StartAnimatonCommand";
import {StopAnimationCommand} from "./command/StopAnimationCommand";
import {PauseAnimationCommand} from "./command/PauseAnimationCommand";
import {ResumeAnimationCommand} from "./command/ResumeAnimationCommand";
import {Command} from "./command/Command";

export class AnimationUI extends UIElement{

    protected html(): string {
        return `
            <div class="container">
                <div class="row justify-content-center" >  
                    <h1 id="title_${this.id}"></h1>
                    <h2 class="display-2" id="property_${this.id}"></h2>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div id="animation-buttons_${this.id}">              
                        </div>
                    </div>
                    <div class="col-md-10">
                        <div id="animation-content_${this.id}">                    
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
    private animationObjectUIs: Set<AnimationChartUI>;
    private openFileButton: UIButton;

    constructor(title: string) {
        super();

        this.title = title;
        this.animation = new Animation(window);
        this.animationObjectUIs = new Set<AnimationChartUI>();

        const yearObserver : Observer = this.createPropertyObserver();
        this.animation.register(yearObserver);

        this.addChart("bar");
        this.addChart("doughnut");
        this.addChart("pie");
        this.addChart("polarArea");

        this.createButton("Load Dataset", new OpenFileDialogCommand(this.animation));
        this.createButton("Start", new StartAnimatonCommand(this.animation));
        this.createButton("Stop", new StopAnimationCommand(this.animation));
        this.createButton("Pause", new PauseAnimationCommand(this.animation));
        this.createButton("Resume", new ResumeAnimationCommand(this.animation));

        this.updateUI();
    }

    private createPropertyObserver(): Observer {
        return new (class implements Observer {

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

        })(this.animation, this.$element);
    }

    private createButton(label: string, command: Command) {
        let button = new UIButton(label, command);
        let $row = $("<div></div>");
        $row.addClass("row");
        $row.addClass("m-1");
        $row.append(button.getJQueryElement());
        this.$element.find(`#animation-buttons_${this.id}`).append($row);
    }

    updateUI() {
        this.$element.find(`#title_${this.id}`).html(this.title);
    }

    getJQueryElement(): JQuery {
        return this.$element;
    }

    addChart(type: string) {
        const animationObjectUI = new AnimationChartUI(type, this.animation);
        this.findNextCol()
            .append(animationObjectUI.getJQueryElement());

        this.animationObjectUIs.add(animationObjectUI);
        this.animation.register(animationObjectUI.getAnimationObject());

    }

    private findNextCol() : JQuery {
        const rowId = Math.floor(this.animationObjectUIs.size / 2);

        if(!this.hasRowSpace(this.animationObjectUIs.size)){
            this.$element
                .find(`#animation-content_${this.id}`)
                .append(this.buildRow(rowId));
        }

        const $row = this.getRow(rowId)
        const $col = $(`<div class="col"></div>`);
        $row.append($col);

        return $col;
    }

    private hasRowSpace(chartCount: number) : boolean {
        // if even it means that the chart is on a new row, so there is no available space
        if(chartCount % 2 == 0) {
            return false
        }
        return true;
    }

    private buildRow(rowId: number) : JQuery {
        return $(`<div class="row" id="chart_${this.id}-row_${rowId}"></div>`);
    }

    private getRow(rowId: number) : JQuery {
        return this.$element.find(`#chart_${this.id}-row_${rowId}`);
    }


}