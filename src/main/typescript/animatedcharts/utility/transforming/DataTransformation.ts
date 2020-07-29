import {Transformer} from "./Transformer";
import {DataObject} from "../../animation/Animation";

export class DataTransformation {

    private static transformations : Set<Transformer> = new Set<Transformer>();

    static add(transformer : Transformer) : void {
        this.transformations.add(transformer);
    }

    static apply(dataObject : DataObject) : DataObject {

        this.transformations.forEach( transformation => {
            dataObject = transformation.execute(dataObject);
        })

        return dataObject;
    }

}