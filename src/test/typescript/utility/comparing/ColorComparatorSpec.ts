import { expect } from "chai";
import {ColorComparator} from "../../../../main/typescript/animatedcharts/utility/comparing/ColorComparator";
import {ChartData} from "../../../../main/typescript/animatedcharts/animation/data/FrameData";

describe("Color Comparator", () => {

    let colorComparator: ColorComparator;
    let o1: ChartData;
    let o2: ChartData;

    beforeEach( () => {
        colorComparator = new ColorComparator();
        o1 = {
            color: [],
            label: "some label",
            value: 5
        }
        o2 = {
            color: [],
            label: "some other label",
            value: 6
        }
    });

    /**
     * IMPORTANT: colors stored in the frame data set are stored as rgb values
     */
    describe("compare", () => {

        it("should return 0 on equal colors", () => {
            // given
            o1.color = [150,150,150];
            o2.color = [150,150,150];

            // when
            const result = colorComparator.compare(o1, o2);

            // then
            expect(result).to.be.eq(0);
        });

        it("should return greater than 0 when o1 is brighter", () => {
            // given, with o1 brighter then o2
            o1.color = [250,250,250];
            o2.color = [150,150,150];

            // when
            const result = colorComparator.compare(o1, o2);

            // then
            expect(result).to.be.greaterThan(0);
        });

        it("should return less then 0 when o1 is darker", () => {
            // given
            o1.color = [149,149,149];
            o2.color = [150,150,150];

            // when
            const result = colorComparator.compare(o1, o2);

            // then
            expect(result).to.lessThan(0);
        });

        it("red should be before green", () => {
            // given
            o1.color = [255,0,0];
            o2.color = [0,255,0];

            // when
            const result = colorComparator.compare(o1, o2);

            // then
            expect(result).to.lessThan(0);
        });

        it("red should be before blue", () => {
            // given
            o1.color = [255,0,0];
            o2.color = [0,0,255];

            // when
            const result = colorComparator.compare(o1, o2);

            // then
            expect(result).to.lessThan(0);
        });

        it("green should be before blue", () => {
            // given
            o1.color = [0,255,0];
            o2.color = [0,0,255];

            // when
            const result = colorComparator.compare(o1, o2);

            // then
            expect(result).to.lessThan(0);
        });
    });

});