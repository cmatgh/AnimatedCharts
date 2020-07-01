import {AnimationPresenterImpl} from "./ui/animation/impl/AnimationPresenterImpl";
import {AnimationViewImpl} from "./ui/animation/impl/AnimationViewImpl";
import {AnimationTemplate} from "./ui/animation/impl/AnimationTemplate";
import {UIElementFactory} from "./utility/creation/ui/UIElementFactory";
import {ButtonCreationHandler} from "./utility/creation/ui/ButtonCreationHandler";
import {SelectCreationHandler} from "./utility/creation/ui/SelectCreationHandler";

(() => {
    UIElementFactory.add(new ButtonCreationHandler("button"));
    UIElementFactory.add(new SelectCreationHandler("select"));

    const component = new AnimationPresenterImpl("animation-chart", new AnimationViewImpl(new AnimationTemplate()));
    component.initialize();
    component.setTitle("CO2 emissions per country per million");
    $(`#animation-chart`).append(component.getElement());
})()