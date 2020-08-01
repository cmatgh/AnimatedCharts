import {LabelComparator} from "./LabelComparator";
import {Comparator} from "../../interfaces/Comparator";
import {ColorComparator} from "./ColorComparator";
import {ValueComparator} from "./ValueComparator";
import {ChartData} from "../../animation/data/FrameData";

export class ComparatorFactory {

    private static chartFactory: ComparatorFactory = null;

    comparators : Map<string, Comparator<ChartData>>;

    private constructor() {
        this.comparators = new Map<string, Comparator<ChartData>>([
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

    create(type: string) : Comparator<ChartData> {
        if(this.comparators.has(type)){
            return this.comparators.get(type);
        }

        throw new Error("comparator type does not exist: " + type );
    }

}