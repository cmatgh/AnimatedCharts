import {TemplateFactory} from "../../../../../main/typescript/animatedcharts/utility/creating/ui/TemplateFactory";
import {instance, mock, verify, when} from "ts-mockito";
import { expect } from "chai";
import {SelectKit} from "../../../../../main/typescript/animatedcharts/utility/creating/ui/kits/SelectKit";
import {SelectPresenter} from "../../../../../main/typescript/animatedcharts/ui/input/select/SelectPresenter";
import {SelectView} from "../../../../../main/typescript/animatedcharts/ui/input/select/SelectView";
import {SelectTemplate} from "../../../../../main/typescript/animatedcharts/ui/input/select/SelectTemplate";

describe("SelectKit", () => {

    let selectKit : SelectKit;
    let templateFactoryMock: TemplateFactory;
    let templateFactory: TemplateFactory;

    beforeEach( () => {
        templateFactoryMock = mock<TemplateFactory>();
        templateFactory = instance(templateFactoryMock);
        selectKit = new SelectKit(templateFactory);
    });


    describe("create methods", () => {
        it("should return the correct presenter", () => {
            expect(selectKit.createPresenter()).to.be.instanceOf(SelectPresenter);
        });

        it("should return the correct view", () => {
            expect(selectKit.createView()).to.be.instanceOf(SelectView);
        });

        it("should return the correct template", () => {
            const template = new SelectTemplate();
            when(templateFactoryMock.createSelectTemplate())
                .thenReturn(template);

            expect(selectKit.createTemplate()).to.be.eq(template);
            verify(templateFactoryMock.createSelectTemplate()).once();
        });
    });

});