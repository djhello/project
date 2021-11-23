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
var EquipmentModelsComponent = /** @class */ (function () {
    function EquipmentModelsComponent(_http, router, titleService, formBuilder, _dataService) {
        this._http = _http;
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.loading = false;
        this._getUrl = '/api/equipmentmodel/getall';
        this._getbyIdUrl = '/api/equipmentmodel/getbyid';
        this._saveUrl = '/api/equipmentmodel/save';
        this._deleteUrl = '/api/equipmentmodel/deletebyid';
        var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUsername = loggedUser.displayname;
        this.loggedemail = loggedUser.email;
        this.loggedUsertype = loggedUser.usertype;
    }
    EquipmentModelsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Equipment Model");
        this.loadScripts();
        this.createForm();
        this.getAll();
        if (this.loggedUsertype != 1) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('loggedUser');
            this.router.navigate(['/login']);
        }
    };
    EquipmentModelsComponent.prototype.loadScripts = function () {
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
    EquipmentModelsComponent.prototype.createForm = function () {
        this.equipmentModelForm = this.formBuilder.group({
            id: 0,
            name: new forms_1.FormControl('', forms_1.Validators.required),
            quantity: new forms_1.FormControl(''),
            description: new forms_1.FormControl(''),
            eDocWebAddress: new forms_1.FormControl(''),
            eDocLocalAddress: new forms_1.FormControl(''),
            fileupload: null
        });
    };
    EquipmentModelsComponent.prototype.onFileChange = function (event) {
        if (event.target.files.length > 0) {
            var file = event.target.files[0];
            this.equipmentModelForm.get('fileupload').setValue(file);
        }
    };
    //Pop Modal
    EquipmentModelsComponent.prototype.addNew = function () {
        //debugger 
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#name').focus();
        });
        this.reset();
        //this.getcalibration();
        //this.getcategory();
    };
    //Get LOcations 
    EquipmentModelsComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            _this.equipmentModels = response;
        }, function (error) {
            console.log(error);
        });
    };
    //Get by ID
    EquipmentModelsComponent.prototype.edit = function (e, m) {
        var _this = this;
        //debugger
        e.preventDefault();
        //this.getcategory();
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            console.log(response);
            _this.equipmentModel = response;
            _this.equipmentModelForm.setValue({
                id: _this.equipmentModel.id,
                name: _this.equipmentModel.name,
                quantity: _this.equipmentModel.quantity,
                description: _this.equipmentModel.description,
                eDocWebAddress: _this.equipmentModel.eDocWebAddress,
                eDocLocalAddress: _this.equipmentModel.eDocLocalAddress,
                fileupload: _this.equipmentModel.coverImage
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
    EquipmentModelsComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.equipmentModelForm.invalid) {
            return;
        }
        var formModel = new FormData();
        console.log(this.equipmentModelForm);
        formModel.append('id', this.equipmentModelForm.value.id);
        formModel.append('name', this.equipmentModelForm.value.name);
        formModel.append('quantity', this.equipmentModelForm.value.quantity);
        formModel.append('description', this.equipmentModelForm.value.description);
        formModel.append('eDocWebAddress', this.equipmentModelForm.value.eDocWebAddress);
        formModel.append('eDocLocalAddress', this.equipmentModelForm.value.eDocLocalAddress);
        formModel.append('fileupload', this.equipmentModelForm.value.fileupload);
        //debugger
        this._dataService.saveForm(formModel, this._saveUrl)
            .subscribe(function (response) {
            //console.log(response);
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            _this.getAll();
            $('#largesizemodal').modal('hide');
            _this.reset();
        }, function (error) {
            console.log(error);
        });
    };
    //Delete
    EquipmentModelsComponent.prototype.delete = function (e, m) {
        var _this = this;
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.bookname + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(function (response) {
                //console.log(response)
                _this.resmessage = response;
                _this.getAll();
            }, function (error) {
                console.log(error);
            });
        }
    };
    //Get Author 
    //getcalibration() {
    //    //debugger
    //    this._dataService.getall(this._getcalibrationUrl)
    //        .subscribe(
    //            response => {
    //                //console.log(response)
    //                this.calibrations = response;
    //            }, error => {
    //                console.log(error);
    //            }
    //        );
    //}
    ////Get Category 
    //getcategory() {
    //    //debugger
    //    this._dataService.getall(this._getcategoryUrl)
    //        .subscribe(
    //            response => {
    //                console.log(response)
    //                this.categories = response;
    //            }, error => {
    //                console.log(error);
    //            }
    //        );
    //}
    EquipmentModelsComponent.prototype.reset = function () {
        this.equipmentModelForm.setValue({
            id: 0,
            name: null,
            quantity: null,
            description: null,
            eDocWebAddress: null,
            eDocLocalAddress: null,
            fileupload: null
        });
        this.fileInput.nativeElement.value = '';
        this.resmessage = null;
        $('#bookName').focus();
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], EquipmentModelsComponent.prototype, "fileInput", void 0);
    EquipmentModelsComponent = __decorate([
        core_1.Component({
            selector: 'ng-test',
            templateUrl: './app/backoffice/equipment/equipmentModel/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], EquipmentModelsComponent);
    return EquipmentModelsComponent;
}());
exports.EquipmentModelsComponent = EquipmentModelsComponent;
//# sourceMappingURL=component.js.map