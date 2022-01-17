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
var CapacitorComponent = /** @class */ (function () {
    function CapacitorComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.loading = false;
        this.adet = 0;
        this._getUrl = '/api/Capacitor/getAll';
        this._getbyIdUrl = '/api/capacitor/getbyid';
        this._saveUrl = '/api/capacitor/save';
        this._deleteUrl = '/api/capacitor/deletebyid';
        this._updateUrl = '/api/capacitor/updateStatus';
        this._receiveUrl = '/api/capacitor/receive';
        this._getLocationUrl = '/api/location/getall';
        this._getProjectUrl = '/api/project/getall';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUserName = this.loggedUser.displayName;
        this.loggedEmail = this.loggedUser.email;
        this.loggedUserType = this.loggedUser.userType;
    }
    CapacitorComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Capacitor");
        this.loadScripts();
        this.createForm();
        this.getAll();
    };
    CapacitorComponent.prototype.loadScripts = function () {
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
    CapacitorComponent.prototype.createForm = function () {
        this.capacitorForm = this.formBuilder.group({
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
    CapacitorComponent.prototype.addNew = function () {
        this.reset();
        this.getLocations();
        this.getProjects();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#port').focus();
        });
    };
    //Get Capacitors 
    CapacitorComponent.prototype.getAll = function () {
        var _this = this;
        this.loading = true;
        this._dataService.getTestall(this._getUrl)
            .subscribe(function (response) {
            _this.capacitors = response;
            _this.capacitorsCopy = response;
        }, function (error) {
            console.log(error);
        });
        this.loading = false;
    };
    //Get by ID
    CapacitorComponent.prototype.edit = function (e, m) {
        var _this = this;
        e.preventDefault();
        this.getLocations();
        this.getProjects();
        this.loading = true;
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.capacitor = response;
            _this.capacitorForm.setValue({
                id: _this.capacitor.id,
                locationId: _this.capacitor.locationId,
                port: _this.capacitor.port,
                TeiPartNumber: _this.capacitor.teiPartNumber,
                description: _this.capacitor.description,
                supplier: _this.capacitor.supplier,
                SPN: _this.capacitor.spn,
                quantity: _this.capacitor.quantity,
                MFPN: _this.capacitor.mfpn,
                projectId: _this.capacitor.projectId,
            });
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#name').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    CapacitorComponent.prototype.onSearch = function () {
        var term = this.searchTerm;
        this.capacitors = this.capacitorsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };
    CapacitorComponent.prototype.receive = function (e, m) {
        var _this = this;
        var id = m.id;
        var count = 0;
        for (var i = 0; i < this.capacitors.length; i++) {
            if (this.capacitors[i].id != m.id)
                count++;
            else if (this.capacitors[i].id == m.id) {
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
    CapacitorComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.capacitorForm.invalid) {
            return;
        }
        var formModel = new FormData();
        formModel.append('id', this.capacitorForm.value.id);
        formModel.append('locationId', this.capacitorForm.value.locationId);
        formModel.append('port', this.capacitorForm.value.port);
        formModel.append('TeiPartNumber', this.capacitorForm.value.TeiPartNumber);
        formModel.append('description', this.capacitorForm.value.description);
        formModel.append('supplier', this.capacitorForm.value.supplier);
        formModel.append('SPN', this.capacitorForm.value.SPN);
        formModel.append('quantity', this.capacitorForm.value.quantity);
        formModel.append('MFPN', this.capacitorForm.value.MFPN);
        formModel.append('projectId', this.capacitorForm.value.projectId);
        //debugger
        this._dataService.saveWithUser(this.capacitorForm.value, this.loggedUser, this._saveUrl)
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
    CapacitorComponent.prototype.updateStatus = function (e, m) {
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
    CapacitorComponent.prototype.getLocations = function () {
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
    CapacitorComponent.prototype.getProjects = function () {
        var _this = this;
        this.loading = true;
        //debugger
        this._dataService.getall(this._getProjectUrl)
            .subscribe(function (response) {
            _this.projects = response;
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    //Delete
    CapacitorComponent.prototype.delete = function (e, m) {
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
    CapacitorComponent.prototype.reset = function () {
        this.capacitorForm.setValue({
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
        this.capacitorsCopy = [];
        this.capacitors = [];
        this.resmessage = null;
        $('#name').focus();
    };
    CapacitorComponent = __decorate([
        core_1.Component({
            selector: 'ng-capacitor',
            templateUrl: './app/backoffice/hardware/capacitor/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], CapacitorComponent);
    return CapacitorComponent;
}());
exports.CapacitorComponent = CapacitorComponent;
//# sourceMappingURL=component.js.map