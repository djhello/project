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
var ICregulatorComponent = /** @class */ (function () {
    function ICregulatorComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.adet = 0;
        this.loading = false;
        this._getUrl = '/api/ICregulator/getAll';
        this._getbyIdUrl = '/api/ICregulator/getById';
        this._saveUrl = '/api/ICregulator/save';
        this._deleteUrl = '/api/ICregulator/deleteById';
        this._updateUrl = '/api/ICregulator/updateStatus';
        this._receiveUrl = '/api/ICregulator/receive';
        this._getLocationUrl = '/api/location/getAll';
        this._getProjectUrl = '/api/project/getAll';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUserName = this.loggedUser.displayName;
        this.loggedEmail = this.loggedUser.email;
        this.loggedUserType = this.loggedUser.userType;
    }
    ICregulatorComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | ICregulator");
        this.loadScripts();
        this.createForm();
        this.getAll();
    };
    ICregulatorComponent.prototype.loadScripts = function () {
        var libScripts = [
            'assets/js/datepicker-init.js'
        ];
        for (var i = 0; i < libScripts.length; i++) {
            var node = document.createElement('script');
            node.src = libScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('body')[0].appendChild(node);
        }
    };
    ICregulatorComponent.prototype.createForm = function () {
        this.ICregulatorForm = this.formBuilder.group({
            id: 0,
            locationId: new forms_1.FormControl(''),
            port: new forms_1.FormControl(''),
            TeiPartNumber: new forms_1.FormControl(''),
            description: new forms_1.FormControl(''),
            supplier: new forms_1.FormControl(''),
            SPN: new forms_1.FormControl(''),
            quantity: new forms_1.FormControl(''),
            MFPN: new forms_1.FormControl(''),
            projectId: new forms_1.FormControl('')
        });
    };
    //Pop Modal
    ICregulatorComponent.prototype.addNew = function () {
        //debugger
        this.getLocations();
        this.getProjects();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#port').focus();
        });
        this.reset();
    };
    //Get ICregulators 
    ICregulatorComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(function (response) {
            _this.ICregulators = response;
            _this.ICregulatorsCopy = response;
        }, function (error) {
            _this.loading = false;
            console.log(error);
        });
        this.loading = false;
    };
    //Get by ID
    ICregulatorComponent.prototype.edit = function (e, m) {
        var _this = this;
        e.preventDefault();
        this.loading = true;
        this.getProjects();
        this.getLocations();
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.ICregulator = response;
            _this.ICregulatorForm.setValue({
                id: _this.ICregulator.id,
                locationId: _this.ICregulator.locationId,
                port: _this.ICregulator.port,
                TeiPartNumber: _this.ICregulator.teiPartNumber,
                description: _this.ICregulator.description,
                supplier: _this.ICregulator.supplier,
                SPN: _this.ICregulator.spn,
                quantity: _this.ICregulator.quantity,
                MFPN: _this.ICregulator.mfpn,
                projectId: _this.ICregulator.projectId,
            });
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#name').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    ICregulatorComponent.prototype.onSearch = function () {
        var term = this.searchTerm;
        this.ICregulators = this.ICregulatorsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };
    ICregulatorComponent.prototype.receive = function (e, m) {
        var _this = this;
        var id = m.id;
        var count = 0;
        for (var i = 0; i < this.ICregulators.length; i++) {
            if (this.ICregulators[i].id != m.id)
                count++;
            else if (this.ICregulators[i].id == m.id) {
                break;
            }
        }
        this.adet = document.getElementById("receiveQuantity" + (count + 1)).value;
        if (m.quantity == 0) {
            alert("Elimizde hiç malzeme bulunmamaktadır.");
        }
        else if (m.quantity >= this.adet) {
            this.loading = true;
            this._dataService.receiveWithUser(m, this.adet, this.loggedUser, this._receiveUrl)
                .subscribe(function (response) {
                _this.loading = false;
                _this.getAll();
            }, function (error) {
                console.log(error);
            });
        }
        else {
            alert("Ooopps elimizde o kadar yok mevcut sayısından az bir sayı giriniz");
        }
        e.preventDefault();
        this.loading = false;
    };
    //Create
    ICregulatorComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.ICregulatorForm.invalid) {
            return;
        }
        var formModel = new FormData();
        formModel.append('id', this.ICregulatorForm.value.id);
        formModel.append('locationId', this.ICregulatorForm.value.locationId);
        formModel.append('port', this.ICregulatorForm.value.port);
        formModel.append('TeiPartNumber', this.ICregulatorForm.value.TeiPartNumber);
        formModel.append('description', this.ICregulatorForm.value.description);
        formModel.append('supplier', this.ICregulatorForm.value.supplier);
        formModel.append('SPN', this.ICregulatorForm.value.SPN);
        formModel.append('quantity', this.ICregulatorForm.value.quantity);
        formModel.append('MFPN', this.ICregulatorForm.value.MFPN);
        formModel.append('projectId', this.ICregulatorForm.value.projectId);
        //debugger
        this._dataService.saveWithUser(this.ICregulatorForm.value, this.loggedUser, this._saveUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            _this.getAll();
            $('#largesizemodal').modal('hide');
            //this.reset();
        }, function (error) {
            console.log(error);
        });
    };
    ICregulatorComponent.prototype.updateStatus = function (e, m) {
        var _this = this;
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.description + '. Are you sure?');
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
    ICregulatorComponent.prototype.getLocations = function () {
        var _this = this;
        this.loading = true;
        //debugger
        this._dataService.getAll(this._getLocationUrl)
            .subscribe(function (response) {
            _this.locations = response;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    ICregulatorComponent.prototype.getProjects = function () {
        var _this = this;
        this.loading = true;
        //debugger
        this._dataService.getAll(this._getProjectUrl)
            .subscribe(function (response) {
            _this.projects = response;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    //Delete
    ICregulatorComponent.prototype.delete = function (e, m) {
        var _this = this;
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.description + '. Are you sure?');
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
    ICregulatorComponent.prototype.reset = function () {
        this.ICregulatorForm.setValue({
            id: 0,
            locationId: 0,
            port: null,
            TeiPartNumber: null,
            description: null,
            supplier: null,
            SPN: null,
            quantity: 0,
            MFPN: null,
            projectId: 0,
        });
        this.searchTerm = "";
        this.ICregulatorsCopy = [];
        this.ICregulators = [];
        this.resmessage = null;
        $('#name').focus();
    };
    ICregulatorComponent = __decorate([
        core_1.Component({
            selector: 'ng-ICregulator',
            templateUrl: './app/backoffice/hardware/ICregulator/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], ICregulatorComponent);
    return ICregulatorComponent;
}());
exports.ICregulatorComponent = ICregulatorComponent;
//# sourceMappingURL=component.js.map