import {Command} from "./Command";
import {Animation} from "../../animation/Animation";
import {ParserFactory} from "../../utility/parsing/ParserFactory";

export class OpenFileCommand implements Command {

    openFileElement : JQuery;
    animation: Animation;
    parserFactory: ParserFactory;

    constructor(animation: Animation) {
        this.animation = animation;
        this.parserFactory = new ParserFactory();
        this.openFileElement = $(document.createElement("input"));
        this.openFileElement.attr("type", "file");
        this.openFileElement.attr("accept", this.parserFactory.getTypes().map(type => "." + type).join(","));
        this.openFileElement.on("change", (event: Event) => this.loadContent(event))
    }

    execute(event: Event): void {
        this.openFileElement.trigger("click", this.loadContent);
    }

    private loadContent(event: Event) {
        // @ts-ignore
        console.log(event.target.files[0]);
        this.animation.setDataObject(null);
    }


}