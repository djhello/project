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
var MosfetComponent = /** @class */ (function () {
    function MosfetComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.adet = 0;
        this.loading = false;
        this._getUrl = '/api/Mosfet/getAll';
        this._getbyIdUrl = '/api/mosfet/getById';
        this._saveUrl = '/api/mosfet/save';
        this._deleteUrl = '/api/mosfet/deleteById';
        this._updateUrl = '/api/mosfet/updateStatus';
        this._receiveUrl = '/api/mosfet/receive';
        this._getLocationUrl = '/api/location/getAll';
        this._getProjectUrl = '/api/project/getAll';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUserName = this.loggedUser.displayName;
        this.loggedEmail = this.loggedUser.email;
        this.loggedUserType = this.loggedUser.userType;
    }
    MosfetComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Mosfet");
        this.loadScripts();
        this.createForm();
        this.getAll();
    };
    MosfetComponent.prototype.loadScripts = function () {
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
    MosfetComponent.prototype.createForm = function () {
        this.mosfetForm = this.formBuilder.group({
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
    MosfetComponent.prototype.addNew = function () {
        //debugger
        this.getLocations();
        this.getProjects();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#port').focus();
        });
        this.reset();
    };
    //Get Mosfets 
    MosfetComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(function (response) {
            _this.mosfets = response;
            _this.mosfetsCopy = response;
        }, function (error) {
            _this.loading = false;
            console.log(error);
        });
        this.loading = false;
    };
    //Get by ID
    MosfetComponent.prototype.edit = function (e, m) {
        var _this = this;
        console.log(m);
        e.preventDefault();
        this.getProjects();
        this.getLocations();
        this.loading = true;
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.mosfet = response;
            _this.mosfetForm.setValue({
                id: _this.mosfet.id,
                locationId: _this.mosfet.locationId,
                port: _this.mosfet.port,
                TeiPartNumber: _this.mosfet.teiPartNumber,
                description: _this.mosfet.description,
                supplier: _this.mosfet.supplier,
                SPN: _this.mosfet.spn,
                quantity: _this.mosfet.quantity,
                MFPN: _this.mosfet.mfpn,
                projectId: _this.mosfet.projectId,
            });
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#name').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    MosfetComponent.prototype.onSearch = function () {
        var term = this.searchTerm;
        this.mosfets = this.mosfetsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };
    MosfetComponent.prototype.receive = function (e, m) {
        var _this = this;
        var id = m.id;
        var count = 0;
        for (var i = 0; i < this.mosfets.length; i++) {
            if (this.mosfets[i].id != m.id)
                count++;
            else if (this.mosfets[i].id == m.id) {
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
    MosfetComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.mosfetForm.invalid) {
            return;
        }
        var formModel = new FormData();
        formModel.append('id', this.mosfetForm.value.id);
        formModel.append('locationId', this.mosfetForm.value.locationId);
        formModel.append('port', this.mosfetForm.value.port);
        formModel.append('TeiPartNumber', this.mosfetForm.value.TeiPartNumber);
        formModel.append('description', this.mosfetForm.value.description);
        formModel.append('supplier', this.mosfetForm.value.supplier);
        formModel.append('SPN', this.mosfetForm.value.SPN);
        formModel.append('quantity', this.mosfetForm.value.quantity);
        formModel.append('MFPN', this.mosfetForm.value.MFPN);
        formModel.append('projectId', this.mosfetForm.value.projectId);
        //debugger
        this._dataService.saveWithUser(this.mosfetForm.value, this.loggedUser, this._saveUrl)
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
    MosfetComponent.prototype.updateStatus = function (e, m) {
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
    MosfetComponent.prototype.getLocations = function () {
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
    MosfetComponent.prototype.getProjects = function () {
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
    MosfetComponent.prototype.delete = function (e, m) {
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
    MosfetComponent.prototype.reset = function () {
        this.mosfetForm.setValue({
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
        this.mosfetsCopy = [];
        this.mosfets = [];
        this.resmessage = null;
        $('#port').focus();
    };
    MosfetComponent = __decorate([
        core_1.Component({
            selector: 'ng-mosfet',
            templateUrl: './app/backoffice/hardware/mosfet/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], MosfetComponent);
    return MosfetComponent;
}());
exports.MosfetComponent = MosfetComponent;
//# sourceMappingURL=component.js.map