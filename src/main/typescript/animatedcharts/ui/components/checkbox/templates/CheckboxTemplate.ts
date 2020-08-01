import {Template} from "../../../../interfaces/Template";

export class CheckboxTemplate implements Template {

    html(): string {
        return ` 
             <div class="custom-control custom-checkbox mb-3 mt-3">
                <input type="checkbox" class="custom-control-input" id="checkbox">
                <label class="custom-control-label" for="checkbox"></label>
            </div>
            `;
    }

}