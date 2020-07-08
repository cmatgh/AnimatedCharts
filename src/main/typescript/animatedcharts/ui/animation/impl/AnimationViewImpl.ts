import {AnimationView} from "../AnimationView";
import {AnimationPresenter} from "../AnimationPresenter";
import {Template} from "../../Template";
import {ButtonPresenter} from "../../input/button/ButtonPresenter";
import {ButtonView} from "../../input/button/ButtonView";
import {ChartFactory} from "../../../utility/creating/ui/ChartFactory";
import Chart from "chart.js";
import {FileDialogView} from "../../input/filedialog/FileDialogView";
import {FileDialogTemplate} from "../../input/filedialog/FileDialogTemplate";
import {ParseFileCommand} from "../../../commands/ParseFileCommand";
import {ResumePauseCommand} from "../../../commands/ResumePauseCommand";
import {ResumeButtonTemplate} from "../../input/button/templates/ResumeButtonTemplate";
import {SelectSortCommand} from "../../../commands/SelectSortCommand";
import {SelectChartCommand} from "../../../commands/SelectChartCommand";
import {CheckboxTemplate} from "../../input/checkbox/CheckboxTemplate";
import {ReverseSortCommand} from "../../../commands/ReverseSortCommand";
import {CheckboxView} from "../../input/checkbox/CheckboxView";
import {PresenterCreator} from "../../../utility/creating/ui/PresenterCreator";
import {UIElementFactory} from "../../../utility/creating/ui/UIElementFactory";
import {SelectPresenter} from "../../input/select/SelectPresenter";
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
import {CheckboxInlineTemplate} from "../../input/checkbox/CheckboxInlineTemplate";
import {FrameData} from "../../../animation/data/FrameData";
import {RangeCommand} from "../../../commands/RangeCommand";
import {RangePresenter} from "../../input/range/RangePresenter";
import {RangeView} from "../../input/range/RangeView";
import {RangeTemplate} from "../../input/range/RangeTemplate";

export class AnimationViewImpl extends AnimationView {

    presenter: AnimationPresenter;
    template : Template;
    $element : JQuery;
    chart: Chart;

    fileDialogButtonPresenter : ButtonPresenter;
    resumePauseButtonPresenter : ButtonPresenter;
    frameRangePresenter : RangePresenter;
    sortSelectionPresenter : SelectPresenter;
    checkboxPresenter : ButtonPresenter;

