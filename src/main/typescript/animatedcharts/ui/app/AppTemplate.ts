import {HtmlTemplate} from "../HtmlTemplate";

export class AppTemplate extends HtmlTemplate {
    getTemplate(): string {
        return `
            <div>
                <div id="chart-animation1"></div>
                <div id="chart-animation2"></div>
                <div id="chart-animation3"></div>
            </div>        
        `;
    }

    constructor() {
        super();
    }
}
