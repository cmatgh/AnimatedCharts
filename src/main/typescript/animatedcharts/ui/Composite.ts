import {Component} from "./Component";

export interface Composite {

    addElement(element: Component): void;

    removeElement(element: Component): void;

    getJQueryElement() : JQuery;

    buildJQueryStructure(): void;
}