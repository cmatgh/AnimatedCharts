import { expect } from "chai";
import {Comparator} from "../../../../main/typescript/animatedcharts/utility/comparing/Comparator";
import {ComparatorUtils} from "../../../../main/typescript/animatedcharts/utility/comparing/ComparatorUtils";

describe("ComparatorUtils", () => {

    describe("reverse", () => {
        it("should give a result of zero if the original comparator returns zero", () => {
            // given
            const comparator = new (class TestComparator implements Comparator<any> {
                compare(o1: any, o2: number): any {
                    return 0;
                }
            })

            // when
           const reversedComparator = ComparatorUtils.reverse(comparator);

            // then
            expect(reversedComparator.compare({},{})).to.be.eq(0);

        });

        it("should return the inverse when the original comparator returns a positive number", () => {
            // given
            const comparator = new (class TestComparator implements Comparator<any> {
                compare(o1: any, o2: number): any {
                    return 5;
                }
            })

            // when
           const reversedComparator = ComparatorUtils.reverse(comparator);

            // then
            expect(reversedComparator.compare({},{})).to.be.eq(-5);

        });

        it("should return the inverse when the original comparator returns a negative number", () => {
            // given
            const comparator = new (class TestComparator implements Comparator<any> {
                compare(o1: any, o2: number): any {
                    return -5;
                }
            })

            // when
           const reversedComparator = ComparatorUtils.reverse(comparator);

            // then
            expect(reversedComparator.compare({},{})).to.be.eq(5);

        })
    });

});