import {HtmlTemplate} from "../HtmlTemplate";

export class ChartTemplate extends HtmlTemplate{

    getTemplate(): string {
        return `
            <div class="mb-3 pb-2 border-bottom">
                <div class="col-md-4 mb-1">
                    <form>
                        <div class="form-group" id="chart-buttons_">
                            <label for="chart-sort-select" id="chart-sort-select-label">Sort by</label>
                            <select class="form-control form-control-sm" id="chart-sort-select" required>
                                <option selected value="value">Value</option>
                                <option value="color">Color</option>
                                <option value="label">Label</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="chart-sort-check">
                                <label class="form-check-label" for="chart-sort-check" id="chart-sort-check-label">
                                  reverse
                                </label>
                            </div>
                        </div>
                        <canvas id="chart" width="350" height="350"></canvas>
                    </form>
                </div>
            </div>
        `;
    }

    constructor() {
        super();
    }

}