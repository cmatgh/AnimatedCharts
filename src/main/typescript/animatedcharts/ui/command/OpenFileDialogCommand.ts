import {Command} from "./Command";
import {Animation} from "../../animation/Animation";
import {ParserFactory} from "../../utility/parsing/ParserFactory";
import {Logger} from "../../utility/logging/Logger";

export class OpenFileDialogCommand implements Command {

    logger: Logger = Logger.getInstance();
    openFileElement : JQuery;
    animation: Animation;
    parserFactory: ParserFactory;

    constructor(animation: Animation) {
        this.animation = animation;
        this.parserFactory = new ParserFactory();
        this.openFileElement = $("<input>");
        this.openFileElement.attr("type", "file");
        this.openFileElement.attr("accept", this.parserFactory.getTypes().map( type => "." +type).join(","));
        this.openFileElement.on("change", (event: Event) => this.loadContent(event) );
    }

    execute(event: Event): void {
        this.openFileElement.trigger("click", this.loadContent);
    }

    private loadContent(event: Event) {
        // @ts-ignore
        let file : File = event.target.files[0];
        let fileType = this.getFileType(file.name);
        let parser = this.parserFactory.create(fileType);
        let stringPromise = file.text();
        this.logger.debug("opening " + file.name + "...");
        stringPromise.then( text => {
            this.logger.debug("file opened.");
            let data = parser.parse(Buffer.from(text));
            this.animation.setDataObject(data);
            this.animation.notifyAnimationObjects();
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