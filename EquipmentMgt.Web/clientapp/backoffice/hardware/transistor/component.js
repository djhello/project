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
var TransistorComponent = /** @class */ (function () {
    function TransistorComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.adet = 0;
        this.loading = false;
        this._getUrl = '/api/Transistor/getAll';
        this._getbyIdUrl = '/api/transistor/getById';
        this._saveUrl = '/api/transistor/save';
        this._deleteUrl = '/api/transistor/deleteById';
        this._updateUrl = '/api/transistor/updateStatus';
        this._receiveUrl = '/api/transistor/receive';
        this._getLocationUrl = '/api/location/getAll';
        this._getProjectUrl = '/api/project/getAll';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUserName = this.loggedUser.displayName;
        this.loggedEmail = this.loggedUser.email;
        this.loggedUserType = this.loggedUser.userType;
    }
    TransistorComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Transistor");
        this.loadScripts();
        this.createForm();
        this.getAll();
    };
    TransistorComponent.prototype.loadScripts = function () {
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
    TransistorComponent.prototype.createForm = function () {
        this.transistorForm = this.formBuilder.group({
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
    TransistorComponent.prototype.addNew = function () {
        //debugger
        this.getLocations();
        this.getProjects();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#port').focus();
        });
        this.reset();
    };
    //Get Transistors 
    TransistorComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(function (response) {
            _this.transistors = response;
            _this.transistorsCopy = response;
        }, function (error) {
            console.log(error);
        });
        this.loading = false;
    };
    //Get by ID
    TransistorComponent.prototype.edit = function (e, m) {
        var _this = this;
        e.preventDefault();
        this.loading = true;
        this.getProjects();
        this.getLocations();
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.transistor = response;
            _this.transistorForm.setValue({
                id: _this.transistor.id,
                locationId: _this.transistor.locationId,
                port: _this.transistor.port,
                TeiPartNumber: _this.transistor.teiPartNumber,
                description: _this.transistor.description,
                supplier: _this.transistor.supplier,
                SPN: _this.transistor.spn,
                quantity: _this.transistor.quantity,
                MFPN: _this.transistor.mfpn,
                projectId: _this.transistor.projectId,
            });
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#name').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    TransistorComponent.prototype.onSearch = function () {
        var term = this.searchTerm;
        this.transistors = this.transistorsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };
    TransistorComponent.prototype.receive = function (e, m) {
        var _this = this;
        var id = m.id;
        var count = 0;
        for (var i = 0; i < this.transistors.length; i++) {
            if (this.transistors[i].id != m.id)
                count++;
            else if (this.transistors[i].id == m.id) {
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
    TransistorComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.transistorForm.invalid) {
            return;
        }
        var formModel = new FormData();
        formModel.append('id', this.transistorForm.value.id);
        formModel.append('locationId', this.transistorForm.value.locationId);
        formModel.append('port', this.transistorForm.value.port);
        formModel.append('TeiPartNumber', this.transistorForm.value.TeiPartNumber);
        formModel.append('description', this.transistorForm.value.description);
        formModel.append('supplier', this.transistorForm.value.supplier);
        formModel.append('SPN', this.transistorForm.value.SPN);
        formModel.append('quantity', this.transistorForm.value.quantity);
        formModel.append('MFPN', this.transistorForm.value.MFPN);
        formModel.append('projectId', this.transistorForm.value.projectId);
        //debugger
        this._dataService.saveWithUser(this.transistorForm.value, this.loggedUser, this._saveUrl)
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
    TransistorComponent.prototype.updateStatus = function (e, m) {
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
    TransistorComponent.prototype.getLocations = function () {
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
    TransistorComponent.prototype.getProjects = function () {
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
    TransistorComponent.prototype.delete = function (e, m) {
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
    TransistorComponent.prototype.reset = function () {
        this.transistorForm.setValue({
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
        this.transistorsCopy = [];
        this.transistors = [];
        this.resmessage = null;
        $('#name').focus();
    };
    TransistorComponent = __decorate([
        core_1.Component({
            selector: 'ng-transistor',
            templateUrl: './app/backoffice/hardware/transistor/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], TransistorComponent);
    return TransistorComponent;
}());
exports.TransistorComponent = TransistorComponent;
//# sourceMappingURL=component.js.map