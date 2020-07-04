import {AnimationPresenterImpl} from "./ui/animation/impl/AnimationPresenterImpl";
import {AnimationViewImpl} from "./ui/animation/impl/AnimationViewImpl";
import {AnimationTemplate} from "./ui/animation/impl/AnimationTemplate";
import {UIElementFactory} from "./utility/creating/ui/UIElementFactory";
import {ButtonCreationHandler} from "./utility/creating/ui/handler/ButtonCreationHandler";
import {SelectCreationHandler} from "./utility/creating/ui/handler/SelectCreationHandler";
import {PresenterCreator} from "./utility/creating/ui/PresenterCreator";
import {AnimationPresenter} from "./ui/animation/AnimationPresenter";
import {NumberFormatter} from "./utility/formatting/NumberFormatter";
import {IntegerNumberFormat} from "./utility/formatting/IntegerNumberFormat";
import {IntegerMilleSpaceFormat} from "./utility/formatting/IntegerMilleSpaceFormat";
import {IntegerMillePointFormat} from "./utility/formatting/IntegerMillePointFormat";
import {FileParser} from "./utility/parsing/FileParser";
import {CSVParsingStrategy} from "./utility/parsing/CSVParsingStrategy";
import {XLSParsingStrategy} from "./utility/parsing/XLSParsingStrategy";

(() => {
    UIElementFactory.add(new ButtonCreationHandler("button"));
    UIElementFactory.add(new SelectCreationHandler("select"));

    FileParser.add("text/csv", new CSVParsingStrategy());
    FileParser.add("application/xls", new XLSParsingStrategy());
    FileParser.add("application/xlsx", new XLSParsingStrategy());

    NumberFormatter.add(new IntegerNumberFormat());
    NumberFormatter.add(new IntegerMilleSpaceFormat());
    NumberFormatter.add(new IntegerMillePointFormat());

    const presenterCreator = new PresenterCreator();
    const presenter =  presenterCreator.create<AnimationPresenter>(new AnimationPresenterImpl, new AnimationViewImpl(), new AnimationTemplate());
    presenter.setTitle("CO2 emissions per country per million");
    $(`#animation-chart`).append(presenter.getElement());
})()