import { expect } from "chai";
import {ColorComparator} from "../../../../main/typescript/animatedcharts/utility/comparing/ColorComparator";
import {FrameDataSet} from "../../../../main/typescript/animatedcharts/animation/Animation";
import {LabelComparator} from "../../../../main/typescript/animatedcharts/utility/comparing/LabelComparator";

describe("Label Comparator", () => {

    let labelComparator: LabelComparator;
    let o1: FrameDataSet;
    let o2: FrameDataSet;

    beforeEach( () => {
        labelComparator = new LabelComparator();
        o1 = {
            color: [],
            label: "",
            value: 5
        }
        o2 = {
            color: [],
            label: "",
            value: 6
        }
    });

    describe("compare", () => {

        it("should return 0 on equal labels", () => {
            // given
            o1.label = "label";
            o2.label = "label";

            // when
            const result = labelComparator.compare(o1, o2);

            // then
            expect(result).to.be.eq(0);
        });

        it("should return less than 0 when o1 is lexicographical before o2", () => {
            // given
            o1.label = "aabb";
            o2.label = "abb";

            // when
            const result = labelComparator.compare(o1, o2);

            // then
            expect(result).to.be.lessThan(0);
        });

        it("should return greater than 0 when o1 is lexicographical after o2", () => {
            // given
            o1.label = "bbAA";
            o2.label = "aaBB";

            // when
            const result = labelComparator.compare(o1, o2);

            // then
            expect(result).to.be.greaterThan(0);
        });
    });

});