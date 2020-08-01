import {Template} from "../../../interfaces/Template";

export class TextfieldTemplate implements Template {

    html(): string {
        return `
         <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text" id="label"></div>
            </div>
            <input type="text" id="textfield-input" class="form-control" id="inlineFormInputGroup">
          </div>
        `;
    }

}