export interface ParsingStrategy {

    parse(buffer: Buffer) : object[][];

}