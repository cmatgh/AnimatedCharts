import { AppComponent } from "./ui/app/AppComponent"

(() => {
    const component = new AppComponent("animation-chart");
    component.buildJQueryStructure()
    $(`#animation-chart`).append(component.getJQueryElement());
})()