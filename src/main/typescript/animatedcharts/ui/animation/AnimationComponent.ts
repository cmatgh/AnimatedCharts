import { Animation } from "../../animation/Animation";
import {ChartComponent} from "../chart/ChartComponent";
import {Component} from "../Component";
import {Observer} from "../../animation/Observer";
import {ButtonComponent} from "../button/ButtonComponent";
import {OpenFileDialogCommand} from "../../commands/OpenFileDialogCommand";
import {StartAnimatonCommand} from "../../commands/StartAnimatonCommand";
import {StopAnimationCommand} from "../../commands/StopAnimationCommand";
import {PauseAnimationCommand} from "../../commands/PauseAnimationCommand";
import {ResumeAnimationCommand} from "../../commands/ResumeAnimationCommand";
import {Visitor} from "../../visitor/Visitor";
import {ApplyDecoratorCommand} from "../../commands/ApplyDecoratorCommand";
import {LabelVisitor} from "../../visitor/LabelVisitor";
import {Command} from "../../commands/Command";
import {AnimationTemplate} from "./AnimationTemplate";

export class AnimationComponent extends Component{

    private readonly title : string;
    private readonly animation: Animation;

    getTitleElement() : JQuery {
        return this.$element.find(`#title_${this.getId()}`);
    }

    getPropertyElement() : JQuery {
        return this.$element.find(`#property_${this.getId()}`);
    }

    getDecoratorsLabelElement() : JQuery {
        return this.$element.find(`#decorators-label_${this.getId()}`);
    }

    getControlLabelElement() : JQuery {
        return this.$element.find(`#control-label_${this.getId()}`);
    }

    getDataLabelElement() : JQuery {
        return this.$element.find(`#data-label_${this.getId()}`);
    }

    constructor(elementId : string, title: string) {
        super(elementId, new AnimationTemplate());

        this.title = title;
        this.animation = new Animation(window);

        this.animation.register(new AnimationComponent.YearObserver(this.animation, this.$element));

        this.addChart(`bar-chart`, "bar", this.animation);
        this.addChart(`doughnut-chart`, "doughnut", this.animation);
        this.addChart(`pie-chart`, "pie", this.animation);
        this.addChart(`polarArea-chart`, "polarArea", this.animation);

        this.addControlButton(`load-dataset-button`, "Load Dataset", new OpenFileDialogCommand(this.animation));
        this.addControlButton(`start-button`, "Start", new StartAnimatonCommand(this.animation));
        this.addControlButton(`stop-button`, "Stop", new StopAnimationCommand(this.animation));
        this.addControlButton(`pause-button`, "Pause", new PauseAnimationCommand(this.animation));
        this.addControlButton(`resume-button`, "Resume", new ResumeAnimationCommand(this.animation));
        //
        // const labelVisitor = new LabelVisitor();
        // this.addDecoratorButton(`bold-decorator-button_${this.getId()}`, "Bold", "b", labelVisitor);
        // this.addDecoratorButton(`underline-decorator-button_${this.getId()}`, "Underline", "u", labelVisitor);
        // this.addDecoratorButton(`small-decorator-button_${this.getId()}`, "Small", "small", labelVisitor);
        // this.addDecoratorButton(`italicized-decorator-button_${this.getId()}`, "Italic", "em", labelVisitor);

        this.$element.find(`#title_${this.getId()}`).html(this.title);
    }

    private addChart(id : string, type: string, animation : Animation) {
        const chartComponent = new ChartComponent(id, type, animation);
        this.addElement(chartComponent);
        this.animation.register(chartComponent.getAnimationObject())
    }

    private addControlButton(id : string, label: string, command : Command) {
        const buttonComponent = new ButtonComponent(id, label, command);
        this.addElement(buttonComponent);
    }

    private addDecoratorButton(id : string, label: string, nodeType: string, labelVisitor : LabelVisitor) {
        const decorator = new ApplyDecoratorCommand(nodeType, labelVisitor, this);
        const buttonComponent = new ButtonComponent(id, label, decorator);
        this.addElement(buttonComponent);
    }

    accept(visitor: Visitor): void {
        visitor.visitAnimationUI(this);
    }

    private static YearObserver = class implements Observer {

        private animation: Animation;
        private $element: JQuery;

        constructor(animation: Animation, $element: JQuery) {
            this.animation = animation;
            this.$element = $element;
            this.update();
        }

        update(): void {
            this.$element
                .find(`[id^='property_']`)
                .html(this.animation.getCurrentColumnProperty());
        }

    }

}
