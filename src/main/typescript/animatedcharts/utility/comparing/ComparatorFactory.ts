import {LabelComparator} from "./LabelComparator";
import {Comparator} from "./Comparator";
import {FrameDataSet} from "../../animation/Animation";
import {ColorComparator} from "./ColorComparator";
import {ValueComparator} from "./ValueComparator";

export class ComparatorFactory {

    private static chartFactory: ComparatorFactory = null;

    comparators : Map<string, Comparator<FrameDataSet>>;

    private constructor() {
        this.comparators = new Map<string, Comparator<FrameDataSet>>([
                ["label", new LabelComparator()],
                ["color", new ColorComparator()],
                ["value", new ValueComparator()]
        ]);
    }

    public static getInstance(): ComparatorFactory {
        if(this.chartFactory == null) {
            this.chartFactory = new ComparatorFactory();
        }
        return this.chartFactory;
    }

    create(type: string) : Comparator<FrameDataSet> {
        if(this.comparators.has(type)){
            return this.comparators.get(type);
        }

        throw new Error("comparator type does not exist: " + type );
    }

}