import {Template} from "../../Template";

export class AnimationTemplate implements Template{

    html(): string {
        return `
            <div class="container mb-5">
                <div class="row justify-content-center border-bottom mb-3" >  
                    <h1 id="title"></h1>
                    <h2 class="display-2" id="property"></h2>
                </div>
                <div class="row">
                    <div class="col-md-4 border-right">
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
                            <div class="col-md-12 mb-3">
                                <div id="select-sort"></div>
                                 <div class="custom-control custom-checkbox mb-3 mt-3">
                                    <input type="checkbox" class="custom-control-input" id="chart-sort-check" required>
                                    <label class="custom-control-label" for="chart-sort-check-label">reversed</label>
                                  </div>
                                  <div id="select-chart"></div>
                              </div>
                            </div>
                    </div>
                    <div class="col-md-8">
                        <canvas id="chart" width="800" height="600"></canvas>
                    </div>
                </div>
            </div>
        `;
    }

}