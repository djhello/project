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
var ResistorComponent = /** @class */ (function () {
    function ResistorComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.adet = 0;
        this.loading = false;
        this._getUrl = '/api/Resistor/getAll';
        this._getbyIdUrl = '/api/resistor/getById';
        this._saveUrl = '/api/resistor/save';
        this._deleteUrl = '/api/resistor/deleteById';
        this._updateUrl = '/api/resistor/updateStatus';
        this._receiveUrl = '/api/resistor/receive';
        this._getLocationUrl = '/api/location/getAll';
        this._getProjectUrl = '/api/project/getAll';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUserName = this.loggedUser.displayName;
        this.loggedEmail = this.loggedUser.email;
        this.loggedUserType = this.loggedUser.userType;
    }
    ResistorComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Resistor");
        this.loadScripts();
        this.createForm();
        this.getAll();
    };
    ResistorComponent.prototype.loadScripts = function () {
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
    ResistorComponent.prototype.createForm = function () {
        this.resistorForm = this.formBuilder.group({
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
    ResistorComponent.prototype.addNew = function () {
        //debugger
        this.getLocations();
        this.getProjects();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#port').focus();
        });
        this.reset();
    };
    //Get Resistors 
    ResistorComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(function (response) {
            _this.resistors = response;
            _this.resistorsCopy = response;
        }, function (error) {
            console.log(error);
        });
        this.loading = false;
    };
    //Get by ID
    ResistorComponent.prototype.edit = function (e, m) {
        var _this = this;
        e.preventDefault();
        this.loading = true;
        this.getProjects();
        this.getLocations();
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.resistor = response;
            _this.resistorForm.setValue({
                id: _this.resistor.id,
                locationId: _this.resistor.locationId,
                port: _this.resistor.port,
                TeiPartNumber: _this.resistor.teiPartNumber,
                description: _this.resistor.description,
                value: _this.resistor.value,
                voltage: _this.resistor.voltage,
                current: _this.resistor.current,
                manufacturePartNumber: _this.resistor.manufacturePartNumber,
                package: _this.resistor.package,
                power: _this.resistor.power,
                quantity: _this.resistor.quantity,
                projectId: _this.resistor.projectId,
            });
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#name').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    ResistorComponent.prototype.onSearch = function () {
        var term = this.searchTerm;
        this.resistors = this.resistorsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };
    ResistorComponent.prototype.receive = function (e, m) {
        var _this = this;
        var id = m.id;
        var count = 0;
        for (var i = 0; i < this.resistors.length; i++) {
            if (this.resistors[i].id != m.id)
                count++;
            else if (this.resistors[i].id == m.id) {
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
    ResistorComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.resistorForm.invalid) {
            return;
        }
        var formModel = new FormData();
        formModel.append('id', this.resistorForm.value.id);
        formModel.append('locationId', this.resistorForm.value.locationId);
        formModel.append('port', this.resistorForm.value.port);
        formModel.append('TeiPartNumber', this.resistorForm.value.TeiPartNumber);
        formModel.append('description', this.resistorForm.value.description);
        formModel.append('value', this.resistorForm.value.value);
        formModel.append('current', this.resistorForm.value.current);
        formModel.append('power', this.resistorForm.value.power);
        formModel.append('manufacturePartNumber', this.resistorForm.value.manufacturePartNumber);
        formModel.append('voltage', this.resistorForm.value.voltage);
        formModel.append('quantity', this.resistorForm.value.quantity);
        formModel.append('package', this.resistorForm.value.package);
        formModel.append('projectId', this.resistorForm.value.projectId);
        //debugger
        this._dataService.saveWithUser(this.resistorForm.value, this.loggedUser, this._saveUrl)
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
    ResistorComponent.prototype.updateStatus = function (e, m) {
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
    ResistorComponent.prototype.getLocations = function () {
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
    ResistorComponent.prototype.getProjects = function () {
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
    ResistorComponent.prototype.delete = function (e, m) {
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
    ResistorComponent.prototype.reset = function () {
        this.resistorForm.setValue({
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
        this.resistorsCopy = [];
        this.resistors = [];
        this.resmessage = null;
        $('#name').focus();
    };
    ResistorComponent = __decorate([
        core_1.Component({
            selector: 'ng-resistor',
            templateUrl: './app/backoffice/hardware/resistor/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], ResistorComponent);
    return ResistorComponent;
}());
exports.ResistorComponent = ResistorComponent;
//# sourceMappingURL=component.js.map