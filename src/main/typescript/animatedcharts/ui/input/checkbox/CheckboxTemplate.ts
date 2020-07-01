import {Template} from "../../Template";

export class CheckboxTemplate implements Template {

    html(): string {
        return ` 
             <div class="custom-control custom-checkbox mb-3 mt-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1"></label>
            </div>
            `;
    }

}