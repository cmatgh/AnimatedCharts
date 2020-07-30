import {Template} from "../../../interfaces/Template";

export class AnimationTemplate implements Template{

    html(): string {
        return `
            <div class="container mb-5">
                <div class="row justify-content-center border-bottom mb-3" >  
                    <h1 id="title"></h1>
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
                                    <div id="start-pause-button"></div>     
                                    <div id="frame-range"></div>
                                </div>
                            </div>
                        </div>        
                        <div class="row mt-3">
                            <div class="col-md-12 mb-3">
                                <div id="animation-buttons"  class="d-flex flex-column">    
                                    <h3 class="border-bottom pb-2" id="control-label">Chart:</h3>       
                                    <div id="select-sort"></div>
                                    <div id="checkbox-reverse"></div>  
                                    <div id="select-chart"></div>
                                </div>
                            </div>
                        </div>
                         <div class="row mt-3">
                            <div class="col-md-12 mb-3">
                                <div id="animation-buttons"  class="d-flex flex-column">    
                                    <h3 class="border-bottom pb-2" id="control-label">Property:</h3>       
                                    <div id="select-property-number-format" class="mt-2"></div>
                                    <div id="select-property-unit-format" class="mt-3"></div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div id="checkbox-italic"></div>        
                                        </div>
                                         <div class="col-md-4">
                                            <div id="checkbox-bold"></div>        
                                        </div>
                                         <div class="col-md-4">
                                            <div id="checkbox-small"></div>   
                                        </div>
                                    </div>     
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <p style="font-size: 80px" id="property"></p>
                        <canvas id="chart" width="800" height="600"></canvas>
                    </div>
                </div>
            </div>
        `;
    }
}