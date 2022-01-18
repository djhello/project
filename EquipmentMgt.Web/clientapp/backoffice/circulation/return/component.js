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
var ReturnComponent = /** @class */ (function () {
    function ReturnComponent(router, titleService, formBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.equipmentReturned = [];
        this.equipmentReturnedList = [];
        this.equipmentIssueedList = [];
        this.equipmentChoosed = [];
        this.loading = false;
        this.showSearchMemberDiv = false;
        this._getUrl = '/api/circulation/getreturnall';
        this._getbyIdUrl = '/api/circulation/getReturnById';
        this._saveUrl = '/api/circulation/returnEquipment';
        this._getbyUserIdUrl = '/api/users/getById';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }
    ReturnComponent.prototype.handleKeyboardEvent = function (event) {
        this.keyPress = event.keyCode;
        if (this.keyPress == 32) {
            this.resMessage = null;
            this.reset();
            this.focus();
        }
    };
    ReturnComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | İade");
        this.loadScripts();
        this.createForm();
        this.setUser();
    };
    ReturnComponent.prototype.loadScripts = function () {
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
    ReturnComponent.prototype.createForm = function () {
        this.returnForm = this.formBuilder.group({
            id: 0,
            userId: 0,
            memberSearch: new forms_1.FormControl(''),
            memberName: new forms_1.FormControl(''),
            email: new forms_1.FormControl(''),
            equipments: []
        });
        this.focus();
    };
    ReturnComponent.prototype.setUser = function () {
        var _this = this;
        if (this.loggedUser.userType != 1) {
            this.showSearchMemberDiv = false;
            this.returnForm.setValue({
                id: 0,
                userId: this.loggedUser.userId,
                memberName: this.loggedUser.displayName,
                email: this.loggedUser.email,
                memberSearch: null,
                equipments: []
            });
            this.loading = true;
            this._dataService.getById(this.loggedUser.userId, this._getbyIdUrl)
                .subscribe(function (response) {
                _this.loading = false;
                if (response != null) {
                    console.log(response);
                    _this.equipmentIssueedList = response;
                }
                _this.resMessage = null;
            }, function (error) {
                //console.log(error);
            });
        }
        else {
            this.showSearchMemberDiv = true;
        }
    };
    //Search Member
    ReturnComponent.prototype.onChange = function (e, searchValue) {
        var _this = this;
        this.loading = true;
        this.reset();
        e.preventDefault();
        this._dataService.getById(searchValue, this._getbyUserIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.user = response;
            _this.returnForm.setValue({
                id: 0,
                userId: _this.user.userId,
                memberName: _this.user.firstName + ' ' + _this.user.lastName,
                email: _this.user.email,
                memberSearch: null,
                equipments: []
            });
        }, function (error) {
            //console.log(error);
        });
        this.loading = true;
        this._dataService.getById(searchValue, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            if (response != null) {
                _this.equipmentIssueedList = response;
            }
            _this.resMessage = null;
        }, function (error) {
            //console.log(error);
        });
    };
    //Create
    ReturnComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        this.returnForm.patchValue({
            equipments: this.equipmentChoosed
        });
        if (this.returnForm.invalid) {
            return;
        }
        if (this.returnForm.value.equipments.length != 0) {
            if (this.returnForm.value.userId > 0) {
                this._dataService.saveWithUser(this.returnForm.value, this.loggedUser, this._saveUrl)
                    .subscribe(function (response) {
                    _this.loading = false;
                    _this.resMessage = response.message;
                    _this.alertMessage = "alert-outline-info";
                    _this.reset();
                    _this.focus();
                }, function (error) {
                    //console.log(error);
                });
            }
        }
        else {
            this.loading = false;
            alert('Lütfen en az bir ekipmanı seçiniz');
        }
    };
    //Pop Modal
    ReturnComponent.prototype.returnedList = function () {
        var _this = this;
        this.loading = true;
        $('#largesizemodal').modal({ backdrop: 'static', keyboard: false, show: true });
        this._dataService.getAll(this._getUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.equipmentReturned = response;
        }, function (error) {
            //console.log(error);
        });
    };
    //Close Modal
    ReturnComponent.prototype.returnedListclose = function () {
        this.focus();
    };
    ReturnComponent.prototype.onSearch = function () {
        var term = this.searchTerm;
        this.equipmentIssueedList = this.equipmentIssueedList.filter(function (tag) {
            return tag.equipmentId.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };
    ReturnComponent.prototype.oncheckChange = function (e, i) {
        e.preventDefault();
        if (e.currentTarget.checked) {
            this.equipmentChoosed.push({
                id: i
            });
        }
        else {
            this.removeArrayList(this.equipmentChoosed, i);
        }
        console.log(this.equipmentChoosed);
    };
    ReturnComponent.prototype.removeArrayList = function (array, item) {
        array.forEach(function (element, index) {
            if (element.id == item) {
                array.splice(index, 1);
            }
        });
        return array;
    };
    //Reset Form
    ReturnComponent.prototype.reset = function () {
        if (this.loggedUser.userType == 1) {
            this.returnForm.setValue({
                id: 0,
                userId: 0,
                memberSearch: null,
                memberName: null,
                email: null,
                equipments: []
            });
        }
        this.searchTerm = "";
        this.equipmentChoosed = [];
        this.equipmentReturnedList = [];
        this.equipmentIssueedList = [];
    };
    //Focus input
    ReturnComponent.prototype.focus = function () {
        $("#memberSearch").focus();
    };
    __decorate([
        core_1.HostListener('document:keypress', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ReturnComponent.prototype, "handleKeyboardEvent", null);
    ReturnComponent = __decorate([
        core_1.Component({
            selector: 'ng-return',
            templateUrl: './app/backoffice/circulation/return/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], ReturnComponent);
    return ReturnComponent;
}());
exports.ReturnComponent = ReturnComponent;
//# sourceMappingURL=component.js.map