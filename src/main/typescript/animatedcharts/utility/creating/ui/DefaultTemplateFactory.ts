import {TemplateFactory} from "./TemplateFactory";
import {Template} from "../../../interfaces/Template";
import {DefaultButtonTemplate} from "../../../ui/input/button/templates/DefaultButtonTemplate";
import {CheckboxTemplate} from "../../../ui/input/checkbox/CheckboxTemplate";
import {FileDialogTemplate} from "../../../ui/input/filedialog/FileDialogTemplate";
import {MultiSelectTemplate} from "../../../ui/input/multiselect/MultiSelectTemplate";
import {RangeTemplate} from "../../../ui/input/range/RangeTemplate";
import {SelectTemplate} from "../../../ui/input/select/SelectTemplate";
import {TextfieldTemplate} from "../../../ui/input/textfield/TextfieldTemplate";

/**
 * Abstract factory design pattern
 *
 * Participants:
 *      AbstractFactory : {@link TemplateFactory}
 *      ConcreteFactory: {@link DefaultTemplateFactory}
 *      AbstractProduct: {@link Template}
 *      ConcreteProduct: Concrete classes: {@link DefaultButtonTemplate}, {@link CheckboxTemplate}, {@link FileDialogTemplate}
 *      {@link MultiSelectTemplate}, {@link RangeTemplate}, {@link SelectTemplate}, {@link TextfieldTemplate}
 *      Client: UIElementFactory
 *
 */
export class DefaultTemplateFactory extends TemplateFactory {

    createButtonTemplate(): Template {
        return new DefaultButtonTemplate();
    }

    createCheckboxTemplate(): Template {
        return new CheckboxTemplate();
    }

    createFileDialogTemplate(): Template {
        return new FileDialogTemplate();
    }

    createMultiselectTemplate(): Template {
        return new MultiSelectTemplate();
    }

    createRangeTemplate(): Template {
        return new RangeTemplate();
    }

    createSelectTemplate(): Template {
        return new SelectTemplate();
    }

    createTextfieldTemplate(): Template {
        return new TextfieldTemplate();
    }

}