import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Chart } from 'angular-highcharts';
import { DataService } from '../../shared/service';

@Component({
    selector: 'ng-dashboard',
    templateUrl: './app/backoffice/dashboard/component.html',
    providers: [DataService]
})
export class DashboardComponent implements OnInit {
    public eqchart: Chart;
    public mkchart: Chart;

    public echart: any[];
    public mchart: any[];
    public summaryTotal: any;
    public totalEquipment: number = 0;
    public totalMember: number = 0;
    public totalIssued: number = 0;
    public totalReturned: number = 0;

    private _getEUrl: string = '/api/report/getEquipmentChart';
    private _getMUrl: string = '/api/report/getMemberChart';
    private _getSUrl: string = '/api/dashboard/getAllSummary';

    constructor(
        private router: Router,
        private titleService: Title,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | Dashboard");
        //this.loadScripts();
        this.getSummary();
        this.getEquipmentChart();
        this.getMemberChart();
    }

    public loadScripts() {
        const libScripts = [
            'assets/js/index.js'
        ];

        for (let i = 0; i < libScripts.length; i++) {
            const node = document.createElement('script');
            node.src = libScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('body')[0].appendChild(node);
        }
    }

    //Get Summary 
    getSummary() {
        //debugger
        this._dataService.getAll(this._getSUrl)
            .subscribe(
                response => {
                    this.summaryTotal = response;
                    this.totalEquipment = this.summaryTotal.totalEquipment;
                    this.totalMember = this.summaryTotal.totalMember;
                    this.totalIssued = this.summaryTotal.totalIssued;
                    this.totalReturned = this.summaryTotal.totalReturned;
                }, error => {
                    //console.log(error);
                }
            );
    }

    //Get EquipmentChart
    getEquipmentChart() {

        //debugger
        this._dataService.getAll(this._getEUrl).subscribe(
            response => {
                this.echart = response;
                let chartData = [];
                for (var i = 0; i < this.echart.length; i++) {
                    chartData.push({
                        "name": this.echart[i].ename,
                        "y": this.echart[i].nissue,
                        sliced: true,
                        selected: true
                    })
                }

                this.eqchart = new Chart({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        backgroundColor: null,
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    title: {
                        text: 'Equipment Issued',
                    },
                    subtitle: {
                        text: 'Issued Pie-Chart!'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
                    series: [{
                        name: 'Total Issued',
                        data: chartData
                    }]
                });

            }, error => {
                //console.log(error);
            }
        );
    }

    //Get MemberChart 
    getMemberChart() {

        //debugger
        this._dataService.getAll(this._getMUrl).subscribe(
            response => {
                this.mchart = response;
                let chartData = [];
                for (var i = 0; i < this.mchart.length; i++) {
                    chartData.push({
                        "name": this.mchart[i].mname,
                        "y": this.mchart[i].ntrans,
                        sliced: true,
                        selected: true
                    })
                }

                this.mkchart = new Chart({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        backgroundColor: null,
                        options3d: {
                            enabled: true,
                            alpha: 45,
                            beta: 0
                        }
                    },
                    title: {
                        text: 'Member ',
                    },
                    subtitle: {
                        text: 'Pie-Chart!'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
                    series: [{
                        name: 'Ödünç Sayısı',
                        data: chartData
                    }]
                });

            }, error => {
                //console.log(error);
            }
        );
    }
}
