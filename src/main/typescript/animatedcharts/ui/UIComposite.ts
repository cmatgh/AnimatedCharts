import {UIElement} from "./UIElement";

export interface UIComposite {

    addElement(element: UIElement): void;

    removeElement(element: UIElement): void;

    drawElements(): void;
}