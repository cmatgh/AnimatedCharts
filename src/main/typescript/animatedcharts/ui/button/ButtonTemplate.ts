import {HtmlTemplate} from "../HtmlTemplate";

export class ButtonTemplate extends HtmlTemplate {

    constructor() {
        super();

    }

    getTemplate(): string {
        return `
            <button type="button" class="btn btn-sm btn-primary btn-block mt-1 mb-1"></button>     
        `;
    }

}