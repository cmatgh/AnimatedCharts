import {DataObject} from "../../animation/Animation";

export interface Transformer {
    execute(dataObject : DataObject) : DataObject;
}