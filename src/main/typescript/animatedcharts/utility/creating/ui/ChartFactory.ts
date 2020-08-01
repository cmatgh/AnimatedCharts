import { Chart }  from "chart.js";

export class ChartFactory {

    private static chartFactory: ChartFactory = null;
    types : Set<String>;

    private constructor() {
        this.types = new Set<String>(["bar", "polarArea", "pie", "doughnut"]);
    }

    public static getInstance(): ChartFactory {
        if(ChartFactory.chartFactory == null) {
            this.chartFactory = new ChartFactory();
        }
        return this.chartFactory;
    }

    create(type: string, context: HTMLCanvasElement, options: object = {}) : Chart {
        options = Object.assign(options, this.defaultOptions());

        if(this.types.has(type)){
            return this.createChart(context, type, options);
        }

        throw new Error("chart type does not exist: " + type );
    }

    private createChart(context: HTMLCanvasElement, type: string, options: object) : Chart {
        return new Chart(context,  {
            type: type,
            data: this.defaultData(),
            options: options
        })
    }

    private defaultData() : object {
        return {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
        }
    }

    private defaultOptions() : object {
        return {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: false,
                text: 'Custom Chart Title'
            },
            tooltips: {
                enabled: false
            },
            legend: {
                display: true,
            }
        }
    }
}