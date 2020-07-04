export interface ParsingStrategy {

    parseRows(buffer: Buffer) : object[][];

}