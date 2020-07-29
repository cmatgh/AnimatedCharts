import {UIElementFactory} from "../../../../main/typescript/animatedcharts/utility/creating/ui/UIElementFactory";
import {instance, mock, verify, when} from "ts-mockito";
import { expect } from "chai";
import {ComponentKit} from "../../../../main/typescript/animatedcharts/utility/creating/ui/kits/ComponentKit";
import {NullError} from "../../../../main/typescript/animatedcharts/utility/NullError";
import {ElementComposer} from "../../../../main/typescript/animatedcharts/utility/creating/ui/ElementComposer";
import {Presenter} from "../../../../main/typescript/animatedcharts/ui/Presenter";
import {View} from "../../../../main/typescript/animatedcharts/ui/View";
import {Template} from "../../../../main/typescript/animatedcharts/ui/Template";

describe("UIElementFactorySpec", () => {

    let elementComposerMock : ElementComposer;
    let elementComposer : ElementComposer;

    beforeEach(() => {
        elementComposerMock = mock(ElementComposer);
        elementComposer = instance(elementComposerMock);
    })

    afterEach(() => {
        UIElementFactory.clear();
    })

    describe("constructor", () => {
        it("should throw NullError when parameter is null", () => {
            expect(() => new UIElementFactory(null)).to.throw(NullError);
        })
    })

    describe("createElement", () => {

        it("should throw error when type does not exist", () => {
            // given
            const factory = new UIElementFactory(elementComposer);

            // then
            expect(() => factory.createElement("sometype")).to.throw(Error);
            expect(() => factory.createElement(null)).to.throw(Error);
        });


        it("should throw error when no matching handler found", () => {
            // given
            const componentKitMock = mock<ComponentKit>();
            const componentKit = instance(componentKitMock);

            UIElementFactory.add("othertype", componentKit);

            const factory = new UIElementFactory(elementComposer);

            // then
            expect(() => factory.createElement("sometype")).to.throw(Error);
        });

        it("should return the presenter when handler found", () => {
            // given
            const presenterMock = instance(mock<Presenter>());
            const viewMock = instance(mock<View>());
            const templateMock = instance(mock<Template>());

            const componentKitMock = mock<ComponentKit>();
            const componentKit = instance(componentKitMock);

            when(componentKitMock.createPresenter())
                .thenReturn(presenterMock);
            when(componentKitMock.createView())
                .thenReturn(viewMock);
            when(componentKitMock.createTemplate())
                .thenReturn(templateMock);

            when(elementComposerMock.create(presenterMock, viewMock, templateMock))
                .thenReturn(presenterMock)
            UIElementFactory.add("type", componentKit);
            const factory = new UIElementFactory(elementComposer);

            // when
            const presenter = factory.createElement("type");

            // then
            expect(presenter).to.be.eq(presenterMock);
            verify(componentKitMock.createPresenter()).once();
            verify(componentKitMock.createTemplate()).once();
            verify(componentKitMock.createTemplate()).once();
            verify(elementComposerMock.create(presenterMock, viewMock, templateMock)).once();
        });

    });
});