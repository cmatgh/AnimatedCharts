import {Presenter} from "../../../ui/Presenter";
import {ComponentKit} from "./kits/ComponentKit";
import {ElementComposer} from "./ElementComposer";
import {Preconditions} from "../../Preconditions";

export class UIElementFactory {

    private static kits = new Map<string, ComponentKit>();

    private elementComposer : ElementComposer;

    public constructor(elementComposer : ElementComposer) {
        Preconditions.checkNotNull(elementComposer);

        this.elementComposer = elementComposer;
    }

    public static clear() {
        this.kits = new Map<string, ComponentKit>();
    }

    public static add(type : string, kit : ComponentKit) {
        UIElementFactory.kits.set(type, kit);
    }

    public createElement<P extends Presenter>(type : string) : P {
        if(UIElementFactory.kits.has(type)) {
            const kit = UIElementFactory.kits.get(type);
            return this.elementComposer.create(
                kit.createPresenter(),
                kit.createView(),
                kit.createTemplate()
            );
        }

        throw new Error("UI element type does not exist");
    }

}