import {Template} from "../../Template";

export class FileDialogTemplate implements Template {
    html(): string {
        return `
            <div class="custom-file mb-3">
                <input type="file" class="custom-file-input" id="file-input">
                <label class="custom-file-label" for="file-input"></label>
              </div>
            `;
    }

}