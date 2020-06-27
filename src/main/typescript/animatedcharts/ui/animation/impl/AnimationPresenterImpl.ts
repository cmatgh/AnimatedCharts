import {Animation, FrameDataSet} from "../../../animation/Animation";
import {AnimationPresenter} from "../AnimationPresenter";
import {AnimationView} from "../AnimationView";
import {Observer} from "../../../animation/Observer";
import {Comparator} from "../../../utility/comparing/Comparator";
import {ComparatorFactory} from "../../../utility/comparing/ComparatorFactory";
import {ComparatorUtils} from "../../../utility/comparing/ComparatorUtils";
import {ParserFactory} from "../../../utility/parsing/ParserFactory";

export class AnimationPresenterImpl implements AnimationPresenter, Observer{

    private readonly animation: Animation;
    private view : AnimationView;
    private comparator : Comparator<FrameDataSet>;

    constructor(elementId : string, view : AnimationView) {
        this.view = view;
        this.view.setComponent(this);
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

    loadDataset(event: Event): void {
        // @ts-ignore
        let file : File = event.target.files[0];
        let fileType = this.getFileType(file.name);
        let parser = ParserFactory.getInstance().create(fileType);
        file.text().then( text => {
            let data = parser.parse(Buffer.from(text));
            this.animation.setDataObject(data);
            this.animation.notifyObservers();
        });
    }

    private getFileType(filename : string) : string {
        const extensionStart = filename.lastIndexOf(".");
        if(extensionStart >= 0) {
            return filename.substring(extensionStart + 1, filename.length);
        }

        return "";
    }

}
