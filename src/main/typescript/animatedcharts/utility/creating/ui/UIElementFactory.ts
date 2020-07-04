import {CreationHandler} from "./handler/CreationHandler";
import {Presenter} from "../../../ui/Presenter";

export class UIElementFactory {

    private static creator : CreationHandler = null;

    public constructor() {
    }

    public static clear() {
        this.creator = null;
    }

    public static add(handler : CreationHandler) {
        handler.setNext(this.creator);
        this.creator = handler;
    }

    public createElement<P extends Presenter>(type : string) : P {
        if(UIElementFactory.creator != null) {
            const presenter = <P> UIElementFactory.creator.handle(type);

            if(presenter != null) {
                return presenter;
            }
        }

        throw new Error("UI element type does not exist");
    }

}