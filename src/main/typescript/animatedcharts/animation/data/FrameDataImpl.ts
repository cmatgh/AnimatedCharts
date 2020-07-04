import {FrameDataSet} from "../Animation";

export class FrameDataImpl {
    private property: string;
    private data : FrameDataSet[];

    getProperty() : string {
        return this.property;
    }

    setProperty(property: string) : void {
        this.property = property;
    }

    getFrameDataSet() : FrameDataSet[] {
        return this.data;
    }

    setFrameDataSet(data : FrameDataSet[]) : void{
        this.data = data;
    }
}