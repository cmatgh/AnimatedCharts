import {Presenter} from "../../../ui/Presenter";
import {View} from "../../../ui/View";
import {Template} from "../../../ui/Template";

export class PresenterCreator {

    public create<P extends Presenter>(presenter : Presenter, view : View, template : Template): P {
        presenter.setView(view)
        view.setPresenter(presenter);
        view.setTemplate(template);
        presenter.initialize();

        return <P> presenter;
    }

}