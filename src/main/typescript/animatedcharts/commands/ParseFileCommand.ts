import {Command} from "../interfaces/Command";
import {Logger} from "../utility/logging/Logger";
import {ChartAnimationPresenter} from "../ui/chartanimation/ChartAnimationPresenter";
import {FileParser} from "../utility/parsing/FileParser";
import {DataTransformation} from "../utility/transforming/DataTransformation";

export class ParseFileCommand implements Command {

    animationPresenter: ChartAnimationPresenter

    constructor(animationPresenter: ChartAnimationPresenter) {
        this.animationPresenter = animationPresenter;
    }

    execute(map: Map<string, any>): void {
        console.log(map);
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