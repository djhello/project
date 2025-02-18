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
        this.equipmentlist = [];
        this.availableequipmentlist = [];
        this.equipmentchoosed = [];
        this.equipmentissueed = [];
        this.equipmentissueedlist = [];
        this._getUrl = '/api/circulation/getissueall';
        this._getbyIdUrl = '/api/circulation/getissuebyid';
        this._saveUrl = '/api/circulation/issueequipment';
        this._getequipmentUrl = '/api/circulation/getallequipment';
        this._getavailableallequipmentUrl = '/api/equipment/getavailableallequipment';
        this._getbyUserIdUrl = '/api/users/getbyid';
    }
    IssueComponent.prototype.handleKeyboardEvent = function (event) {
        this.keypress = event.keyCode;
        if (this.keypress == 32) {
            this.resmessage = null;
            this.reset();
            this.focus();
        }
    };
    IssueComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi| Ödünç");
        this.loadScripts();
        this.createForm();
        //this.equipmentList();
        this.availableequipmentList();
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
            userId: 0,
            memberSearch: new forms_1.FormControl(''),
            memberName: new forms_1.FormControl(''),
            email: new forms_1.FormControl(''),
            dueDate: new forms_1.FormControl(''),
            equipments: []
        });
        this.focus();
    };
    //Search Member
    IssueComponent.prototype.onChange = function (e, searchValue) {
        var _this = this;
        this.reset();
        e.preventDefault();
        this._dataService.getbyid(searchValue, this._getbyUserIdUrl)
            .subscribe(function (response) {
            _this.user = response;
            var dt = new Date();
            dt.setDate(dt.getDate() + 15);
            _this.issueForm.setValue({
                id: 0,
                userId: _this.user.userId,
                memberName: _this.user.firstname + " " + _this.user.firstname,
                email: _this.user.email,
                dueDate: dt.toLocaleDateString('en-US'),
                memberSearch: null,
                equipments: []
            });
        }, function (error) {
            //console.log(error);
        });
        this._dataService.getbyid(searchValue, this._getbyIdUrl)
            .subscribe(function (response) {
            console.log(response);
            if (response != null) {
                _this.equipmentissueedlist = response;
            }
            //this.focus();
            _this.resmessage = null;
        }, function (error) {
            //console.log(error);
        });
    };
    //Search
    IssueComponent.prototype.onSearch = function () {
        var term = this.searchTerm;
        this.availableequipmentlist = this.availableequipmentlist.filter(function (tag) {
            return tag.equipmentId.indexOf(term) >= 0;
        });
    };
    //Get Choosed equipment
    IssueComponent.prototype.oncheckChange = function (e, i) {
        e.preventDefault();
        if (e.currentTarget.checked) {
            this.equipmentchoosed.push({
                id: i
            });
        }
    };
    //Create
    IssueComponent.prototype.onSubmit = function () {
        var _this = this;
        this.issueForm.patchValue({
            equipments: this.equipmentchoosed
        });
        console.log(this.equipmentchoosed);
        if (this.issueForm.invalid) {
            return;
        }
        if (this.issueForm.value.userId > 0) {
            this._dataService.save(this.issueForm.value, this._saveUrl)
                .subscribe(function (response) {
                _this.resmessage = response.message;
                _this.alertmessage = "alert-outline-info";
                _this.reset();
                _this.focus();
            }, function (error) {
                //console.log(error);
            });
        }
    };
    //equipmentlist to choose
    IssueComponent.prototype.equipmentList = function () {
        var _this = this;
        this._dataService.getall(this._getequipmentUrl)
            .subscribe(function (response) {
            _this.equipmentlist = response;
        }, function (error) {
            //console.log(error);
        });
    };
    IssueComponent.prototype.availableequipmentList = function () {
        var _this = this;
        this._dataService.getall(this._getavailableallequipmentUrl)
            .subscribe(function (response) {
            _this.availableequipmentlist = response;
        }, function (error) {
            //console.log(error);
        });
    };
    //Pop Modal
    IssueComponent.prototype.issueedList = function () {
        var _this = this;
        $('#largesizemodal').modal({ backdrop: 'static', keyboard: false, show: true });
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            _this.equipmentissueed = response;
        }, function (error) {
            //console.log(error);
        });
        console.log(this.equipmentissueed);
    };
    //Close Modal
    IssueComponent.prototype.issueedListclose = function () {
        this.focus();
    };
    //Reset Form
    IssueComponent.prototype.reset = function () {
        this.issueForm.setValue({
            id: 0,
            userId: 0,
            memberSearch: null,
            memberName: null,
            email: null,
            dueDate: null,
            equipments: []
        });
        this.searchTerm = "";
        this.equipmentissueedlist = [];
        this.availableequipmentList();
        this.availableequipmentlist = [];
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