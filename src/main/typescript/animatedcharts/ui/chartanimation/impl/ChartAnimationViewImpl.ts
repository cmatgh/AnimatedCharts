import {ChartAnimationView} from "../ChartAnimationView";
import {ChartAnimationPresenter} from "../ChartAnimationPresenter";
import {Template} from "../../../interfaces/Template";
import {ChartFactory} from "../../../utility/creating/ui/ChartFactory";
import Chart from "chart.js";
import {ParseFileCommand} from "../../../commands/ParseFileCommand";
import {ResumePauseCommand} from "../../../commands/ResumePauseCommand";
import {ResumeButtonTemplate} from "../../components/button/templates/ResumeButtonTemplate";
import {SelectSortCommand} from "../../../commands/SelectSortCommand";
import {SelectChartCommand} from "../../../commands/SelectChartCommand";
import {ReverseSortCommand} from "../../../commands/ReverseSortCommand";
import {NumberFormatter} from "../../../utility/formatting/NumberFormatter";
import {IntegerNumberFormat} from "../../../utility/formatting/IntegerNumberFormat";
import {NumberFormatDecoratorCommand} from "../../../commands/NumberFormatDecoratorCommand";
import {IntegerMillePointFormat} from "../../../utility/formatting/IntegerMillePointFormat";
import {IntegerMilleSpaceFormat} from "../../../utility/formatting/IntegerMilleSpaceFormat";
import {UnitDecoratorCommand} from "../../../commands/UnitDecoratorCommand";
import {PropertyNumberFormatDecorator} from "../../../utility/decorating/PropertyNumberFormatDecorator";
import {AppendPropertyDecorator} from "../../../utility/decorating/AppendPropertyDecorator";
import {TagWrapperPropertyFrameDataDecorator} from "../../../utility/decorating/TagWrapperPropertyFrameDataDecorator";
import {TagWrapperCommand} from "../../../commands/TagWrapperCommand";
import {CheckboxInlineTemplate} from "../../components/checkbox/templates/CheckboxInlineTemplate";
import {FrameData} from "../../../animation/data/FrameData";
import {RangeCommand} from "../../../commands/RangeCommand";
import {Button} from "../../components/button/Button";
import {Checkbox} from "../../components/checkbox/Checkbox";
import {Select} from "../../components/select/Select";
import {FileDialog} from "../../components/filedialog/FileDialog";
import {Range} from "../../components/range/Range";
import {TemplateFactory} from "../../../utility/creating/ui/TemplateFactory";

export class ChartAnimationViewImpl extends ChartAnimationView {

    template : Template;
    $element : JQuery;
    chart: Chart;

    fileDialog : FileDialog;
    resumePauseButton: Button;
    frameRange : Range;
    sortSelect : Select;
    reverseCheckbox : Checkbox;
    chartSelect : Select;
    numberPropertySelect : Select;
    unitPropertySelect : Select;
    italicCheckbox : Checkbox;
    boldCheckbox : Checkbox;
    smallCheckbox : Checkbox;

