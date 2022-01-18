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
var IssueComponent = /** @class */ (function () {
    function IssueComponent(router, titleService, formBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.equipmentsList = [];
        this.availableEquipmentList = [];
        this.availableEquipmentListCopy = [];
        this.equipmentChoosed = [];
        this.equipmentIssueedList = [];
        this.equipmentByUserIssueedList = [];
        this.loading = false;
        this.showSearchMemberDiv = false;
        this._getUrl = '/api/circulation/getIssueAll';
        this._getbyIdUrl = '/api/circulation/getIssueById';
        this._saveUrl = '/api/circulation/issueEquipment';
        this._getEquipmentUrl = '/api/circulation/getAllequipment';
        this._getAvailableallEquipmentUrl = '/api/equipment/getAvailableallEquipment';
        this._getbyUserIdUrl = '/api/users/getById';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }
    IssueComponent.prototype.handleKeyboardEvent = function (event) {
        this.keyPress = event.keyCode;
        if (this.keyPress == 32) {
            this.resMessage = null;
            this.reset();
            this.focus();
        }
    };
    IssueComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi| Ödünç");
        this.loadScripts();
        this.createForm();
        this.getAvailableEquipmentList();
        this.setUser();
    };
    IssueComponent.prototype.loadScripts = function () {
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
    IssueComponent.prototype.createForm = function () {
        this.issueForm = this.formBuilder.group({
            id: 0,
            userId: new forms_1.FormControl('', forms_1.Validators.required),
            memberSearch: new forms_1.FormControl(''),
            memberName: new forms_1.FormControl(''),
            email: new forms_1.FormControl('', forms_1.Validators.required),
            dueDate: new forms_1.FormControl('', forms_1.Validators.required),
            equipments: []
        });
        this.focus();
    };
    IssueComponent.prototype.setUser = function () {
        console.log(this.loggedUser);
        if (this.loggedUser.userType != 1) {
            this.showSearchMemberDiv = false;
            var dt = new Date();
            dt.setDate(dt.getDate() + 15);
            this.issueForm.setValue({
                id: 0,
                userId: this.loggedUser.userId,
                memberName: this.loggedUser.displayName,
                email: this.loggedUser.email,
                dueDate: dt.toLocaleDateString('en-US'),
                memberSearch: null,
                equipments: []
            });
        }
        else {
            this.showSearchMemberDiv = true;
        }
    };
    //Search Member
    IssueComponent.prototype.onChange = function (e, searchValue) {
        var _this = this;
        this.loading = true;
        this.reset();
        e.preventDefault();
        this._dataService.getById(searchValue, this._getbyUserIdUrl)
            .subscribe(function (response) {
            _this.user = response;
            var dt = new Date();
            dt.setDate(dt.getDate() + 15);
            _this.issueForm.setValue({
                id: 0,
                userId: _this.user.userId,
                memberName: _this.user.firstName + ' ' + _this.user.lastName,
                email: _this.user.email,
                dueDate: dt.toLocaleDateString('en-US'),
                memberSearch: null,
                equipments: []
            });
        }, function (error) {
            //console.log(error);
        });
        this._dataService.getById(searchValue, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            if (response != null) {
                _this.equipmentByUserIssueedList = response;
            }
            _this.resMessage = null;
        }, function (error) {
            //console.log(error);
        });
    };
    //Search
    IssueComponent.prototype.onSearch = function () {
        var term = this.searchTerm;
        this.availableEquipmentList = this.availableEquipmentListCopy.filter(function (tag) {
            return tag.equipmentId.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    };
    //Get Choosed equipment
    IssueComponent.prototype.oncheckChange = function (e, i) {
        e.preventDefault();
        if (e.currentTarget.checked) {
            this.equipmentChoosed.push({
                id: i
            });
        }
        else {
            this.removeArrayList(this.equipmentChoosed, i);
        }
    };
    IssueComponent.prototype.removeArrayList = function (array, item) {
        array.forEach(function (element, index) {
            if (element.id == item) {
                array.splice(index, 1);
            }
        });
        return array;
    };
    //Create
    IssueComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        this.issueForm.patchValue({
            equipments: this.equipmentChoosed
        });
        if (this.issueForm.invalid) {
            return;
        }
        if (this.issueForm.value.equipments.length != 0) {
            if (this.issueForm.value.userId > 0) {
                this._dataService.saveWithUser(this.issueForm.value, this.loggedUser, this._saveUrl)
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
    //equipmentlist to choose
    IssueComponent.prototype.equipmentList = function () {
        var _this = this;
        this.loading = true;
        this._dataService.getAll(this._getEquipmentUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.equipmentsList = response;
        }, function (error) {
            //console.log(error);
        });
    };
    IssueComponent.prototype.getAvailableEquipmentList = function () {
        var _this = this;
        this.loading = true;
        this._dataService.getAll(this._getAvailableallEquipmentUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.availableEquipmentList = response;
            _this.availableEquipmentListCopy = response;
        }, function (error) {
            //console.log(error);
        });
    };
    //Pop Modal
    IssueComponent.prototype.issueedList = function () {
        var _this = this;
        this.loading = true;
        $('#largesizemodal').modal({ backdrop: 'static', keyboard: false, show: true });
        this._dataService.getAll(this._getUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.equipmentIssueedList = response;
        }, function (error) {
            //console.log(error);
        });
    };
    //Close Modal
    IssueComponent.prototype.issueedListclose = function () {
        this.focus();
    };
    //Reset Form
    IssueComponent.prototype.reset = function () {
        if (this.loggedUser.userType == 1) {
            this.issueForm.setValue({
                id: 0,
                userId: 0,
                memberSearch: null,
                memberName: null,
                email: null,
                dueDate: null,
                equipments: []
            });
        }
        this.searchTerm = "";
        this.availableEquipmentList = [];
        this.availableEquipmentListCopy = [];
        this.getAvailableEquipmentList();
        this.equipmentByUserIssueedList = [];
        this.equipmentChoosed = [];
    };
    //Focus input
    IssueComponent.prototype.focus = function () {
        $("#memberSearch").focus();
    };
    __decorate([
        core_1.HostListener('document:keypress', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], IssueComponent.prototype, "handleKeyboardEvent", null);
    IssueComponent = __decorate([
        core_1.Component({
            selector: 'ng-issue',
            templateUrl: './app/backoffice/circulation/issue/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], IssueComponent);
    return IssueComponent;
}());
exports.IssueComponent = IssueComponent;
//# sourceMappingURL=component.js.map