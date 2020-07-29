import {AnimationPresenterImpl} from "./ui/animation/impl/AnimationPresenterImpl";
import {AnimationViewImpl} from "./ui/animation/impl/AnimationViewImpl";
import {AnimationTemplate} from "./ui/animation/impl/AnimationTemplate";
import {ElementComposer} from "./utility/creating/ui/ElementComposer";
import {AnimationPresenter} from "./ui/animation/AnimationPresenter";
import {NumberFormatter} from "./utility/formatting/NumberFormatter";
import {IntegerNumberFormat} from "./utility/formatting/IntegerNumberFormat";
import {IntegerMilleSpaceFormat} from "./utility/formatting/IntegerMilleSpaceFormat";
import {IntegerMillePointFormat} from "./utility/formatting/IntegerMillePointFormat";
import {FileParser} from "./utility/parsing/FileParser";
import {CSVParsingStrategy} from "./utility/parsing/CSVParsingStrategy";
import {XLSParsingStrategy} from "./utility/parsing/XLSParsingStrategy";
import {DataTransformation} from "./utility/transforming/DataTransformation";
import {ColorFillTransformer} from "./utility/transforming/ColorFillTransformer";
import {UIElementFactory} from "./utility/creating/ui/UIElementFactory";
import {ButtonKit} from "./utility/creating/ui/kits/ButtonKit";
import {SelectKit} from "./utility/creating/ui/kits/SelectKit";
import {DefaultTemplateFactory} from "./utility/creating/ui/DefaultTemplateFactory";
import {SmartWindowLoop} from "./animation/SmartWindowLoop";
import {AnimationFrameWindowLoop} from "./animation/AnimationFrameWindowLoop";

(() => {
    SmartWindowLoop.initialize(new AnimationFrameWindowLoop(window));

    const templateFactory = new DefaultTemplateFactory();

    UIElementFactory.add("button", new ButtonKit(templateFactory));
    UIElementFactory.add("select", new SelectKit(templateFactory));

    FileParser.add("text/csv", new CSVParsingStrategy());
    FileParser.add("application/xls", new XLSParsingStrategy());
    FileParser.add("application/xlsx", new XLSParsingStrategy());
    FileParser.add("application/vnd.ms-excel", new XLSParsingStrategy());
    FileParser.add("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", new XLSParsingStrategy());

    DataTransformation.add(new ColorFillTransformer());

    NumberFormatter.add(new IntegerNumberFormat());
    NumberFormatter.add(new IntegerMilleSpaceFormat());
    NumberFormatter.add(new IntegerMillePointFormat());

    const presenterCreator = new ElementComposer();
    const presenter =  presenterCreator.create<AnimationPresenter>(new AnimationPresenterImpl, new AnimationViewImpl(), new AnimationTemplate());
    presenter.setTitle("CO2 emissions per country per million");
    $(`#animation-chart`).append(presenter.getElement());
})()