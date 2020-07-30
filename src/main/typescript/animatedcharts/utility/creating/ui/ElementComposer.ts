import {Presenter} from "../../../interfaces/Presenter";
import {View} from "../../../interfaces/View";
import {Template} from "../../../interfaces/Template";
import {Preconditions} from "../../Preconditions";

export class ElementComposer {

    public create<P extends Presenter>(presenter : Presenter, view : View, template : Template): P {
        Preconditions.checkNotNull(presenter);
        Preconditions.checkNotNull(view);
        Preconditions.checkNotNull(template);

        presenter.setView(view)
        view.setPresenter(presenter);
        view.setTemplate(template);
        presenter.initialize();

        return <P> presenter;
    }

}