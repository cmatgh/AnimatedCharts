import {Command} from "../../../commands/Command";
import {AnimationView} from "../AnimationView";
import {AnimationPresenter} from "../AnimationPresenter";
import {Template} from "../../Template";
import {ButtonPresenter} from "../../input/button/ButtonPresenter";
import {ButtonView} from "../../input/button/ButtonView";
import {ChartFactory} from "../../../utility/ChartFactory";
import {FrameDataSet} from "../../../animation/Animation";
import Chart from "chart.js";
import {FileDialogView} from "../../input/filedialog/FileDialogView";
import {FileDialogTemplate} from "../../input/filedialog/FileDialogTemplate";
import {SelectView} from "../../input/select/SelectView";
import {SelectTemplate} from "../../input/select/SelectTemplate";
import {ParseFileCommand} from "../../../commands/ParseFileCommand";
import {ResumePauseCommand} from "../../../commands/ResumePauseCommand";
import {ResumeButtonTemplate} from "../../input/button/templates/ResumeButtonTemplate";
import {SelectSortCommand} from "../../../commands/SelectSortCommand";
import {SelectChartCommand} from "../../../commands/SelectChartCommand";
import {CheckboxTemplate} from "../../input/checkbox/CheckboxTemplate";
import {CheckboxCommand} from "../../../commands/CheckboxCommand";
import {ReverseSortCommand} from "../../../commands/ReverseSortCommand";
import {CheckboxView} from "../../input/checkbox/CheckboxView";

export class AnimationViewImpl implements AnimationView {

    presenter: AnimationPresenter;
    template : Template;
    $element : JQuery;
    chart: Chart;

    constructor(template : Template) {
        this.setTemplate(template);
    }

    initialize() {
        this.chart = this.chart = ChartFactory
             .getInstance()
             .create("bar", <HTMLCanvasElement> this.$element.find(`#chart`).get(0));

        // File Dialog
        const fileDialogButtonView = new FileDialogView(new FileDialogTemplate());
        const fileDialogButtonPresenter = new ButtonPresenter(fileDialogButtonView)
        const fileDialogCommand = new ParseFileCommand(this.presenter);
        fileDialogButtonPresenter.initialize();
        fileDialogButtonPresenter.setOnChange(fileDialogCommand);
        fileDialogButtonPresenter.setLabel("Choose File...");
        this.$element.find(`#load-dataset-button`).append(fileDialogButtonPresenter.getElement());

        // Resume Pause Control
        const resumePauseButtonView = new ButtonView(new ResumeButtonTemplate());
        const resumePauseButtonPresenter = new ButtonPresenter(resumePauseButtonView);
        const resumePauseCommand = new ResumePauseCommand(this.presenter.getAnimation(), resumePauseButtonView);
        resumePauseButtonPresenter.initialize();
        resumePauseButtonPresenter.setOnClick(resumePauseCommand);
        this.$element.find(`#start-pause-button`).append(resumePauseButtonPresenter.getElement());

        // Sort Selection
        this.addSelectInput("select-sort",
            new SelectSortCommand(this.presenter),
            "Sort by",
            new Map<string, string>([["Value", "value"],["Color", "color"], ["Label", "label"]]));

        // Reverse Checkbox
        const checkboxView = new CheckboxView(new CheckboxTemplate());
        const checkboxPresenter = new ButtonPresenter(checkboxView);
        const reverseSortCommand = new ReverseSortCommand(this.presenter);
        const checkboxCommand = new CheckboxCommand(reverseSortCommand, reverseSortCommand);
        checkboxPresenter.initialize();
        checkboxPresenter.setOnClick(checkboxCommand);
        checkboxPresenter.setLabel("reverse");
        this.$element.find(`#checkbox-reverse`).append(checkboxPresenter.getElement());

        // Chart Selection
        this.addSelectInput("select-chart",
            new SelectChartCommand(this),
            "Chart type",
            new Map<string, string>([["Bar", "bar"],["Pie", "pie"], ["Polar Area", "polarArea"], ["Doughnut", "doughnut"]]))
    }

    private addSelectInput(id : string, command : Command, label: string, options : Map<string, string>) {
        const selectView = new SelectView(new SelectTemplate());
        const selectComponent = new ButtonPresenter(selectView);
        selectComponent.setOnSelect(command);
        selectComponent.initialize();
        selectView.setLabel(label);
        options.forEach((value, key) => {
            selectView.addOption(key, value);
        })
        this.$element.find(`#${id}`).append(selectComponent.getElement());
    }

    setProperty(property : string) : void {
        this.$element
            .find(`#property`)
            .html(property);
    }

    setTitle(title: string): void {
        this.$element.find(`#title`).html(title);
    }

    getElement(): any {
        return this.$element;
    }

    setComponent(presenter: AnimationPresenter): void {
        this.presenter = presenter;
    }

    setTemplate(template: Template): void {
        if(this.getElement() != null) {
            this.getElement().off("click");
        }

        this.template = template;
        this.$element = $(template.html());
    }

    setChart(type: string): void {
        let data = this.chart.data;
        this.chart.destroy();
        this.chart = ChartFactory.getInstance().create(type, <HTMLCanvasElement> $("#chart").get(0));
        this.setChartData(data.labels.map(value => value.toString()),
            // @ts-ignore
            data.datasets[0].backgroundColor,
            data.datasets[0].data,
            0);
    }

    updateChart(dataSets: FrameDataSet[]): void {
        this.setChartData(dataSets.map( set => set.label),
            dataSets.map( set => `rgba(${set.color[0]},${set.color[1]},${set.color[2]})`),
            dataSets.map( set => set.value),
            1000);
    }

    private setChartData(labels : string[], colors : string[], dataSets : number[], duration: number) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].backgroundColor = colors;
        this.chart.data.datasets[0].data = dataSets;
        this.chart.update(duration);
    }
}
