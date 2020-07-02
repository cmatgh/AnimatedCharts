import {AnimationView} from "../AnimationView";
import {AnimationPresenter} from "../AnimationPresenter";
import {Template} from "../../Template";
import {ButtonPresenter} from "../../input/button/ButtonPresenter";
import {ButtonView} from "../../input/button/ButtonView";
import {ChartFactory} from "../../../utility/creating/ui/ChartFactory";
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
import {PresenterCreator} from "../../../utility/creating/ui/PresenterCreator";
import {UIElementFactory} from "../../../utility/creating/ui/UIElementFactory";
import {SelectPresenter} from "../../input/select/SelectPresenter";

export class AnimationViewImpl implements AnimationView {

    presenter: AnimationPresenter;
    template : Template;
    $element : JQuery;
    chart: Chart;

    initialize() {
        this.chart = this.chart = ChartFactory.getInstance()
             .create("bar", <HTMLCanvasElement> this.$element.find(`#chart`).get(0));

        const elementFactory = new UIElementFactory();
        const presenterCreator = new PresenterCreator();

        // File Dialog
        const fileDialogButtonPresenter = <ButtonPresenter> presenterCreator.create(new ButtonPresenter(), new FileDialogView(), new FileDialogTemplate());
        const fileDialogCommand = new ParseFileCommand(this.presenter);
        fileDialogButtonPresenter.setOnChange(fileDialogCommand);
        fileDialogButtonPresenter.setLabel("Choose File...");
        this.$element.find(`#load-dataset-button`).append(fileDialogButtonPresenter.getElement());

        // Resume Pause Control
        const resumePauseButtonPresenter = <ButtonPresenter> presenterCreator.create(new ButtonPresenter(), new ButtonView(), new ResumeButtonTemplate());
        const resumePauseCommand = new ResumePauseCommand(this.presenter, <ButtonView> resumePauseButtonPresenter.getView());
        resumePauseButtonPresenter.setOnClick(resumePauseCommand);
        this.$element.find(`#start-pause-button`).append(resumePauseButtonPresenter.getElement());

        // Sort Selection
        const sortSelectionPresenter =  elementFactory.createElement<SelectPresenter>("select")
        sortSelectionPresenter.setOnSelect(new SelectSortCommand(this.presenter));
        sortSelectionPresenter.setLabel("Sort by");
        sortSelectionPresenter.addOption("Value", "value");
        sortSelectionPresenter.addOption("Color", "color");
        sortSelectionPresenter.addOption("Label", "label");
        this.$element.find(`#select-sort`).append(sortSelectionPresenter.getElement());

        // Reverse Checkbox
        const checkboxPresenter = <ButtonPresenter> presenterCreator.create(new ButtonPresenter(), new CheckboxView(), new CheckboxTemplate());
        const reverseSortCommand = new ReverseSortCommand(this.presenter);
        const checkboxCommand = new CheckboxCommand(reverseSortCommand, reverseSortCommand);
        checkboxPresenter.setOnClick(checkboxCommand);
        checkboxPresenter.setLabel("reverse");
        this.$element.find(`#checkbox-reverse`).append(checkboxPresenter.getElement());

        // Chart Selection
        const charSelectionPresenter = elementFactory.createElement<SelectPresenter>("select");
        charSelectionPresenter.setOnSelect(new SelectChartCommand(this.presenter));
        charSelectionPresenter.setLabel("Chart type");
        charSelectionPresenter.addOption("Bar", "bar");
        charSelectionPresenter.addOption("Pie", "pie");
        charSelectionPresenter.addOption("Polar Area", "polarArea");
        charSelectionPresenter.addOption("Doughnut", "doughnut");
        this.$element.find(`#select-chart`).append(charSelectionPresenter.getElement());
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

    setPresenter(presenter: AnimationPresenter): void {
        this.presenter = presenter;
    }

    setTemplate(template: Template): void {
        if(this.getElement() != null) {
            this.getElement().off("click");
        }

        this.template = template;
        this.$element = $(template.html());
    }

    getTemplate(): Template {
        return this.template;
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
