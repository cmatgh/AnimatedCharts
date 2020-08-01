import {Command} from "../interfaces/Command";
import {ResumeButtonTemplate} from "../ui/components/button/templates/ResumeButtonTemplate";
import {PauseButtonTemplate} from "../ui/components/button/templates/PauseButtonTemplate";
import {Logger} from "../utility/logging/Logger";
import {Template} from "../interfaces/Template";
import {ChartAnimationPresenter} from "../ui/chartanimation/ChartAnimationPresenter";
import {Button} from "../ui/components/button/Button";

export class ResumePauseCommand implements Command {

    animationPresenter: ChartAnimationPresenter;
    button: Button;
    startTemplate : Template
    resumeTemplate : Template;
    pauseTemplate : Template;

    constructor(animationPresenter : ChartAnimationPresenter, button : Button) {
        this.animationPresenter = animationPresenter;
        this.button = button;
        this.resumeTemplate = new ResumeButtonTemplate();
        this.pauseTemplate = new PauseButtonTemplate();
        this.startTemplate = this.resumeTemplate;
    }

    execute(map: Map<string, any>): void {

        if(!this.animationPresenter.isRunning()) {
            Logger.getInstance().info("Starting the animation.")
            this.animationPresenter.start();
        } else if(this.animationPresenter.hasPaused()) {
            Logger.getInstance().info("Resuming the animation.")
            this.animationPresenter.resume();
        } else {
            Logger.getInstance().info("Pausing the animation.")
            this.animationPresenter.pause();
        }

        if(this.animationPresenter.isRunning()) {
            this.button.setTemplate(this.pauseTemplate);
            this.button.initialize();
        } else {
            this.button.setTemplate(this.resumeTemplate);
            this.button.initialize();
        }
    }

}