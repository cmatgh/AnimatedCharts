import { expect } from "chai";
import {DefaultTemplateFactory} from "../../../../main/typescript/animatedcharts/utility/creating/ui/DefaultTemplateFactory";
import {DefaultButtonTemplate} from "../../../../main/typescript/animatedcharts/ui/components/button/templates/DefaultButtonTemplate";
import {CheckboxTemplate} from "../../../../main/typescript/animatedcharts/ui/components/checkbox/templates/CheckboxTemplate";
import {FileDialogTemplate} from "../../../../main/typescript/animatedcharts/ui/components/filedialog/FileDialogTemplate";
import {RangeTemplate} from "../../../../main/typescript/animatedcharts/ui/components/range/RangeTemplate";
import {SelectTemplate} from "../../../../main/typescript/animatedcharts/ui/components/select/SelectTemplate";

describe("DefaultTemplateFactory", () => {

    describe("create methods", () => {
        it("should return the correct template", () => {
            const defaultTemplateFactory = new DefaultTemplateFactory();

            expect(defaultTemplateFactory.createButtonTemplate()).to.be.instanceOf(DefaultButtonTemplate);
            expect(defaultTemplateFactory.createCheckboxTemplate()).to.be.instanceOf(CheckboxTemplate);
            expect(defaultTemplateFactory.createFileDialogTemplate()).to.be.instanceOf(FileDialogTemplate);
            expect(defaultTemplateFactory.createRangeTemplate()).to.be.instanceOf(RangeTemplate);
            expect(defaultTemplateFactory.createSelectTemplate()).to.be.instanceOf(SelectTemplate);
        });
    });

});