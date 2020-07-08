import {UIElementFactory} from "../../../../main/typescript/animatedcharts/utility/creating/ui/UIElementFactory";
import {CreationHandler} from "../../../../main/typescript/animatedcharts/utility/creating/ui/handler/CreationHandler";
import {instance, mock, verify, when} from "ts-mockito";
import { expect } from "chai";
import {InputPresenter} from "../../../../main/typescript/animatedcharts/ui/input/InputPresenter";

describe("UIElementFactorySpec", () => {

    afterEach(() => {
        UIElementFactory.clear();
    })

    describe("add", () => {

        it("should add creation handler", () => {
            // given
            const handlerMock = mock(CreationHandler);
            const handler = instance(handlerMock);

            // when
            UIElementFactory.add(handler);

            // then
            verify(handlerMock.setNext(null)).once();
        });


        it("should add more creation handler successfully", () => {
            // given
            const handlerMock1 = mock(CreationHandler);
            const handler1 = instance(handlerMock1);

            const handlerMock2 = mock(CreationHandler);
            const handler2 = instance(handlerMock2);
            UIElementFactory.add(handler1);

            // when
            UIElementFactory.add(handler2);

            // then
            verify(handlerMock1.setNext(null)).once();
            verify(handlerMock2.setNext(handler1)).once();
        });

    });

    describe("createElement", () => {

        it("should throw error when no handlers added", () => {
            // given
            const factory = new UIElementFactory();

            // then
            expect(() => factory.createElement("sometype")).to.throw(Error);
        });


        it("should throw error when no matching handler found", () => {
            // given
            const handlerMock = mock(CreationHandler);
            const handler = instance(handlerMock);
            when(handlerMock.handle("sometype")).thenReturn(null)
            const factory = new UIElementFactory();

            // then
            expect(() => factory.createElement("sometype")).to.throw(Error);
        });

        it("should return the presenter when handler found", () => {
            // given
            const handlerMock = mock(CreationHandler);
            const handler = instance(handlerMock);
            const inputPresenter = mock(InputPresenter);
            when(handlerMock.handle("sometype")).thenReturn(inputPresenter)
            UIElementFactory.add(handler);
            const factory = new UIElementFactory();

            // when
            const presenter = factory.createElement("sometype");
            // then
            expect(presenter).to.be.eq(inputPresenter);
        });

    });
});