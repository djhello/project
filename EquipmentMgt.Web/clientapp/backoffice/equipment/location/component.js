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
var LocationsComponent = /** @class */ (function () {
    function LocationsComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.loading = false;
        this._getUrl = '/api/location/getall';
        this._getbyIdUrl = '/api/location/getbyid';
        this._saveUrl = '/api/location/save';
        this._deleteUrl = '/api/location/deletebyid';
        this._getcalibrationUrl = '/api/dropdown/getallauthor';
        this._getcategoryUrl = '/api/dropdown/getallcategory';
        var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUsername = loggedUser.displayname;
        this.loggedemail = loggedUser.email;
        this.loggedUsertype = loggedUser.usertype;
    }
    LocationsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Location");
        this.loadScripts();
        this.createForm();
        this.getAll();
        if (this.loggedUsertype != 1) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('loggedUser');
            this.router.navigate(['/login']);
        }
    };
    LocationsComponent.prototype.loadScripts = function () {
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
    LocationsComponent.prototype.createForm = function () {
        this.locationForm = this.formBuilder.group({
            id: 0,
            name: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    //Pop Modal
    LocationsComponent.prototype.addNew = function () {
        //debugger 
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#name').focus();
        });
        this.reset();
        this.getcalibration();
    };
    //Get Locations 
    LocationsComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this.loading = true;
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.locations = response;
        }, function (error) {
            console.log(error);
        });
    };
    //Get by ID
    LocationsComponent.prototype.edit = function (e, m) {
        var _this = this;
        e.preventDefault();
        this.loading = true;
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.location = response;
            _this.locationForm.setValue({
                id: _this.location.id,
                name: _this.location.name
            });
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#name').focus();
            });
        }, function (error) {
            console.log(error);
        });
    };
    //Create
    LocationsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.locationForm.invalid) {
            return;
        }
        var formModel = new FormData();
        formModel.append('id', this.locationForm.value.id);
        formModel.append('name', this.locationForm.value.name);
        //debugger
        this._dataService.saveForm(formModel, this._saveUrl)
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
    //Delete
    LocationsComponent.prototype.delete = function (e, m) {
        var _this = this;
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.locationName + '. Are you sure?');
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
    LocationsComponent.prototype.getcalibration = function () {
        var _this = this;
        this.loading = true;
        this._dataService.getall(this._getcalibrationUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.calibrations = response;
        }, function (error) {
            console.log(error);
        });
    };
    LocationsComponent.prototype.reset = function () {
        this.locationForm.setValue({
            id: 0,
            name: null
        });
        this.fileInput.nativeElement.value = '';
        this.resmessage = null;
        $('#bookName').focus();
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], LocationsComponent.prototype, "fileInput", void 0);
    LocationsComponent = __decorate([
        core_1.Component({
            selector: 'ng-test',
            templateUrl: './app/backoffice/equipment/location/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], LocationsComponent);
    return LocationsComponent;
}());
exports.LocationsComponent = LocationsComponent;
//# sourceMappingURL=component.js.map