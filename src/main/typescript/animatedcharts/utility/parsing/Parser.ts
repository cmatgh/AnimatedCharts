import { DataObject } from "../../animation/Animation";

export interface Parser {
    parse(buffer: Buffer, type : string) : DataObject;
}