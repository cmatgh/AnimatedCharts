import {Presenter} from "../../../interfaces/Presenter";
import {View} from "../../../interfaces/View";
import {Template} from "../../../interfaces/Template";
import {Preconditions} from "../../Preconditions";

/**
 * Facade for the creation of an ui element.
 *
 * <ul>
 *      Participants:
 *      <li>Facade: ElementComposer}</li>
 *      <li>subsystem classes : {@link Presenter},{@link View},{@link Template}</li>
 * </ul>
 */
export class ElementComposer {

    public create<P extends Presenter>(presenter : Presenter, view : View, template : Template): P {
        Preconditions.checkNotNull(presenter);
        Preconditions.checkNotNull(view);
        Preconditions.checkNotNull(template);

        presenter.setView(view)
        view.setPresenter(presenter);
        view.setTemplate(template);
        presenter.initialize();
        view.initialize();

        return <P> presenter;
    }

}