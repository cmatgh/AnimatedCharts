import {TemplateFactory} from "./TemplateFactory";
import {Template} from "../../../interfaces/Template";
import {DefaultButtonTemplate} from "../../../ui/components/button/templates/DefaultButtonTemplate";
import {CheckboxTemplate} from "../../../ui/components/checkbox/templates/CheckboxTemplate";
import {FileDialogTemplate} from "../../../ui/components/filedialog/FileDialogTemplate";
import {RangeTemplate} from "../../../ui/components/range/RangeTemplate";
import {SelectTemplate} from "../../../ui/components/select/SelectTemplate";

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

    createRangeTemplate(): Template {
        return new RangeTemplate();
    }

    createSelectTemplate(): Template {
        return new SelectTemplate();
    }

}