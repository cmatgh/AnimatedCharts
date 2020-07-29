import {instance, mock, verify} from "ts-mockito";
import {Presenter} from "../../../../main/typescript/animatedcharts/ui/Presenter";
import {View} from "../../../../main/typescript/animatedcharts/ui/View";
import {Template} from "../../../../main/typescript/animatedcharts/ui/Template";
import {ElementComposer} from "../../../../main/typescript/animatedcharts/utility/creating/ui/ElementComposer";

describe("ElementComposer", () => {

    beforeEach( () => {

    });

    describe("create", () => {
        it("should setup presenter composition in correct order", () => {
            // given
            const presenterMock = mock<Presenter>();
            const presenter = instance(presenterMock);
            const viewMock = mock<View>();
            const view = instance(viewMock);
            const templateMock = mock<Template>();
            const template = instance(templateMock);

            const elementComposer = new ElementComposer();

            // when
            elementComposer.create(presenter, view, template);

            verify(presenterMock.setView(view)).once();
            verify(viewMock.setPresenter(presenter)).once();
            verify(viewMock.setTemplate(template)).once();
            verify(presenterMock.initialize()).once();

            verify(presenterMock.setView(view)).calledBefore(presenterMock.initialize());
            verify(viewMock.setPresenter(presenter)).calledBefore(presenterMock.initialize());
            verify(viewMock.setTemplate(template)).calledBefore(presenterMock.initialize());
        });
    });

});