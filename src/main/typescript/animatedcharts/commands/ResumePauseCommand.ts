import {Command} from "./Command";
import {Animation} from "../animation/Animation";
import {ButtonView} from "../ui/input/button/ButtonView";
import {ResumeButtonTemplate} from "../ui/input/button/templates/ResumeButtonTemplate";
import {PauseButtonTemplate} from "../ui/input/button/templates/PauseButtonTemplate";
import {Logger} from "../utility/logging/Logger";
import {Template} from "../ui/Template";
import {AnimationPresenter} from "../ui/animation/AnimationPresenter";

export class ResumePauseCommand implements Command {

    animationPresenter: AnimationPresenter;
    buttonView: ButtonView;
    startTemplate : Template
    resumeTemplate : Template;
    pauseTemplate : Template;

    constructor(animationPresenter : AnimationPresenter, buttonView : ButtonView) {
        this.animationPresenter = animationPresenter;
        this.buttonView = buttonView;
        this.resumeTemplate = new ResumeButtonTemplate();
        this.pauseTemplate = new PauseButtonTemplate();
        this.startTemplate = this.resumeTemplate;
    }

    execute(map: Map<string, any>): void {
        if(!this.animationPresenter.isRunning()) {
            Logger.getInstance().info("Starting the animation.")
            this.animationPresenter.start();
            this.buttonView.setTemplate(this.pauseTemplate)
        } else if(this.animationPresenter.hasPaused()) {
            Logger.getInstance().info("Resuming the animation.")
            this.animationPresenter.resume();
            this.buttonView.setTemplate(this.pauseTemplate)
        } else {
            Logger.getInstance().info("Pausing the animation.")
            this.animationPresenter.pause();
            this.buttonView.setTemplate(this.resumeTemplate)
        }
    }

}