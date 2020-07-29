import {Animation, DataObject} from "../../../animation/Animation";
import {AnimationPresenter} from "../AnimationPresenter";
import {Observer} from "../../../utility/Observer";
import {Comparator} from "../../../utility/comparing/Comparator";
import {ComparatorFactory} from "../../../utility/comparing/ComparatorFactory";
import {ComparatorUtils} from "../../../utility/comparing/ComparatorUtils";
import {FrameDataDecorator} from "../../../utility/decorating/FrameDataDecorator";
import {FrameData, ChartData} from "../../../animation/data/FrameData";
import {SmartWindowLoop} from "../../../animation/SmartWindowLoop";

export class AnimationPresenterImpl extends AnimationPresenter implements Observer {

    private animation: Animation;
    private comparator: Comparator<ChartData>;
    private frameDataDecorators : Array<FrameDataDecorator>;

    protected doInitialize() : void{
        this.animation = new Animation(SmartWindowLoop.getInstance());
        this.animation.register(this);
        this.comparator = ComparatorFactory.getInstance().create("label");
        this.frameDataDecorators = [];
    }

    setTitle(title: string) : void{
        this.view.setTitle(title);
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
        currentFrameData.getFrameDataSet().sort(this.comparator.compare);
        this.view.update(currentFrameData);
        this.view.setProperty(this.applyDecorators(currentFrameData).getProperty());
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
        this.view.setChart(type);
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
