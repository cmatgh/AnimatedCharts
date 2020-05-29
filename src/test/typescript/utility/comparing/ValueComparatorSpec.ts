import {FrameDataSet} from "../../../../main/typescript/animatedcharts/animation/Animation";
import {ValueComparator} from "../../../../main/typescript/animatedcharts/utility/comparing/ValueComparator";
import { expect } from "chai";

describe("Value Comparator", () => {

    let valueComparator: ValueComparator;
    let o1: FrameDataSet;
    let o2: FrameDataSet;

    beforeEach( () => {
        valueComparator = new ValueComparator();
        o1 = {
            color: [],
            label: "",
            value: 0
        }
        o2 = {
            color: [],
            label: "",
            value: 0
        }
    });

    describe("compare", () => {

        it("should return 0 when both values are equal", () => {
            // given
            o1.value = 10;
            o2.value = 10;

            // when
            const result = valueComparator.compare(o1,o2);

            // then
            expect(result).to.be.eq(0);
        });

        it("should return less than 0 when o1 is smaller than o2", () => {
            // given
            o1.value = -10;
            o2.value = 10;

            // when
            const result = valueComparator.compare(o1,o2);

            // then
            expect(result).to.be.lessThan(0);
        });

        it("should return greater than 0 when o1 is bigger than o2", () => {
            // given
            o1.value = 100;
            o2.value = 10;

            // when
            const result = valueComparator.compare(o1,o2);

            // then
            expect(result).to.be.greaterThan(0);
        });
    });

});