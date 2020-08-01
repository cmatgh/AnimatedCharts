import {Template} from "../../../interfaces/Template";

export class RangeTemplate implements Template{

    html(): string {
        return `
            <div>
                <label for="range"></label>
                <input type="range" class="custom-range" id="range">     
            </div>   
        `;
    }

}