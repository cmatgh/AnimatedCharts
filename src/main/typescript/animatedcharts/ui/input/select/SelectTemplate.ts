import {Template} from "../../Template";

export class SelectTemplate implements Template{
    html(): string {
        return `
                <div class="input-group">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="chart-buttons">Sort by</label>
                    </div>
                    <select class="custom-select" id="select-input">
                    </select>
                </div>
        `;
    }

}