    doInitialize() {
        this.chart = this.chart = ChartFactory.getInstance()
             .create("bar", <HTMLCanvasElement> this.$element.find(`#chart`).get(0));

        const elementFactory = new UIElementFactory();
        const presenterCreator = new PresenterCreator();

        // File Dialog
        this.fileDialogButtonPresenter = presenterCreator.create<ButtonPresenter>(new ButtonPresenter(), new FileDialogView(), new FileDialogTemplate());
        this.fileDialogButtonPresenter.setOnChange(new ParseFileCommand(this.presenter));
        this.fileDialogButtonPresenter.setLabel("Choose File...");
        this.add(`#load-dataset-button`, this.fileDialogButtonPresenter);

        // Resume Pause Control
        this.resumePauseButtonPresenter = elementFactory.createElement<ButtonPresenter>("button");
        this.resumePauseButtonPresenter.getView().setTemplate(new ResumeButtonTemplate());
        this.resumePauseButtonPresenter.initialize();
        const resumePauseCommand = new ResumePauseCommand(this.presenter, <ButtonView> this.resumePauseButtonPresenter.getView());
        this.resumePauseButtonPresenter.setOnClick(resumePauseCommand);
        this.add(`#start-pause-button`, this.resumePauseButtonPresenter);

        // Frame Range
        this.frameRangePresenter = presenterCreator.create<RangePresenter>(new RangePresenter(), new RangeView(), new RangeTemplate());
        this.frameRangePresenter.setLabel("");
        this.frameRangePresenter.setOnChange(new RangeCommand(this.presenter));
        this.frameRangePresenter.setMin(0);
        this.frameRangePresenter.setMax(1);
        this.frameRangePresenter.setStep(1);
        this.add("#frame-range", this.frameRangePresenter);

        // Sort Selection
        this.sortSelectionPresenter =  elementFactory.createElement<SelectPresenter>("select")
        this.sortSelectionPresenter.setOnSelect(new SelectSortCommand(this.presenter));
        this.sortSelectionPresenter.setLabel("Sort by");
        this.sortSelectionPresenter.addOption("value", "Value");
        this.sortSelectionPresenter.addOption("color", "Color");
        this.sortSelectionPresenter.addOption("label", "Label");
        this.add(`#select-sort`, this.sortSelectionPresenter);

        // Reverse Checkbox
        this.checkboxPresenter = presenterCreator.create<ButtonPresenter>(new ButtonPresenter(), new CheckboxView(), new CheckboxTemplate());
        this.checkboxPresenter.setOnClick(new ReverseSortCommand(this.presenter));
        this.checkboxPresenter.setLabel("reverse");
        this.add(`#checkbox-reverse`, this.checkboxPresenter);

        // Chart Selection
        const charSelectionPresenter = elementFactory.createElement<SelectPresenter>("select");
        charSelectionPresenter.setOnSelect(new SelectChartCommand(this.presenter));
        charSelectionPresenter.setLabel("Chart type");
        charSelectionPresenter.addOption("bar", "Bar" );
        charSelectionPresenter.addOption("pie", "Pie");
        charSelectionPresenter.addOption("polarArea", "Polar Area");
        charSelectionPresenter.addOption("doughnut", "Doughnut");
        this.add(`#select-chart`, charSelectionPresenter);

        // Property Number Decorator
        const propertyNumberFormatDecorator = new PropertyNumberFormatDecorator(IntegerNumberFormat.IDENTIFIER);
        const numberPropertyPresenter = elementFactory.createElement<SelectPresenter>("select");
        numberPropertyPresenter.setOnSelect(new NumberFormatDecoratorCommand(this.presenter, propertyNumberFormatDecorator));
        numberPropertyPresenter.setLabel("Number format");
        numberPropertyPresenter.addOption(IntegerNumberFormat.IDENTIFIER, NumberFormatter.format("1611,32", IntegerNumberFormat.IDENTIFIER));
        numberPropertyPresenter.addOption(IntegerMillePointFormat.IDENTIFIER, NumberFormatter.format("1611,32", IntegerMillePointFormat.IDENTIFIER));
        numberPropertyPresenter.addOption(IntegerMilleSpaceFormat.IDENTIFIER, NumberFormatter.format("1611,32", IntegerMilleSpaceFormat.IDENTIFIER));
        this.add(`#select-property-number-format`, numberPropertyPresenter);

        // Property Unit Decorator
        const appendPropertyDecorator = new AppendPropertyDecorator("");
        const unitPropertyPresenter = elementFactory.createElement<SelectPresenter>("select");
        unitPropertyPresenter.setOnSelect(new UnitDecoratorCommand(this.presenter, appendPropertyDecorator));
        unitPropertyPresenter.setLabel("Unit");
        unitPropertyPresenter.addOption("", "None");
        unitPropertyPresenter.addOption("€", "Euro");
        unitPropertyPresenter.addOption("$", "Dollar");
        unitPropertyPresenter.addOption("m", "Meters");
        unitPropertyPresenter.addOption("s", "Seconds");
        this.add(`#select-property-unit-format`, unitPropertyPresenter);

        // Italic Checkbox
        const italicCheckboxPresenter = presenterCreator.create<ButtonPresenter>(new ButtonPresenter(), new CheckboxView(), new CheckboxInlineTemplate());
        const italicDecorator = new TagWrapperPropertyFrameDataDecorator();
        italicDecorator.setValue("i");
        const italicCommand = new TagWrapperCommand(this.presenter, italicDecorator);
        italicCheckboxPresenter.setOnClick(italicCommand);
        italicCheckboxPresenter.setLabel("italic");
        this.add(`#checkbox-italic`, italicCheckboxPresenter);

        // Bold Checkbox
        const boldCheckboxPresenter = presenterCreator.create<ButtonPresenter>(new ButtonPresenter(), new CheckboxView(), new CheckboxInlineTemplate());
        const boldDecorator = new TagWrapperPropertyFrameDataDecorator();
        boldDecorator.setValue("strong");
        const boldCommand = new TagWrapperCommand(this.presenter, boldDecorator);
        boldCheckboxPresenter.setOnClick(boldCommand);
        boldCheckboxPresenter.setLabel("bold");
        this.add(`#checkbox-bold`, boldCheckboxPresenter);

        // Italic Checkbox
        const smallCheckboxPresenter = presenterCreator.create<ButtonPresenter>(new ButtonPresenter(), new CheckboxView(), new CheckboxInlineTemplate());
        const smallDecorator = new TagWrapperPropertyFrameDataDecorator();
        smallDecorator.setValue("small");
        smallCheckboxPresenter.setOnClick(new TagWrapperCommand(this.presenter, smallDecorator));
        smallCheckboxPresenter.setLabel("small");
        this.add(`#checkbox-small`, smallCheckboxPresenter);

        this.presenter.addFrameDataDecorator(propertyNumberFormatDecorator);
        this.presenter.addFrameDataDecorator(appendPropertyDecorator);
    }

    setProperty(property : string) : void {
        this.$element
            .find(`#property`)
            .html(property);
    }

    setTitle(title: string): void {
        this.$element.find(`#title`).html(title);
    }

    setPresenter(presenter: AnimationPresenter): void {
        this.presenter = presenter;
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
        this.frameRangePresenter.setValue(frameData.getCurrentFrame());
    }

    private setChartData(labels : string[], colors : string[], dataSets : number[], duration: number) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].backgroundColor = colors;
        this.chart.data.datasets[0].data = dataSets;
        this.chart.update(duration);
    }

    private setRange(min: number, max: number, step: number) {
        this.frameRangePresenter.setMin(min);
        this.frameRangePresenter.setMax(max);
        this.frameRangePresenter.setStep(step);
    }
}