    doInitialize() {
        this.chart = this.chart = ChartFactory.getInstance()
             .create("bar", <HTMLCanvasElement> this.$element.find(`#chart`).get(0));

        // File Dialog
        this.fileDialog = new FileDialog(TemplateFactory.getInstance());
        this.fileDialog.initialize();
        this.fileDialog.setCommand("change", new ParseFileCommand(this.presenter as ChartAnimationPresenter));
        this.fileDialog.setLabel("Choose File...")
        this.addComponent(`#load-dataset-button`, this.fileDialog);

        // Resume Pause Control
        this.resumePauseButton = new Button(TemplateFactory.getInstance());
        this.resumePauseButton.setTemplate(new ResumeButtonTemplate());
        this.resumePauseButton.initialize();
        this.resumePauseButton.setCommand("click", new ResumePauseCommand(this.presenter as ChartAnimationPresenter , this.resumePauseButton));
        this.addComponent(`#start-pause-button`, this.resumePauseButton);

        // Frame Range
        this.frameRange = new Range(TemplateFactory.getInstance());
        this.frameRange.initialize();
        this.frameRange.setLabel("");
        this.frameRange.setCommand("change", new RangeCommand(this.presenter as ChartAnimationPresenter));
        this.frameRange.setMin(0);
        this.frameRange.setMax(1);
        this.frameRange.setStep(1);
        this.addComponent("#frame-range", this.frameRange);

        // Sort Selection
        this.sortSelect = new Select(TemplateFactory.getInstance());
        this.sortSelect.initialize();
        this.sortSelect.setCommand("select", new SelectSortCommand(this.presenter as ChartAnimationPresenter));
        this.sortSelect.setLabel("Sort by");
        this.sortSelect.addOption("value", "Value");
        this.sortSelect.addOption("color", "Color");
        this.sortSelect.addOption("label", "Label");
        this.addComponent(`#select-sort`, this.sortSelect);

        // Reverse Checkbox
        this.reverseCheckbox = new Checkbox(TemplateFactory.getInstance());
        this.reverseCheckbox.initialize();
        this.reverseCheckbox.setCommand("click", new ReverseSortCommand(this.presenter as ChartAnimationPresenter));
        this.reverseCheckbox.setLabel("reverse");
        this.addComponent(`#checkbox-reverse`, this.reverseCheckbox);

        // Chart Selection
        this.chartSelect = new Select(TemplateFactory.getInstance());
        this.chartSelect.initialize();
        this.chartSelect.setCommand("select", new SelectChartCommand(this.presenter as ChartAnimationPresenter));
        this.chartSelect.setLabel("Chart type");
        this.chartSelect.addOption("bar", "Bar" );
        this.chartSelect.addOption("pie", "Pie");
        this.chartSelect.addOption("polarArea", "Polar Area");
        this.chartSelect.addOption("doughnut", "Doughnut");
        this.addComponent(`#select-chart`, this.chartSelect);

        // Property Number Decorator
        this.numberPropertySelect = new Select(TemplateFactory.getInstance());
        this.numberPropertySelect.initialize();
        const propertyNumberFormatDecorator = new PropertyNumberFormatDecorator(IntegerNumberFormat.IDENTIFIER);
        this.numberPropertySelect.setCommand("select", new NumberFormatDecoratorCommand(this.presenter as ChartAnimationPresenter, propertyNumberFormatDecorator));
        this.numberPropertySelect.setLabel("Number format");
        this.numberPropertySelect.addOption(IntegerNumberFormat.IDENTIFIER, NumberFormatter.format("1611,32", IntegerNumberFormat.IDENTIFIER));
        this.numberPropertySelect.addOption(IntegerMillePointFormat.IDENTIFIER, NumberFormatter.format("1611,32", IntegerMillePointFormat.IDENTIFIER));
        this.numberPropertySelect.addOption(IntegerMilleSpaceFormat.IDENTIFIER, NumberFormatter.format("1611,32", IntegerMilleSpaceFormat.IDENTIFIER));
        this.addComponent(`#select-property-number-format`, this.numberPropertySelect);


        // Property Unit Decorator
        const appendPropertyDecorator = new AppendPropertyDecorator("");
        this.unitPropertySelect = new Select(TemplateFactory.getInstance());
        this.unitPropertySelect.initialize();
        this.unitPropertySelect.setCommand("select", new UnitDecoratorCommand(this.presenter as ChartAnimationPresenter, appendPropertyDecorator));
        this.unitPropertySelect.setLabel("Unit");
        this.unitPropertySelect.addOption("", "None");
        this.unitPropertySelect.addOption("€", "Euro");
        this.unitPropertySelect.addOption("$", "Dollar");
        this.unitPropertySelect.addOption("m", "Meters");
        this.unitPropertySelect.addOption("s", "Seconds");
        this.addComponent(`#select-property-unit-format`, this.unitPropertySelect);

        // Italic Checkbox
        this.italicCheckbox = new Checkbox(TemplateFactory.getInstance());
        this.italicCheckbox.setTemplate(new CheckboxInlineTemplate());
        this.italicCheckbox.initialize();
        const italicDecorator = new TagWrapperPropertyFrameDataDecorator("i");
        const italicCommand = new TagWrapperCommand(this.presenter as ChartAnimationPresenter, italicDecorator);
        this.italicCheckbox.setCommand("click", italicCommand);
        this.italicCheckbox.setLabel("italic");
        this.addComponent(`#checkbox-italic`, this.italicCheckbox);

        // Bold Checkbox
        this.boldCheckbox = new Checkbox(TemplateFactory.getInstance());
        this.boldCheckbox.setTemplate(new CheckboxInlineTemplate());
        this.boldCheckbox.initialize();
        const boldDecorator = new TagWrapperPropertyFrameDataDecorator("strong");
        const boldCommand = new TagWrapperCommand(this.presenter as ChartAnimationPresenter, boldDecorator);
        this.boldCheckbox.setCommand("click", boldCommand);
        this.boldCheckbox.setLabel("bold");
        this.addComponent(`#checkbox-bold`, this.boldCheckbox);


        // Italic Checkbox
        this.smallCheckbox = new Checkbox(TemplateFactory.getInstance());
        this.smallCheckbox.setTemplate(new CheckboxInlineTemplate());
        this.smallCheckbox.initialize();
        const smallDecorator = new TagWrapperPropertyFrameDataDecorator("small");
        this.smallCheckbox.setCommand("click", new TagWrapperCommand(this.presenter as ChartAnimationPresenter, smallDecorator));
        this.smallCheckbox.setLabel("small");
        this.addComponent(`#checkbox-small`, this.smallCheckbox);

        (this.presenter as ChartAnimationPresenter).addFrameDataDecorator(propertyNumberFormatDecorator);
        (this.presenter as ChartAnimationPresenter).addFrameDataDecorator(appendPropertyDecorator);
    }

    setProperty(property : string) : void {
        this.$element
            .find(`#property`)
            .html(property);
    }

    setTitle(title: string): void {
        this.$element.find(`#title`).html(title);
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

    update(frameData : FrameData): void {
        this.setChartData(frameData.getFrameDataSet().map( set => set.label),
            frameData.getFrameDataSet().map( set => `rgba(${set.color[0]},${set.color[1]},${set.color[2]})`),
            frameData.getFrameDataSet().map( set => set.value),
            1000);
        this.setRange(0, frameData.getSampleSize(), 1);
        this.frameRange.setValue(frameData.getCurrentFrame());
    }

    private setChartData(labels : string[], colors : string[], dataSets : number[], duration: number) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].backgroundColor = colors;
        this.chart.data.datasets[0].data = dataSets;
        this.chart.update(duration);
    }

    private setRange(min: number, max: number, step: number) {
        this.frameRange.setMin(min);
        this.frameRange.setMax(max);
        this.frameRange.setStep(step);
    }
}
