import {AnimationPresenterImpl} from "./ui/animation/impl/AnimationPresenterImpl";
import {AnimationViewImpl} from "./ui/animation/impl/AnimationViewImpl";
import {AnimationTemplate} from "./ui/animation/impl/AnimationTemplate";
import {UIElementFactory} from "./utility/creating/ui/UIElementFactory";
import {ButtonCreationHandler} from "./utility/creating/ui/ButtonCreationHandler";
import {SelectCreationHandler} from "./utility/creating/ui/SelectCreationHandler";
import {PresenterCreator} from "./utility/creating/ui/PresenterCreator";
import {AnimationPresenter} from "./ui/animation/AnimationPresenter";

(() => {
    UIElementFactory.add(new ButtonCreationHandler("button"));
    UIElementFactory.add(new SelectCreationHandler("select"));

    const presenterCreator = new PresenterCreator();

    const presenter =  presenterCreator.create<AnimationPresenter>(new AnimationPresenterImpl, new AnimationViewImpl(), new AnimationTemplate());
    presenter.setTitle("CO2 emissions per country per million");
    $(`#animation-chart`).append(presenter.getElement());
})()