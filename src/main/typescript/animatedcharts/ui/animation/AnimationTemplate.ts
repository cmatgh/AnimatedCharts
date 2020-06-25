import {HtmlTemplate} from "../HtmlTemplate";

export class AnimationTemplate extends HtmlTemplate {

    constructor() {
        super();
    }

    getTemplate(): string {
        return `
            <div class="container mb-5">
                <div class="row justify-content-center border-bottom mb-3" >  
                    <h1 id="title"></h1>
                    <h2 class="display-2" id="property"></h2>
                </div>
                <div class="row">
                    <div class="col-md-2 border-right">
                        <div class="row">
                            <div class="col-md-12">
                                 <div id="animation-buttons"  class="d-flex flex-column">    
                                    <h3 class="border-bottom pb-2" id="data-label">Data:</h3> 
                                    <div id="load-dataset-button"></div>    
                                </div>
                            </div> 
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <div id="animation-buttons"  class="d-flex flex-column">    
                                    <h3 class="border-bottom pb-2" id="control-label">Control:</h3>       
                                    <div id="start-button"></div>          
                                    <div id="stop-button"></div>          
                                    <div id="pause-button"></div>         
                                    <div id="resume-button"></div>         
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <div id="decorator-buttons" class="d-flex flex-column">     
                                    <div id="bold-decorator-button"></div>          
                                    <div id="underline-decorator-button"></div>          
                                    <div id="small-decorator-button"></div>          
                                    <div id="italicized-decorator-button"></div>          
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div class="col-md-10">
                        <div id="pie-chart"></div>          
                        <div id="bar-chart"></div>          
                        <div id="doughnut-chart"></div>          
                        <div id="polarArea-chart"></div>     
                    </div>
                </div>
            </div>
        `;
    }
}
