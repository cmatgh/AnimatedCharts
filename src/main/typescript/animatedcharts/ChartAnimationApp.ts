import { AnimationUI } from "./ui/AnimationUI";

export class ChartAnimationApp {

    window: Window;
    animationUIElements: Set<AnimationUI>;

    constructor(window: Window) {
        this.window = window;
        this.animationUIElements = new Set<AnimationUI>();
        this.addAnimationUI();
    }

    addAnimationUI() {
        let animationUI = new AnimationUI("chart-animation1", "CO2 emission per country in million");
        this.animationUIElements.add(animationUI);
        animationUI.drawElements();
    }

}