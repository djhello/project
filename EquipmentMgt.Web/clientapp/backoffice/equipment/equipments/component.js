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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var service_1 = require("../../../shared/service");
var handsontable_1 = require("handsontable");
var EquipmentsComponent = /** @class */ (function () {
    function EquipmentsComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.loading = false;
        this._getUrl = '/api/equipment/getall';
        this._getbyIdUrl = '/api/equipment/getbyid';
        this._saveUrl = '/api/equipment/save';
        this._deleteUrl = '/api/equipment/deletebyid';
        this._getbyEquipmentIdUrl = '/api/equipment/getbytext';
        this._updateUrl = '/api/equipment/updateStatus';
        this._getCalibrationUrl = '/api/calibration/getall';
        this._getLocationUrl = '/api/location/getall';
        this._getEquipmentModelUrl = '/api/equipmentmodel/getall';
        this._getUserUrl = '/api/users/getall';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }
    EquipmentsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Cihazlar");
        this.createForm();
        this.getAll();
        //this.setupHandsontable();
    };
    EquipmentsComponent.prototype.createForm = function () {
        this.equipmentForm = this.formBuilder.group({
            id: 0,
            equipmentId: new forms_1.FormControl('', forms_1.Validators.required),
            calibrationId: new forms_1.FormControl('', forms_1.Validators.required),
            equipmentName: new forms_1.FormControl('', forms_1.Validators.required),
            serialPortUSB: new forms_1.FormControl('', forms_1.Validators.required),
            permanentLocationId: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl(''),
            currentUserId: new forms_1.FormControl(''),
            equipmentModelId: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    EquipmentsComponent.prototype.setupHandsontable = function () {
        var container = document.getElementById('example');
        var hot = new handsontable_1.default(container, {
            data: this.equipments,
            rowHeaders: true,
            colHeaders: true,
            filters: true,
            dropdownMenu: true
        });
    };
    //Pop Modal
    EquipmentsComponent.prototype.addNew = function () {
        //debugger 
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#equipmentId').focus();
        });
        this.reset();
        this.getCalibration();
        this.getLocations();
        this.getEquipmentModels();
        this.getUserAll();
    };
    EquipmentsComponent.prototype.getAll = function () {
        var _this = this;
        this.loading = true;
        //debugger
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            _this.equipments = response;
            _this.setupHandsontable();
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    //Get by ID
    EquipmentsComponent.prototype.edit = function (e, m) {
        var _this = this;
        this.loading = true;
        //debugger
        e.preventDefault();
        this.getCalibration();
        this.getLocations();
        this.getEquipmentModels();
        this.getUserAll();
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            console.log(response);
            _this.equipment = response;
            _this.equipmentForm.setValue({
                id: _this.equipment.id,
                equipmentId: _this.equipment.equipmentId,
                calibrationId: _this.equipment.calibrationId,
                equipmentName: _this.equipment.equipmentName,
                description: _this.equipment.description,
                serialPortUSB: _this.equipment.serialPortUSB,
                equipmentModelId: _this.equipment.equipmentModelId,
                permanentLocationId: _this.equipment.permanentLocationId,
                currentUserId: _this.equipment.currentUserId
            });
            _this.loading = false;
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#equipmentId').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    EquipmentsComponent.prototype.onChangeSearchText = function ($event) {
        if (this.router.url == "/backoffice/equipment/equipments") {
            var text = document.getElementById("searchText").value;
            this.getEquipments($event, text);
        }
    };
    EquipmentsComponent.prototype.getEquipments = function (e, m) {
        var _this = this;
        this.loading = true;
        this._dataService.getbytext(m, this._getbyEquipmentIdUrl)
            .subscribe(function (response) {
            _this.equipments = response;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    //Create
    EquipmentsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.equipmentForm.invalid) {
            return;
        }
        var formModel = new FormData();
        formModel.append('id', this.equipmentForm.value.id);
        formModel.append('equipmentId', this.equipmentForm.value.equipmentId);
        formModel.append('equipmentName', this.equipmentForm.value.equipmentName);
        formModel.append('calibrationId', this.equipmentForm.value.calibrationId);
        formModel.append('description', this.equipmentForm.value.description);
        formModel.append('serialPortUSB', this.equipmentForm.value.serialPortUSB);
        formModel.append('equipmentModelId', this.equipmentForm.value.equipmentModelId);
        formModel.append('permanentLocationId', this.equipmentForm.value.permanentLocationId);
        formModel.append('currentUserId', this.equipmentForm.value.currentUserId);
        //debugger
        this._dataService.saveWithUser(this.equipmentForm.value, this.loggedUser, this._saveUrl)
            .subscribe(function (response) {
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            _this.getAll();
            _this.reset();
            $('#largesizemodal').modal('hide');
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    EquipmentsComponent.prototype.updateStatus = function (e, m) {
        var _this = this;
        this.loading = true;
        e.preventDefault();
        this._dataService.updateStatus(m, this.loggedUser, this._updateUrl)
            .subscribe(function (response) {
            //console.log(response);
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            _this.getAll();
            _this.reset();
            _this.loading = false;
            $('#defaultsizemodal').modal('hide');
        }, function (error) {
            console.log(error);
            _this.loading = false;
        });
        this.loading = false;
    };
    //Delete
    EquipmentsComponent.prototype.delete = function (e, m) {
        var _this = this;
        this.loading = true;
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.equipmentName + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(function (response) {
                _this.loading = false;
                _this.resmessage = response;
                _this.getAll();
            }, function (error) {
                console.log(error);
            });
        }
    };
    EquipmentsComponent.prototype.getCalibration = function () {
        var _this = this;
        this.loading = true;
        //debugger
        this._dataService.getall(this._getCalibrationUrl)
            .subscribe(function (response) {
            _this.calibrations = response;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    EquipmentsComponent.prototype.getEquipmentModels = function () {
        var _this = this;
        this.loading = true;
        //debugger
        this._dataService.getall(this._getEquipmentModelUrl)
            .subscribe(function (response) {
            _this.equipmentModels = response;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    EquipmentsComponent.prototype.getLocations = function () {
        var _this = this;
        this.loading = true;
        //debugger
        this._dataService.getall(this._getLocationUrl)
            .subscribe(function (response) {
            _this.locations = response;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    EquipmentsComponent.prototype.getUserAll = function () {
        var _this = this;
        this.loading = true;
        this._dataService.getall(this._getUserUrl)
            .subscribe(function (response) {
            _this.users = response;
            console.log(_this.users);
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    EquipmentsComponent.prototype.reset = function () {
        this.equipmentForm.setValue({
            id: 0,
            equipmentId: '',
            equipmentName: '',
            calibrationId: 0,
            description: '',
            serialPortUSB: '',
            equipmentModelId: 0,
            permanentLocationId: 0,
            currentUserId: 0
        });
        this.resmessage = null;
        $('#equipmentId').focus();
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], EquipmentsComponent.prototype, "fileInput", void 0);
    EquipmentsComponent = __decorate([
        core_1.Component({
            selector: 'ng-equipments',
            templateUrl: './app/backoffice/equipment/equipments/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], EquipmentsComponent);
    return EquipmentsComponent;
}());
exports.EquipmentsComponent = EquipmentsComponent;
//# sourceMappingURL=component.js.map