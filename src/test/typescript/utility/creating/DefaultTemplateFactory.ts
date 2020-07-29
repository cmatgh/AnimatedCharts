import { expect } from "chai";
import {DefaultTemplateFactory} from "../../../../main/typescript/animatedcharts/utility/creating/ui/DefaultTemplateFactory";
import {DefaultButtonTemplate} from "../../../../main/typescript/animatedcharts/ui/input/button/templates/DefaultButtonTemplate";
import {CheckboxTemplate} from "../../../../main/typescript/animatedcharts/ui/input/checkbox/CheckboxTemplate";
import {FileDialogTemplate} from "../../../../main/typescript/animatedcharts/ui/input/filedialog/FileDialogTemplate";
import {MultiSelectTemplate} from "../../../../main/typescript/animatedcharts/ui/input/multiselect/MultiSelectTemplate";
import {RangeTemplate} from "../../../../main/typescript/animatedcharts/ui/input/range/RangeTemplate";
import {SelectTemplate} from "../../../../main/typescript/animatedcharts/ui/input/select/SelectTemplate";
import {TextfieldTemplate} from "../../../../main/typescript/animatedcharts/ui/input/textfield/TextfieldTemplate";

describe("DefaultTemplateFactory", () => {

    describe("create methods", () => {
        it("should return the correct template", () => {
            const defaultTemplateFactory = new DefaultTemplateFactory();

            expect(defaultTemplateFactory.createButtonTemplate()).to.be.instanceOf(DefaultButtonTemplate);
            expect(defaultTemplateFactory.createCheckboxTemplate()).to.be.instanceOf(CheckboxTemplate);
            expect(defaultTemplateFactory.createFileDialogTemplate()).to.be.instanceOf(FileDialogTemplate);
            expect(defaultTemplateFactory.createMultiselectTemplate()).to.be.instanceOf(MultiSelectTemplate);
            expect(defaultTemplateFactory.createRangeTemplate()).to.be.instanceOf(RangeTemplate);
            expect(defaultTemplateFactory.createSelectTemplate()).to.be.instanceOf(SelectTemplate);
            expect(defaultTemplateFactory.createTextfieldTemplate()).to.be.instanceOf(TextfieldTemplate);
        });
    });

});