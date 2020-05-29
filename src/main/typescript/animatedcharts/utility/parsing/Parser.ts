import { DataObject } from "../../animation/Animation";

export interface Parser {
    parse(data: string) : DataObject;
}