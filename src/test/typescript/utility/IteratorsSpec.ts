import {FrameDataImpl} from "../../../main/typescript/animatedcharts/animation/data/FrameDataImpl";
import {FrameData} from "../../../main/typescript/animatedcharts/animation/data/FrameData";
import { expect } from "chai";
import {Iterators} from "../../../main/typescript/animatedcharts/utility/Iterators";

describe("Iterators", () => {

    describe("default", () => {

        describe("hasNext", () => {
            it("should return false when list empty", () => {
                const frameData = createFrameData([]);
                const iterator = Iterators.default(frameData);

                expect(iterator.hasNext()).to.be.false;
            });

            it("should return true if not at end of list", () => {
                const frameData = createFrameData([1,2]);
                const iterator = Iterators.default(frameData);

                expect(iterator.hasNext()).to.be.true;
            });

            it("should return false if at end of list", () => {
                const frameData = createFrameData([1,2]);
                const iterator = Iterators.default(frameData);
                iterator.getNext();
                iterator.getNext();

                expect(iterator.hasNext()).to.be.false;
            });
        });

        describe("getNext", () => {
            it("should throw error an when list is empty", () => {
                const frameData = createFrameData([]);
                const iterator = Iterators.default(frameData);

                expect(() => iterator.getNext()).to.throw("No such element.");
            });

            it("should return element if not at end of list", () => {
                const frameData = createFrameData([1,2,3]);
                const iterator = Iterators.default(frameData);

                expect(iterator.getNext().getProperty()).to.be.eq("1");
                expect(iterator.getNext().getProperty()).to.be.eq("2");
                expect(iterator.getNext().getProperty()).to.be.eq("3");
            });

            it("should return throw error if at end of list", () => {
                const frameData = createFrameData([1,2]);
                const iterator = Iterators.default(frameData);
                iterator.getNext();
                iterator.getNext();

                expect(() => iterator.getNext()).to.throw("No such element.");
            });
        });

        describe("offset parameter", () => {
            it("should throw an error when offset is not in range", () => {
                expect(() => Iterators.default([], 0)).to.throw("Position out of range.");
                expect(() => Iterators.default([1,2,3], -2)).to.throw("Position out of range.");
                expect(() => Iterators.default([1,2,3], 3)).to.throw("Position out of range.");
            });


            it("should return element at correct position when calling getNext", () => {
                const frameData = createFrameData([1,2,3]);
                const iterator = Iterators.default(frameData, 2);

                expect(iterator.getNext().getProperty()).to.be.eq("3");
            });

        });
    })

       describe("cyclic", () => {

           it("should throw error when array is empty", () => {
               expect(() => Iterators.cyclic([])).to.throw("Array may not be empty.");
           });

        describe("hasNext", () => {
            it("should return true if not at end of list", () => {
                const frameData = createFrameData([1,2]);
                const iterator = Iterators.cyclic(frameData);

                expect(iterator.hasNext()).to.be.true;
            });

            it("should return true if at end of list", () => {
                const frameData = createFrameData([1,2]);
                const iterator = Iterators.cyclic(frameData);
                iterator.getNext();
                iterator.getNext();

                expect(iterator.hasNext()).to.be.true;
            });
        });

        describe("getNext", () => {

            it("should return element if not at end of list", () => {
                const frameData = createFrameData([1,2,3]);
                const iterator = Iterators.cyclic(frameData);

                expect(iterator.getNext().getProperty()).to.be.eq("1");
                expect(iterator.getNext().getProperty()).to.be.eq("2");
                expect(iterator.getNext().getProperty()).to.be.eq("3");
            });

            it("should return first element when at end of list", () => {
                const frameData = createFrameData([1,2]);
                const iterator = Iterators.cyclic(frameData);
                iterator.getNext();
                iterator.getNext();

                expect(iterator.getNext().getProperty()).to.be.eq("1");
            });
        });

        describe("offset parameter", () => {
            it("should throw an error when offset is not in range", () => {
                expect(() => Iterators.cyclic([1,2,3], -2)).to.throw("Position out of range.");
                expect(() => Iterators.cyclic([1,2,3], 3)).to.throw("Position out of range.");
            });


            it("should return element at correct position when calling getNext", () => {
                let frameData = createFrameData([1,2,3]);
                let iterator = Iterators.cyclic(frameData, 0);

                expect(iterator.getNext().getProperty()).to.be.eq("1");

                frameData = createFrameData([1,2,3]);
                iterator = Iterators.cyclic(frameData, 1);

                expect(iterator.getNext().getProperty()).to.be.eq("2");

                frameData = createFrameData([1,2,3]);
                iterator = Iterators.cyclic(frameData, 2);

                expect(iterator.getNext().getProperty()).to.be.eq("3");
            });

        });
    })



    function createFrameData(data : number[]) : FrameData[] {
        return data.map(d => {
            const frameData = new FrameDataImpl();
            frameData.setProperty(d.toString());
            frameData.setFrameDataSet(null)
            return frameData;
        });

    }
});