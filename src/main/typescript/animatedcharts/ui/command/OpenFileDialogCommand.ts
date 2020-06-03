import {Command} from "./Command";
import {Animation} from "../../animation/Animation";
import {ParserFactory} from "../../utility/parsing/ParserFactory";
import * as fs from "fs";

export class OpenFileDialogCommand implements Command {

    openFileElement : JQuery;
    animation: Animation;
    parserFactory: ParserFactory;

    constructor(animation: Animation) {
        this.animation = animation;
        this.parserFactory = new ParserFactory();
        this.openFileElement = $(document.createElement("input"));
        this.openFileElement.attr("type", "file");
        this.openFileElement.attr("accept", this.parserFactory.getTypes().map( type => "." +type).join(","));
        this.openFileElement.on("change", (event: Event) => this.loadContent(event))
    }

    execute(event: Event): void {
        this.openFileElement.trigger("click", this.loadContent);
    }

    private loadContent(event: Event) {
        // @ts-ignore
        let file : File = event.target.files[0];
        let fileType = this.getFileType(file.name);
        let parser = this.parserFactory.create(fileType);
       // this.animation.setDataObject(parser.parse(Buffer.from(file)));
    }

    private getFileType(filename : string) : string {
        const extensionStart = filename.lastIndexOf(".");
        if(extensionStart >= 0) {
            return filename.substring(extensionStart, filename.length);
        }

        return "";
    }


}