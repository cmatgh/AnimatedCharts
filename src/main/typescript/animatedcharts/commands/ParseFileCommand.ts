import {Command} from "../interfaces/Command";
import {Logger} from "../utility/logging/Logger";
import {AnimationPresenter} from "../ui/animation/AnimationPresenter";
import {FileParser} from "../utility/parsing/FileParser";
import {DataTransformation} from "../utility/transforming/DataTransformation";

export class ParseFileCommand implements Command {

    animationPresenter: AnimationPresenter

    constructor(animationPresenter: AnimationPresenter) {
        this.animationPresenter = animationPresenter;
    }

    execute(map: Map<string, any>): void {
        Logger.getInstance().info("Getting file from file dialog.");
        let file = map.get("event").target.files[0];
        let parser = new FileParser();

        file.arrayBuffer().then( arrayBuffer => {
            Logger.getInstance().info("Parsing file");
            let data = parser.parse(Buffer.from(arrayBuffer), file.type);
            Logger.getInstance().info("Parsing file completed");

            Logger.getInstance().info("Transforming data object");
            data = DataTransformation.apply(data);
            Logger.getInstance().info("Transforming data object completed");

            this.animationPresenter.loadDataset(data);
        });
    }
}