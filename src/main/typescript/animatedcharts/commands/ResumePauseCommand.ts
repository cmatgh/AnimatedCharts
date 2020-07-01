import {Command} from "./Command";
import {Animation} from "../animation/Animation";
import {ButtonView} from "../ui/input/button/ButtonView";
import {ResumeButtonTemplate} from "../ui/input/button/templates/ResumeButtonTemplate";
import {PauseButtonTemplate} from "../ui/input/button/templates/PauseButtonTemplate";
import {Logger} from "../utility/logging/Logger";
import {Template} from "../ui/Template";

export class ResumePauseCommand implements Command {

    animation: Animation;
    buttonView: ButtonView;
    startTemplate : Template
    resumeTemplate : Template;
    pauseTemplate : Template;

    constructor(animation : Animation, buttonView : ButtonView) {
        this.animation = animation;
        this.buttonView = buttonView;
        this.resumeTemplate = new ResumeButtonTemplate();
        this.pauseTemplate = new PauseButtonTemplate();
        this.startTemplate = this.resumeTemplate;
    }

    execute(map: Map<string, any>): void {
        if(!this.animation.isRunning()) {
            Logger.getInstance().info("Starting the animation.")
            this.animation.start();
            this.buttonView.setTemplate(this.pauseTemplate)
        } else if(this.animation.hasPaused()) {
            Logger.getInstance().info("Resuming the animation.")
            this.animation.resume();
            this.buttonView.setTemplate(this.pauseTemplate)
        } else {
            Logger.getInstance().info("Pausing the animation.")
            this.animation.pause();
            this.buttonView.setTemplate(this.resumeTemplate)
        }
    }

}