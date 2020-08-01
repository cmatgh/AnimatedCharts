import {ChartAnimationPresenterImpl} from "./ui/chartanimation/impl/ChartAnimationPresenterImpl";
import {ChartAnimationViewImpl} from "./ui/chartanimation/impl/ChartAnimationViewImpl";
import {ChartAnimationTemplate} from "./ui/chartanimation/impl/ChartAnimationTemplate";
import {ElementComposer} from "./utility/creating/ui/ElementComposer";
import {ChartAnimationPresenter} from "./ui/chartanimation/ChartAnimationPresenter";
import {NumberFormatter} from "./utility/formatting/NumberFormatter";
import {IntegerNumberFormat} from "./utility/formatting/IntegerNumberFormat";
import {IntegerMilleSpaceFormat} from "./utility/formatting/IntegerMilleSpaceFormat";
import {IntegerMillePointFormat} from "./utility/formatting/IntegerMillePointFormat";
import {FileParser} from "./utility/parsing/FileParser";
import {CSVParsingStrategy} from "./utility/parsing/CSVParsingStrategy";
import {XLSParsingStrategy} from "./utility/parsing/XLSParsingStrategy";
import {DataTransformation} from "./utility/transforming/DataTransformation";
import {ColorFillTransformer} from "./utility/transforming/ColorFillTransformer";
import {DefaultTemplateFactory} from "./utility/creating/ui/DefaultTemplateFactory";
import {SmartWindowLoop} from "./animation/SmartWindowLoop";
import {AnimationFrameWindowLoop} from "./animation/AnimationFrameWindowLoop";
import {ChartAnimationView} from "./ui/chartanimation/ChartAnimationView";
import {TemplateFactory} from "./utility/creating/ui/TemplateFactory";

(() => {
    SmartWindowLoop.initialize(new AnimationFrameWindowLoop(window));
    TemplateFactory.initialize(new DefaultTemplateFactory());

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
    const presenter =  presenterCreator.create<ChartAnimationPresenter>(new ChartAnimationPresenterImpl, new ChartAnimationViewImpl(), new ChartAnimationTemplate());
    (presenter.getView() as ChartAnimationView).setTitle("CO2 emissions per country per million");
    $(`#animation-chart`).append(presenter.getElement());
})()