import { DataObject } from "../../animation/Animation";

export interface Parser {
    parse(buffer: Buffer) : DataObject;
}