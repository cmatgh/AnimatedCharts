import {AnimationPresenter} from "../ui/animation/AnimationPresenter";
import {TagWrapperPropertyFrameDataDecorator} from "../utility/decorating/TagWrapperPropertyFrameDataDecorator";
import {CheckboxCommand} from "./CheckboxCommand";

export class TagWrapperCommand extends CheckboxCommand{

    private presenter : AnimationPresenter;
    private frameDataDecorator : TagWrapperPropertyFrameDataDecorator;

    constructor(presenter : AnimationPresenter, frameDataDecorator : TagWrapperPropertyFrameDataDecorator) {
        super();
        this.presenter  = presenter;
        this.frameDataDecorator = frameDataDecorator;
    }


    doOnDeselect(map: Map<string, any>) {
        this.presenter.removeFrameDataDecorator(this.frameDataDecorator);
        this.presenter.update();
    }

    doOnSelect(map: Map<string, any>) {
        this.presenter.removeFrameDataDecorator(this.frameDataDecorator);
        this.presenter.addFrameDataDecorator(this.frameDataDecorator);
        this.presenter.update();
    }

}