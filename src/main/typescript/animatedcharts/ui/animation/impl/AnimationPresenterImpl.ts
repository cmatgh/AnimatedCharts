import {Animation, DataObject, FrameDataSet} from "../../../animation/Animation";
import {AnimationPresenter} from "../AnimationPresenter";
import {Observer} from "../../../animation/Observer";
import {Comparator} from "../../../utility/comparing/Comparator";
import {ComparatorFactory} from "../../../utility/comparing/ComparatorFactory";
import {ComparatorUtils} from "../../../utility/comparing/ComparatorUtils";
import {AnimationView} from "../AnimationView";

export class AnimationPresenterImpl implements AnimationPresenter, Observer{

    private readonly animation: Animation;
    private view : AnimationView;
    private comparator : Comparator<FrameDataSet>;

    constructor() {
        this.animation = new Animation(window);
        this.animation.register(this);
        this.comparator = ComparatorFactory.getInstance().create("label");
    }

    initialize(): void {
        this.view.initialize();
    }

    setTitle(title: string) {
        this.view.setTitle(title);
    }

    getElement(): JQuery {
        return this.view.getElement();
    }

    setView(view: AnimationView) {
        this.view = view;
    }

    getView(): AnimationView {
        return this.view;
    }

    pause(): void {
        this.animation.pause();
    }

    resume(): void {
        this.animation.resume();
    }

    start(): void {
        this.animation.start();
    }

    stop(): void {
        this.animation.stop();
    }

    isRunning(): boolean {
        return this.animation.isRunning();
    }

    hasPaused(): boolean {
        return this.animation.hasPaused();
    }

    reverse(): void {
        this.comparator = ComparatorUtils.reverse(this.comparator);
        this.update();
    }

    sortBy(type: string) {
        this.comparator = ComparatorFactory.getInstance().create(type);
        this.update();
    }

    update(): void {
        const dataSets = this.animation.getCurrentFrameData();
        dataSets.sort(this.comparator.compare);
        this.view.updateChart(dataSets);
        this.view.setProperty(this.animation.getCurrentColumnProperty());
    }

    loadDataset(data: DataObject): void {
        this.animation.setDataObject(data);
        this.animation.notifyObservers();
    }

    getAnimation(): Animation {
        return this.animation;
    }

    setChart(type: string) {
        this.view.setChart(type);
    }

}
