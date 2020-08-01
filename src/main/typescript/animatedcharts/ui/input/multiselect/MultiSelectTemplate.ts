import {Template} from "../../../interfaces/Template";

export class MultiSelectTemplate implements Template {

    html(): string {
        return `
            <div>
                <select class="custom-select" multiple>
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
            </div>
           
        `;
    }

}