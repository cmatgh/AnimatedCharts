import {CreationHandler} from "./CreationHandler";
import {Presenter} from "../../../ui/Presenter";
import {View} from "../../../ui/View";

export class UIElementFactory {

    private static creator : CreationHandler;

    public constructor() {
    }

    public static add(handler : CreationHandler) {
        handler.setNext(this.creator);
        this.creator = handler;
    }

    public createElement<P extends Presenter<V>, V extends View>(type) : P {
        const presenter = <P> UIElementFactory.creator.handle(type);
        if(presenter != null) {
            return presenter;
        }

        throw new Error("UI element type does not exist");
    }

}