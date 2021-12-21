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
var DepartmansComponent = /** @class */ (function () {
    function DepartmansComponent(router, titleService, formBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.booleanValue = false;
        this.loading = false;
        this._getUrl = '/api/departman/getall';
        this._getbyIdUrl = '/api/departman/getbyid';
        this._saveUrl = '/api/departman/save';
        this._deleteUrl = '/api/departman/deletebyid';
        this._updateUrl = '/api/departman/updateStatus';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }
    DepartmansComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Bölümler");
        this.createForm();
        this.getAll();
    };
    DepartmansComponent.prototype.createForm = function () {
        this.departmanForm = this.formBuilder.group({
            departmanId: 0,
            departmanName: new forms_1.FormControl('', forms_1.Validators.required)
        });
        $("#departmanName").focus();
    };
    //Pop Modal
    DepartmansComponent.prototype.addNew = function () {
        //debugger
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#departmanName').focus();
        });
        this.reset();
    };
    //Get All Departman
    DepartmansComponent.prototype.getAll = function () {
        var _this = this;
        this.loading = true;
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.departmans = response;
        }, function (error) {
            console.log(error);
        });
    };
    //Get by ID
    DepartmansComponent.prototype.edit = function (e, m) {
        var _this = this;
        this.loading = true;
        e.preventDefault();
        this._dataService.getbyid(m.departmanId, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.departman = response;
            _this.departmanForm.setValue({
                departmanId: _this.departman.departmanId,
                departmanName: _this.departman.departmanName
            });
            $('#defaultsizemodal').modal('show');
            $("#defaultsizemodal").on('shown.bs.modal', function () {
                $(this).find('#departmanName').focus();
            });
        }, function (error) {
            //console.log(error);
        });
    };
    //Create
    DepartmansComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.departmanForm.invalid) {
            return;
        }
        this._dataService.saveWithUser(this.departmanForm.value, this.loggedUser, this._saveUrl)
            .subscribe(function (response) {
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            _this.getAll();
            _this.reset();
            _this.loading = false;
            $('#defaultsizemodal').modal('hide');
        }, function (error) {
            //console.log(error);
        });
    };
    DepartmansComponent.prototype.updateStatus = function (e, m) {
        var _this = this;
        console.log(m);
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.departmanName + '. Are you sure?');
        if (IsConf) {
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
        }
        this.loading = false;
    };
    //Delete
    DepartmansComponent.prototype.delete = function (e, m) {
        var _this = this;
        //debugger
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.departmanName + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.departmanId, this._deleteUrl)
                .subscribe(function (response) {
                _this.loading = false;
                _this.resmessage = response;
                _this.getAll();
            }, function (error) {
                //console.log(error);
            });
        }
    };
    DepartmansComponent.prototype.sort = function (colName) {
        this.departmans.sort(function (a, b) { return a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0; });
    };
    DepartmansComponent.prototype.sortFunction = function (colName, boolean) {
        if (boolean == true) {
            this.departmans.sort(function (a, b) { return a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0; });
            this.booleanValue = !this.booleanValue;
        }
        else {
            this.departmans.sort(function (a, b) { return a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0; });
            this.booleanValue = !this.booleanValue;
        }
    };
    DepartmansComponent.prototype.reset = function () {
        this.departmanForm.setValue({
            departmanId: 0,
            departmanName: null
        });
        this.resmessage = null;
        $('#departmanName').focus();
    };
    DepartmansComponent = __decorate([
        core_1.Component({
            selector: 'ng-departmans',
            templateUrl: './app/backoffice/system/departmans/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], DepartmansComponent);
    return DepartmansComponent;
}());
exports.DepartmansComponent = DepartmansComponent;
//# sourceMappingURL=component.js.map