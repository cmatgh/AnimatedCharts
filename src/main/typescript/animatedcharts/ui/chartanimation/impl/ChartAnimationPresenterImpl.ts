import {Animation, DataObject} from "../../../animation/Animation";
import {ChartAnimationPresenter} from "../ChartAnimationPresenter";
import {Observer} from "../../../interfaces/Observer";
import {Comparator} from "../../../interfaces/Comparator";
import {ComparatorFactory} from "../../../utility/comparing/ComparatorFactory";
import {ComparatorUtils} from "../../../utility/comparing/ComparatorUtils";
import {FrameDataDecorator} from "../../../utility/decorating/FrameDataDecorator";
import {FrameData, ChartData} from "../../../animation/data/FrameData";
import {SmartWindowLoop} from "../../../animation/SmartWindowLoop";
import {ChartAnimationView} from "../ChartAnimationView";

export class ChartAnimationPresenterImpl extends ChartAnimationPresenter implements Observer {

    private animation: Animation;
    private comparator: Comparator<ChartData>;
    private frameDataDecorators : Array<FrameDataDecorator>;

    protected doInitialize() : void{
        this.animation = new Animation(SmartWindowLoop.getInstance());
        this.animation.register(this);
        this.comparator = ComparatorFactory.getInstance().create("label");
        this.frameDataDecorators = [];
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

    setFrame(frame: number) {
        this.animation.setFrame(frame);
        this.update();
    }

    update(): void {
        const currentFrameData = this.animation.getCurrentFrameData();
        if(currentFrameData != null) {
            currentFrameData.getFrameDataSet().sort(this.comparator.compare);
            (this.view as ChartAnimationView).update(currentFrameData);
            (this.view as ChartAnimationView).setProperty(this.applyDecorators(currentFrameData).getProperty());
        }
    }

    private applyDecorators(frameData: FrameData) : FrameData {
        let curFrameData = frameData;
        this.frameDataDecorators.forEach( decorator => {
            decorator.setFrameData(curFrameData);
            curFrameData = decorator;
        })

        return curFrameData;
    }

    loadDataset(data: DataObject): void {
        this.animation.setDataObject(data);
        this.animation.notifyObservers();
    }

    setChart(type: string) : void{
        (this.view as ChartAnimationView).setChart(type);
    }

    addFrameDataDecorator(frameDataDecorator : FrameDataDecorator): void {
        this.frameDataDecorators.push(frameDataDecorator);
    }

    removeFrameDataDecorator(frameDataDecorator : FrameDataDecorator) : void {
        this.frameDataDecorators = this.frameDataDecorators.filter( decorator => {
            return decorator != frameDataDecorator;
        });
    }

}
