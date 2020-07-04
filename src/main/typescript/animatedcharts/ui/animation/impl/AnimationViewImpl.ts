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

export class AnimationViewImpl extends AnimationView {

    presenter: AnimationPresenter;
    template : Template;
    $element : JQuery;
    chart: Chart;

    doInitialize() {
        this.chart = this.chart = ChartFactory.getInstance()
             .create("bar", <HTMLCanvasElement> this.$element.find(`#chart`).get(0));

        const elementFactory = new UIElementFactory();
        const presenterCreator = new PresenterCreator();

        // File Dialog
        const fileDialogButtonPresenter = presenterCreator.create<ButtonPresenter>(new ButtonPresenter(), new FileDialogView(), new FileDialogTemplate());
        const fileDialogCommand = new ParseFileCommand(this.presenter);
        fileDialogButtonPresenter.setOnChange(fileDialogCommand);
        fileDialogButtonPresenter.setLabel("Choose File...");
        this.add(`#load-dataset-button`, fileDialogButtonPresenter);

        // Resume Pause Control
        const resumePauseButtonPresenter = elementFactory.createElement<ButtonPresenter>("button");
        resumePauseButtonPresenter.getView().setTemplate(new ResumeButtonTemplate());
        resumePauseButtonPresenter.initialize();
        const resumePauseCommand = new ResumePauseCommand(this.presenter, <ButtonView> resumePauseButtonPresenter.getView());
        resumePauseButtonPresenter.setOnClick(resumePauseCommand);
        this.add(`#start-pause-button`, resumePauseButtonPresenter);

        // Sort Selection
        const sortSelectionPresenter =  elementFactory.createElement<SelectPresenter>("select")
        sortSelectionPresenter.setOnSelect(new SelectSortCommand(this.presenter));
        sortSelectionPresenter.setLabel("Sort by");
        sortSelectionPresenter.addOption("value", "Value");
        sortSelectionPresenter.addOption("color", "Color");
        sortSelectionPresenter.addOption("label", "Label");
        this.add(`#select-sort`, sortSelectionPresenter);

        // Reverse Checkbox
        const checkboxPresenter = presenterCreator.create<ButtonPresenter>(new ButtonPresenter(), new CheckboxView(), new CheckboxTemplate());
        const reverseSortCommand = new ReverseSortCommand(this.presenter);
        checkboxPresenter.setOnClick(reverseSortCommand);
        checkboxPresenter.setLabel("reverse");
        this.add(`#checkbox-reverse`, checkboxPresenter);

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
        const smallCommand = new TagWrapperCommand(this.presenter, smallDecorator);
        smallCheckboxPresenter.setOnClick(smallCommand);
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
