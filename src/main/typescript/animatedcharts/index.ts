import {AnimationPresenterImpl} from "./ui/animation/impl/AnimationPresenterImpl";
import {AnimationViewImpl} from "./ui/animation/impl/AnimationViewImpl";
import {AnimationTemplate} from "./ui/animation/impl/AnimationTemplate";

(() => {
    const component = new AnimationPresenterImpl("animation-chart", new AnimationViewImpl(new AnimationTemplate()));
    component.initialize();
    component.setTitle("CO2 emissions per country per million");
    $(`#animation-chart`).append(component.getElement());
})()