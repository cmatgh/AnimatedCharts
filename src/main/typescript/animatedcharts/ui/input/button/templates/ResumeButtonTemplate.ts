import {Template} from "../../../Template";

export class ResumeButtonTemplate implements Template {

    html(): string {
        return `<button type="button" class="btn btn-sm btn-primary mt-1 mb-1"><i class="fa fa-play"></i></button>`;
    }

}