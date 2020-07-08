import {Animation, DataObject, FrameDataSet} from "../../../animation/Animation";
import {AnimationPresenter} from "../AnimationPresenter";
import {Observer} from "../../../animation/Observer";
import {Comparator} from "../../../utility/comparing/Comparator";
import {ComparatorFactory} from "../../../utility/comparing/ComparatorFactory";
import {ComparatorUtils} from "../../../utility/comparing/ComparatorUtils";
import {FrameDataDecorator} from "../../../utility/decorating/FrameDataDecorator";
import {FrameData} from "../../../animation/data/FrameData";

export class AnimationPresenterImpl extends AnimationPresenter implements Observer {

    private animation: Animation;
    private comparator: Comparator<FrameDataSet>;
    private frameDataDecorators : Array<FrameDataDecorator>;

    protected doInitialize() : void{
        this.animation = new Animation(window);
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

    update(): void {
        const currentFrameData = this.animation.getCurrentFrameData();
        currentFrameData.getFrameDataSet().sort(this.comparator.compare);
        this.view.updateChart(currentFrameData.getFrameDataSet());
        console.log(this.frameDataDecorators);
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
