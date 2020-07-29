import {ButtonKit} from "../../../../../main/typescript/animatedcharts/utility/creating/ui/kits/ButtonKit";
import {TemplateFactory} from "../../../../../main/typescript/animatedcharts/utility/creating/ui/TemplateFactory";
import {instance, mock, verify, when} from "ts-mockito";
import { expect } from "chai";
import {ButtonPresenter} from "../../../../../main/typescript/animatedcharts/ui/input/button/ButtonPresenter";
import {ButtonView} from "../../../../../main/typescript/animatedcharts/ui/input/button/ButtonView";
import {DefaultButtonTemplate} from "../../../../../main/typescript/animatedcharts/ui/input/button/templates/DefaultButtonTemplate";

describe("ButtonKit", () => {

    let buttonKit : ButtonKit;
    let templateFactoryMock: TemplateFactory;
    let templateFactory: TemplateFactory;

    beforeEach( () => {
        templateFactoryMock = mock<TemplateFactory>();
        templateFactory = instance(templateFactoryMock);
        buttonKit = new ButtonKit(templateFactory);
    });


    describe("create methods", () => {
        it("should return the correct presenter", () => {
            expect(buttonKit.createPresenter()).to.be.instanceOf(ButtonPresenter);
        });

        it("should return the correct view", () => {
            expect(buttonKit.createView()).to.be.instanceOf(ButtonView);
        });

        it("should return the correct template", () => {
            const template = new DefaultButtonTemplate();
            when(templateFactoryMock.createButtonTemplate())
                .thenReturn(template);

            expect(buttonKit.createTemplate()).to.be.eq(template);
            verify(templateFactoryMock.createButtonTemplate()).once();
        });
    });

});