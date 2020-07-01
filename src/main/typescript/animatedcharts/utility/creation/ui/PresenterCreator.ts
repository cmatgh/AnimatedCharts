import {Presenter} from "../../../ui/Presenter";
import {View} from "../../../ui/View";
import {Template} from "../../../ui/Template";

export class PresenterCreator {

    public create<P extends Presenter<V>, V extends View>(presenter : P, view : V, template : Template): P {
        presenter.setView(view)
        view.setTemplate(template);
        presenter.initialize();

        return presenter;
    }

}