import {Template} from "../../../../interfaces/Template";

export class DefaultButtonTemplate implements Template {
    html(): string {
        return `<button type="button" class="btn btn-sm btn-primary btn-block mt-1 mb-1"></button>`;
    }

}