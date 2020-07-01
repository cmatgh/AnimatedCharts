import {Template} from "../../../Template";

export class ButtonTemplate implements Template {
    html(): string {
        return `<button type="button" class="btn btn-sm btn-primary btn-block mt-1 mb-1"></button>`;
    }

}