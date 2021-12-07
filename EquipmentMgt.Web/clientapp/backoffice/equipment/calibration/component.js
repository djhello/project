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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var service_1 = require("../../../shared/service");
var CalibrationsComponent = /** @class */ (function () {
    function CalibrationsComponent(router, titleService, formBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.loading = false;
        this._getUrl = '/api/calibration/getall';
        this._getbyIdUrl = '/api/calibration/getbyid';
        this._saveUrl = '/api/calibration/save';
        this._deleteUrl = '/api/calibration/deletebyid';
    }
    CalibrationsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Calibrations");
        this.createForm();
        this.getAll();
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    };
    CalibrationsComponent.prototype.createForm = function () {
        this.calibrationForm = this.formBuilder.group({
            id: 0,
            calibrationName: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    //Pop Modal
    CalibrationsComponent.prototype.addNew = function () {
        //debugger
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#calibrationName').focus();
        });
        this.reset();
    };
    //Get All 
    CalibrationsComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this.loading = true;
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            _this.calibrations = response;
        }, function (error) {
            console.log(error);
        });
        this.loading = false;
    };
    //Get by ID
    CalibrationsComponent.prototype.edit = function (e, m) {
        var _this = this;
        //debugger
        this.loading = true;
        e.preventDefault();
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.calibration = response;
            //console.log(this.calibration.calibrationName);
            _this.calibrationForm.setValue({
                id: _this.calibration.id,
                calibrationName: _this.calibration.calibrationName
            });
            $('#defaultsizemodal').modal('show');
            $("#defaultsizemodal").on('shown.bs.modal', function () {
                $(this).find('#calibrationName').focus();
            });
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    //Create
    CalibrationsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.calibrationForm.invalid) {
            return;
        }
        //debugger
        this._dataService.saveWithUser(this.calibrationForm.value, this.loggedUser, this._saveUrl)
            .subscribe(function (response) {
            //console.log(response);
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            _this.getAll();
            _this.reset();
            $('#defaultsizemodal').modal('hide');
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    //Delete
    CalibrationsComponent.prototype.delete = function (e, m) {
        var _this = this;
        this.loading = true;
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.calibrationname + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(function (response) {
                //console.log(response)
                _this.resmessage = response;
                _this.getAll();
                _this.loading = false;
            }, function (error) {
                console.log(error);
            });
        }
    };
    CalibrationsComponent.prototype.reset = function () {
        this.calibrationForm.setValue({
            id: 0,
            calibrationName: null
        });
        this.resmessage = null;
        $('#calibrationName').focus();
    };
    CalibrationsComponent = __decorate([
        core_1.Component({
            selector: 'ng-calibration',
            templateUrl: './app/backoffice/equipment/calibration/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], CalibrationsComponent);
    return CalibrationsComponent;
}());
exports.CalibrationsComponent = CalibrationsComponent;
//# sourceMappingURL=component.js.map