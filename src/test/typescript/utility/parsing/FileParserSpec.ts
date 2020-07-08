import {FileParser} from "../../../../main/typescript/animatedcharts/utility/parsing/FileParser";
import { expect } from "chai";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {ParsingStrategy} from "../../../../main/typescript/animatedcharts/utility/parsing/ParsingStrategy";

describe("FileParser", () => {

    let parsingStrategyMock : ParsingStrategy;
    let parsingStrategyMockInstance : ParsingStrategy;
    let fileParser : FileParser;

    beforeEach( () => {
        parsingStrategyMock = mock<ParsingStrategy>();
        parsingStrategyMockInstance = instance(parsingStrategyMock);
        FileParser.add("sometype", parsingStrategyMockInstance);
        fileParser = new FileParser();
    });


    describe("parse", () => {

        it("should fail when one of the arguments is null", () => {
            expect(() => fileParser.parse(null, "type")).to.throw("May not be null.");
            expect(() => fileParser.parse(Buffer.from([]), null)).to.throw("May not be null.");
        })

        it("should fail when there is no parsing strategy", () => {
            // given
            const fileParser = new FileParser();

            // when
            expect(() => fileParser.parse(Buffer.from([]), "othertype")).to.throw("No parsing strategy for this type found.");
        });

        it("should fail when label is missing in the headline", () => {
            // given
            const data = [
                ["wrongheader", "color"]
            ];
            // @ts-ignore
            when(parsingStrategyMock.parse(anything())).thenReturn(data);

            // when
            expect(() => fileParser.parse(Buffer.from([]), "sometype" )).to.throw("Missing head field or wrong order. expected head line: 'label,color,...")
            verify(parsingStrategyMock.parse(anything())).once();
        });

        it("should fail when color is missing in the headline", () => {
            // given
            const data = [
                ["label", "wrongheader"]
            ];
            // @ts-ignore
            when(parsingStrategyMock.parse(anything())).thenReturn(data);

            // when
            expect(() => fileParser.parse(Buffer.from([]), "sometype" )).to.throw("Missing head field or wrong order. expected head line: 'label,color,...")
            verify(parsingStrategyMock.parse(anything())).once();
        });

        it("should fail when headline is missing", () => {
            // given
            // @ts-ignore
            when(parsingStrategyMock.parse(anything())).thenReturn([]);

            // when
            expect(() => fileParser.parse(Buffer.from([]), "sometype" )).to.throw("Missing head line");
            verify(parsingStrategyMock.parse(anything())).once();
        });

        it("should fail when the row is too short", () => {
            // given
            const data = [
                ["label", "color"],
                ["col1"]
            ];
            // @ts-ignore
            when(parsingStrategyMock.parse(anything())).thenReturn(data);

            // when
            expect(() => fileParser.parse(Buffer.from([]), "sometype" )).to.throw("Invalid format: line 2.");
            verify(parsingStrategyMock.parse(anything())).once();
        });

        it("should fail when the row is too long", () => {
            // given
            const data = [
                ["label", "color"],
                ["label1", "rgb(0,0,0)", "col3"],
                ["label2", "rgb(255,255,255)"]
            ];
            // @ts-ignore
            when(parsingStrategyMock.parse(anything())).thenReturn(data);

            // when
            expect(() => fileParser.parse(Buffer.from([]), "sometype" )).to.throw("Invalid format: line 2.");
            verify(parsingStrategyMock.parse(anything())).once();
        });

        it("should fail when color is not correctly formatted", () => {
            // given
            const data = [
                ["label", "color"],
                ["label1", "rgb(255,255,255)"],
                ["label2", "notAColor"]
            ];
            // @ts-ignore
            when(parsingStrategyMock.parse(anything())).thenReturn(data);

            // when
            expect(() => fileParser.parse(Buffer.from([]), "sometype" )).to.throw("Invalid color field. Valid format: rgb(xx,xxx,x).");
            verify(parsingStrategyMock.parse(anything())).once();
        });

        it("should succeed when input is correct", () => {
            // given
            const expected = {
                columnDefs : ["label", "color", "property1", "property2"],
                dataSets : [{label: "label1" ,color: [0,0,0], values: [1, 2]}, {label: "label2" ,color: [255,255,255], values: [3, 4]}],
                valuesLength : 2
            };
            const data = [
                ["label", "color", "property1", "property2"],
                ["label1", "rgb(0,0,0)", "1", "2"],
                ["label2", "rgb(255,255,255)", "3", "4"]
            ];
            // @ts-ignore
            when(parsingStrategyMock.parse(anything())).thenReturn(data);

            // when
            let result = fileParser.parse(Buffer.from([]), "sometype" );

            // then
            expect(result).to.deep.eq(expected);
            verify(parsingStrategyMock.parse(anything())).once();
        });

        it("should succeed when input is correct and color is empty", () => {
            // given
            const data = [
                ["label", "color", "property1", "property2"],
                ["label1", "", "1", "2"],
                ["label2", "rgb(255,255,255)", "3", "4"]
            ];
            const expected = {
                columnDefs : ["label", "color", "property1", "property2"],
                dataSets : [
                    {label: "label1" ,color: [], values: [1, 2]},
                    {label: "label2" ,color: [255,255,255], values: [3, 4]}
                    ],
                valuesLength : 2};
            // @ts-ignore
            when(parsingStrategyMock.parse(anything())).thenReturn(data);

            // when
            let result = fileParser.parse(Buffer.from([]), "sometype");

            // then
            expect(result).to.deep.eq(expected);
            verify(parsingStrategyMock.parse(anything())).once();
        });

    });

});