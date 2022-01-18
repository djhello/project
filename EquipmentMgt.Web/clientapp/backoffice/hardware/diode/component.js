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
var DiodeComponent = /** @class */ (function () {
    function DiodeComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.adet = 0;
        this.loading = false;
        this._getUrl = '/api/Diode/getAll';
        this._getbyIdUrl = '/api/diode/getById';
        this._saveUrl = '/api/diode/save';
        this._deleteUrl = '/api/diode/deleteById';
        this._updateUrl = '/api/diode/updateStatus';
        this._receiveUrl = '/api/diode/receive';
        this._getLocationUrl = '/api/location/getAll';
        this._getProjectUrl = '/api/project/getAll';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUserName = this.loggedUser.displayName;
        this.loggedEmail = this.loggedUser.email;
        this.loggedUserType = this.loggedUser.userType;
    }
    DiodeComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Diode");
        this.loadScripts();
        this.createForm();
        this.getAll();
    };
    DiodeComponent.prototype.loadScripts = function () {
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
    DiodeComponent.prototype.createForm = function () {
        this.diodeForm = this.formBuilder.group({
            id: 0,
            locationId: new forms_1.FormControl(''),
            port: new forms_1.FormControl(''),
            TeiPartNumber: new forms_1.FormControl(''),
            description: new forms_1.FormControl(''),
            value: new forms_1.FormControl(''),
            voltage: new forms_1.FormControl(''),
            current: new forms_1.FormControl(''),
            manufacturePartNumber: new forms_1.FormControl(''),
            package: new forms_1.FormControl(''),
            power: new forms_1.FormControl(''),
            quantity: new forms_1.FormControl(''),
            projectId: new forms_1.FormControl('')
        });
    };
    //Pop Modal
    DiodeComponent.prototype.addNew = function () {
        this.getLocations();
        this.getProjects();
        //debugger 
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#name').focus();
        });
        this.reset();
    };
    //Get Diodes 
    DiodeComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(function (response) {
            _this.diodes = response;
            _this.diodesCopy = response;
        }, function (error) {
            console.log(error);
        });
        this.loading = false;
    };
    //Get by ID
    DiodeComponent.prototype.edit = function (e, m) {
        var _this = this;
        e.preventDefault();
        this.getProjects();
        this.getLocations();
        this.loading = true;
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.diode = response;
            _this.diodeForm.setValue({
                id: _this.diode.id,
                locationId: _this.diode.locationId,
                port: _this.diode.port,
                TeiPartNumber: _this.diode.teiPartNumber,
                description: _this.diode.description,
                value: _this.diode.value,
                voltage: _this.diode.voltage,
                current: _this.diode.current,
                manufacturePartNumber: _this.diode.manufacturePartNumber,
                package: _this.diode.package,
                power: _this.diode.power,
                quantity: _this.diode.quantity,
                projectId: _this.diode.projectId,
            });
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#name').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    DiodeComponent.prototype.onSearch = function () {
        var term = this.searchTerm;
        this.diodes = this.diodesCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };
    DiodeComponent.prototype.receive = function (e, m) {
        var _this = this;
        var id = m.id;
        var count = 0;
        for (var i = 0; i < this.diodes.length; i++) {
            if (this.diodes[i].id != m.id)
                count++;
            else if (this.diodes[i].id == m.id) {
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
    DiodeComponent.prototype.getLocations = function () {
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
    DiodeComponent.prototype.getProjects = function () {
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
    //Create
    DiodeComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.diodeForm.invalid) {
            return;
        }
        var formModel = new FormData();
        formModel.append('id', this.diodeForm.value.id);
        formModel.append('locationId', this.diodeForm.value.locationId);
        formModel.append('port', this.diodeForm.value.port);
        formModel.append('TeiPartNumber', this.diodeForm.value.TeiPartNumber);
        formModel.append('description', this.diodeForm.value.description);
        formModel.append('value', this.diodeForm.value.value);
        formModel.append('current', this.diodeForm.value.current);
        formModel.append('power', this.diodeForm.value.power);
        formModel.append('manufacturePartNumber', this.diodeForm.value.manufacturePartNumber);
        formModel.append('voltage', this.diodeForm.value.voltage);
        formModel.append('quantity', this.diodeForm.value.quantity);
        formModel.append('package', this.diodeForm.value.package);
        formModel.append('projectId', this.diodeForm.value.projectId);
        //debugger
        this._dataService.saveWithUser(this.diodeForm.value, this.loggedUser, this._saveUrl)
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
    DiodeComponent.prototype.updateStatus = function (e, m) {
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
    //Delete
    DiodeComponent.prototype.delete = function (e, m) {
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
    DiodeComponent.prototype.reset = function () {
        this.diodeForm.setValue({
            id: 0,
            locationId: 0,
            port: null,
            TeiPartNumber: null,
            description: null,
            value: null,
            voltage: null,
            current: null,
            manufacturePartNumber: null,
            package: null,
            power: null,
            quantity: 0,
            projectId: 0,
        });
        this.searchTerm = "";
        this.diodesCopy = [];
        this.diodes = [];
        this.resmessage = null;
        $('#port').focus();
    };
    DiodeComponent = __decorate([
        core_1.Component({
            selector: 'ng-diode',
            templateUrl: './app/backoffice/hardware/diode/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], DiodeComponent);
    return DiodeComponent;
}());
exports.DiodeComponent = DiodeComponent;
//# sourceMappingURL=component.js.map