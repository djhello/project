"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var angular_highcharts_1 = require("angular-highcharts");
var service_1 = require("../../../shared/service");
var tableUtil_1 = require("../../../shared/tableUtil");
var EquipmentReportsComponent = /** @class */ (function () {
    function EquipmentReportsComponent(router, titleService, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this._dataService = _dataService;
        this.equipmentreturned = [];
        this.equipmentissued = [];
        this.loading = false;
        this._getUrl = '/api/report/getEquipmentChart';
        this._getRUrl = '/api/circulation/getreturnall';
        this._getIUrl = '/api/circulation/getIssueAll';
    }
    EquipmentReportsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Rapor");
        this.getChart();
        this.returnedList();
    };
    //Get Chart 
    EquipmentReportsComponent.prototype.getChart = function () {
        var _this = this;
        this.loading = true;
        //debugger
        this._dataService.getAll(this._getUrl).subscribe(function (response) {
            _this.echart = response;
            var chartData = [];
            for (var i = 0; i < _this.echart.length; i++) {
                chartData.push({
                    "name": _this.echart[i].ename,
                    "y": _this.echart[i].nissue,
                    sliced: true,
                    selected: true
                });
            }
            _this.chart = new angular_highcharts_1.Chart({
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
        }, function (error) {
            //console.log(error);
        });
        this.loading = false;
    };
    //Issue/Return
    EquipmentReportsComponent.prototype.returnedList = function () {
        var _this = this;
        this.loading = true;
        this._dataService.getAll(this._getRUrl)
            .subscribe(function (response) {
            console.log(response);
            _this.equipmentreturned = response;
        }, function (error) {
            //console.log(error);
        });
        this._dataService.getAll(this._getIUrl)
            .subscribe(function (response) {
            console.log(response);
            _this.equipmentissued = response;
            _this.loading = false;
        }, function (error) {
            //console.log(error);
        });
    };
    EquipmentReportsComponent.prototype.exportReturnedTable = function () {
        tableUtil_1.TableUtil.exportArrayToExcel(this.equipmentreturned, "ExampleArray");
    };
    EquipmentReportsComponent.prototype.exportIssuedTable = function () {
        tableUtil_1.TableUtil.exportArrayToExcel(this.equipmentissued, "ExampleArray");
    };
    EquipmentReportsComponent = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: './app/backoffice/reports/equipment/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            service_1.DataService])
    ], EquipmentReportsComponent);
    return EquipmentReportsComponent;
}());
exports.EquipmentReportsComponent = EquipmentReportsComponent;
//# sourceMappingURL=component.js.map