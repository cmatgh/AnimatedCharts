import {expect} from "chai";
import {FrameData} from "../../../../main/typescript/animatedcharts/animation/data/FrameData";
import {FrameDataImpl} from "../../../../main/typescript/animatedcharts/animation/data/FrameDataImpl";
import {CyclicRandomAccessIterator} from "../../../../main/typescript/animatedcharts/animation/data/CyclicRandomAccessIterator";

describe("FrameIterator", () => {

    describe("constructor", () => {
        it("should throw error when frame is out of range", () => {
            const frameData = createFrameData([1,2]);

            expect(() => new CyclicRandomAccessIterator(frameData, 2)).to.throw(RangeError);
            expect(() => new CyclicRandomAccessIterator([], -1)).to.throw(RangeError);
        });
    })

    describe("getCurrentFrame", () => {
        it("should return null if list is empty", () => {
            const frameData = createFrameData([]);
            const iterator = new CyclicRandomAccessIterator(frameData);

            expect(iterator.getCurrentFrame()).to.be.null;
        });

        it("should return correct value when  if list is empty", () => {
            const frameData = createFrameData([]);
            const iterator = new CyclicRandomAccessIterator(frameData);

            expect(iterator.getCurrentFrame()).to.be.null;
        });

        it("should return null when initialized", () => {
            const frameData = createFrameData([1,2]);
            const iterator = new CyclicRandomAccessIterator(frameData);

            expect(iterator.getCurrentFrame()).to.be.null;
        });

        it("should return correct value after calling getNext", () => {
            const frameData = createFrameData([1,2]);
            const iterator = new CyclicRandomAccessIterator(frameData);
            iterator.getNext()

            expect(iterator.getCurrentFrame().getProperty()).to.be.eq("1");
        });

        it("should return correct value when cycling", () => {
            const frameData = createFrameData([1,2,3]);
            const iterator = new CyclicRandomAccessIterator(frameData, 2);
            iterator.getNext();
            iterator.getNext();

            expect(iterator.getCurrentFrame().getProperty()).to.be.eq("1");
        });
    });

    describe("setFrame", () => {

        it("should throw error when out of range", () => {
            const frameData = createFrameData([1,2,3]);
            const iterator = new CyclicRandomAccessIterator(frameData);

            expect(() => iterator.setFrame(3)).to.throw(RangeError);
        });

        it("should return the correct element", () => {
            let frameData = createFrameData([1,2,3]);
            let iterator = new CyclicRandomAccessIterator(frameData, 0);

            expect(iterator.getNext().getProperty()).to.be.eq("1");

            frameData = createFrameData([1,2,3]);
            iterator = new CyclicRandomAccessIterator(frameData, 1);

            expect(iterator.getNext().getProperty()).to.be.eq("2");

            frameData = createFrameData([1,2,3]);
            iterator = new CyclicRandomAccessIterator(frameData, 2);

            expect(iterator.getNext().getProperty()).to.be.eq("3");

        });
    });

    function createFrameData(data : number[]) : FrameData[] {
        return data.map(d => {
            const frameData = new FrameDataImpl();
            frameData.setProperty(d.toString());
            frameData.setFrameDataSet(null)
            return frameData;
        });

    }
});