import "mocha"
import { expect } from "chai";
import {OpenFileDialogCommand} from "../../../../main/typescript/animatedcharts/ui/command/OpenFileDialogCommand";


describe("OpenFileDialogCommand", () => {

    let openFileDialogCommand : OpenFileDialogCommand;

    beforeEach( () => {
        openFileDialogCommand = new OpenFileDialogCommand(null);
    });

    describe("execute", () => {
        it("has loaded the html after initialization", () => {;

        })
    });
});