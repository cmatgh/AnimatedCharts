import {Command} from "../../../commands/Command";
import {AnimationView} from "../AnimationView";
import {AnimationPresenter} from "../AnimationPresenter";
import {Template} from "../../Template";
import {ButtonPresenterImpl} from "../../input/button/ButtonPresenterImpl";
import {ButtonViewImpl} from "../../input/button/ButtonViewImpl";
import {ButtonTemplate} from "../../input/button/ButtonTemplate";
import {ChartFactory} from "../../../utility/ChartFactory";
import {FrameDataSet} from "../../../animation/Animation";
import Chart from "chart.js";
import {FileDialogView} from "../../input/filedialog/FileDialogView";
import {FileDialogTemplate} from "../../input/filedialog/FileDialogTemplate";
import {SelectView} from "../../input/select/SelectView";
import {SelectTemplate} from "../../input/select/SelectTemplate";

export class AnimationViewImpl implements AnimationView {

    component: AnimationPresenter;
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

        this.addFileDialogButton(`load-dataset-button`, this.component.loadDataset.bind(this.component), "Choose File...");
        this.addControlButton(`start-button`, this.component.start.bind(this.component), "Start");
        this.addControlButton(`stop-button`, this.component.stop.bind(this.component), "Stop");
        this.addControlButton(`pause-button`, this.component.pause.bind(this.component), "Pause");
        this.addControlButton(`resume-button`, this.component.resume.bind(this.component), "Resume");
        this.addSelectInput("select-sort",
            this.component.sortBy.bind(this.component),
            "Sort by",
            new Map<string, string>([["Value", "value"],["Color", "color"], ["Label", "label"]]));
        this.addSelectInput("select-chart",
            type => {
                // @ts-ignore
                let tempConfig = jQuery.extend(true, {}, $("#chart").options);
                // @ts-ignore
                this.setChart(ChartFactory.getInstance().create(type, $("#chart")));
            },
            "Chart type",
            new Map<string, string>([["Bar", "bar"],["Pie", "pie"], ["Polar Area", "polarArea"], ["Doughnut", "doughnut"]]))
    }

    private addControlButton(id : string, command : Command, label: string) {
        const buttonView = new ButtonViewImpl(new ButtonTemplate());
        const buttonComponent = new ButtonPresenterImpl(buttonView);
        buttonComponent.setOnClick(command);
        buttonComponent.initialize();
        buttonComponent.setLabel(label);
        this.$element.find(`#${id}`).append(buttonComponent.getElement());
    }

    private addFileDialogButton(id : string, command : Command, label: string) {
        const buttonView = new FileDialogView(new FileDialogTemplate());
        const buttonComponent = new ButtonPresenterImpl(buttonView);
        buttonComponent.setOnChange(command);
        buttonComponent.initialize();
        buttonComponent.setLabel(label);
        this.$element.find(`#${id}`).append(buttonComponent.getElement());
    }

    private addSelectInput(id : string, command : Command, label: string, options : Map<string, string>) {
        const selectView = new SelectView(new SelectTemplate());
        const selectComponent = new ButtonPresenterImpl(selectView);
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

    setComponent(component: AnimationPresenter): void {
        this.component = component;
    }

    setTemplate(template: Template): void {
        if(this.getElement() != null) {
            this.getElement().off("click");
        }

        this.template = template;
        this.$element = $(template.html());
    }

    setChart(chart: Chart): void {
        let data = this.chart.data;
        this.chart.destroy();
        this.chart = chart;
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
