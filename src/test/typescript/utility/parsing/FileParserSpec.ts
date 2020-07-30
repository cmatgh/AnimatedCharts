import {FileParser} from "../../../../main/typescript/animatedcharts/utility/parsing/FileParser";
import { expect } from "chai";
import {anything, instance, mock, verify, when} from "ts-mockito";
import {ParsingStrategy} from "../../../../main/typescript/animatedcharts/utility/parsing/ParsingStrategy";
import {NullError} from "../../../../main/typescript/animatedcharts/utility/NullError";
import {DataObject} from "../../../../main/typescript/animatedcharts/animation/Animation";
import {FrameDataImpl} from "../../../../main/typescript/animatedcharts/animation/data/FrameDataImpl";

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
            expect(() => fileParser.parse(null, "type")).to.throw(NullError);
            expect(() => fileParser.parse(Buffer.from([]), null)).to.throw(NullError);
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
            const frameData1 = new FrameDataImpl();
            frameData1.setSampleSize(2);
            frameData1.setCurrentFrame(0);
            frameData1.setProperty("property1");
            frameData1.setFrameDataSet([
                {color : [0,0,0], label : "label1", value : 1},
                {color : [255,255,255], label : "label2", value : 3},
            ]);

            const frameData2 = new FrameDataImpl();
            frameData2.setSampleSize(2);
            frameData2.setCurrentFrame(1);
            frameData2.setProperty("property2");
            frameData2.setFrameDataSet([
                {color : [0,0,0], label : "label1", value : 2},
                {color : [255,255,255], label : "label2", value : 4},
            ]);

            const expected = {
                frameData : [frameData1, frameData2],
                entriesCount : 2,
                samplesCount : 2,
            } as DataObject;

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

            const frameData1 = new FrameDataImpl();
            frameData1.setSampleSize(2);
            frameData1.setCurrentFrame(0);
            frameData1.setProperty("property1");
            frameData1.setFrameDataSet([
                {color : [], label : "label1", value : 1},
                {color : [255,255,255], label : "label2", value : 3},
            ]);

            const frameData2 = new FrameDataImpl();
            frameData2.setSampleSize(2);
            frameData2.setCurrentFrame(1);
            frameData2.setProperty("property2");
            frameData2.setFrameDataSet([
                {color : [], label : "label1", value : 2},
                {color : [255,255,255], label : "label2", value : 4},
            ]);

            const expected = {
                samplesCount : 2,
                entriesCount : 2,
                frameData : [frameData1, frameData2]
            } as DataObject;

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