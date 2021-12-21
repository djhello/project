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
        this.updatePicture = false;
        this._getUrl = '/api/equipmentmodel/getall';
        this._getbyIdUrl = '/api/equipmentmodel/getbyid';
        this._saveUrl = '/api/equipmentmodel/save';
        this._deleteUrl = '/api/equipmentmodel/deletebyid';
        this._updateUrl = '/api/equipmentmodel/updateStatus';
        this._getDepartmanUrl = '/api/departman/getall';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }
    EquipmentModelsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Equipment Model");
        this.loadScripts();
        this.createForm();
        this.getAll();
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
            departmanId: 0,
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
        else {
            var list = new DataTransfer();
            var result = this.equipmentModel.coverImage.substr(this.equipmentModel.coverImage.indexOf("/") + 1);
            var file = new File(["content"], result);
            list.items.add(file);
            var myFileList = list.files;
            event.target.files = myFileList;
        }
    };
    //Pop Modal
    EquipmentModelsComponent.prototype.addNew = function () {
        this.getDepartmanAll();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#name').focus();
        });
        this.reset();
    };
    //Get Models 
    EquipmentModelsComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this.loading = true;
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            console.log(response);
            _this.equipmentModels = response;
        }, function (error) {
            console.log(error);
        });
        this.loading = false;
    };
    EquipmentModelsComponent.prototype.getDepartmanAll = function () {
        var _this = this;
        this.loading = true;
        this._dataService.getall(this._getDepartmanUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.departmans = response;
            console.log(_this.departmans);
        }, function (error) {
            console.log(error);
        });
    };
    //Get by ID
    EquipmentModelsComponent.prototype.edit = function (e, m) {
        var _this = this;
        //debugger
        this.getDepartmanAll();
        e.preventDefault();
        this.loading = true;
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(function (response) {
            console.log(response);
            _this.equipmentModel = response;
            _this.equipmentModelForm.setValue({
                id: _this.equipmentModel.id,
                name: _this.equipmentModel.name,
                departmanId: _this.equipmentModel.departmanId,
                quantity: _this.equipmentModel.quantity,
                description: _this.equipmentModel.description,
                eDocWebAddress: _this.equipmentModel.eDocWebAddress,
                eDocLocalAddress: _this.equipmentModel.eDocLocalAddress,
                fileupload: _this.equipmentModel.coverImage
            });
            var inputElement = document.getElementById("fileupload");
            var list = new DataTransfer();
            var result = _this.equipmentModel.coverImage.substr(_this.equipmentModel.coverImage.indexOf("/") + 1);
            var file = new File(["content"], result);
            list.items.add(file);
            var myFileList = list.files;
            inputElement.files = myFileList;
            $('#largesizemodal').modal('show');
            $("#largesizemodal").on('shown.bs.modal', function () {
                $(this).find('#name').focus();
            });
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    EquipmentModelsComponent.prototype.updateStatus = function (e, m) {
        var _this = this;
        console.log(m);
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.equipmentModelName + '. Are you sure?');
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
    //Create
    EquipmentModelsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.equipmentModelForm.invalid) {
            return;
        }
        console.log(this.equipmentModelForm.value.fileupload);
        var now = new Date();
        var formModel = new FormData();
        formModel.append('id', this.equipmentModelForm.value.id);
        formModel.append('name', this.equipmentModelForm.value.name);
        formModel.append('quantity', this.equipmentModelForm.value.quantity);
        formModel.append('description', this.equipmentModelForm.value.description);
        formModel.append('departmanId', this.equipmentModelForm.value.departmanId);
        formModel.append('eDocWebAddress', this.equipmentModelForm.value.eDocWebAddress);
        formModel.append('eDocLocalAddress', this.equipmentModelForm.value.eDocLocalAddress);
        formModel.append('fileupload', this.equipmentModelForm.value.fileupload);
        formModel.append('Status', "1");
        formModel.append('LastUserId', this.loggedUser.userId);
        formModel.append('LockStatus', "1");
        formModel.append('CreateDate', now.toString());
        //debugger
        this._dataService.saveForm(formModel, this._saveUrl)
            .subscribe(function (response) {
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            _this.getAll();
            $('#largesizemodal').modal('hide');
            _this.reset();
            _this.loading = false;
        }, function (error) {
            console.log(error);
        });
    };
    //Delete
    EquipmentModelsComponent.prototype.delete = function (e, m) {
        var _this = this;
        this.loading = true;
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.equipmentModelName + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(function (response) {
                _this.resmessage = response;
                _this.getAll();
                _this.loading = false;
            }, function (error) {
                console.log(error);
            });
        }
    };
    EquipmentModelsComponent.prototype.reset = function () {
        this.equipmentModelForm.setValue({
            id: 0,
            departmanId: 0,
            name: null,
            quantity: null,
            description: null,
            eDocWebAddress: null,
            eDocLocalAddress: null,
            fileupload: null
        });
        this.fileInput.nativeElement.value = '';
        this.resmessage = null;
        $('#name').focus();
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], EquipmentModelsComponent.prototype, "fileInput", void 0);
    EquipmentModelsComponent = __decorate([
        core_1.Component({
            selector: 'ng-equipmentModel',
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