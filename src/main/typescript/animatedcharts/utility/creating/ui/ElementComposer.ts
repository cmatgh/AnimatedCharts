import {Presenter} from "../../../ui/Presenter";
import {View} from "../../../ui/View";
import {Template} from "../../../ui/Template";
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