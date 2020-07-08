
export interface FrameData {

    getCurrentFrame() : number;

    getSampleSize() : number;

    getProperty() : string;

    getFrameDataSet() : ChartData[];

}
export interface ChartData {
    label : string,
    color : number[],
    value: number
}

