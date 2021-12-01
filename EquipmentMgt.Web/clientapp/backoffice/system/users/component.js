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
var UsersComponent = /** @class */ (function () {
    function UsersComponent(router, titleService, formBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this._dataService = _dataService;
        this.loading = false;
        this._getUrl = '/api/users/getall';
        this._getbyIdUrl = '/api/users/getbyid';
        this._saveUrl = '/api/users/save';
        this._deleteUrl = '/api/users/deletebyid';
        this._getDepartmansUrl = '/api/departmans/getall';
        var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUsername = loggedUser.displayname;
        this.loggedemail = loggedUser.email;
        this.loggedUsertype = loggedUser.usertype;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | Kullancılar");
        this.createForm();
        this.getAll();
    };
    UsersComponent.prototype.userTypeControl = function () {
        if (this.loggedUsertype != 1) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('loggedUser');
            this.router.navigate(['/login']);
        }
    };
    UsersComponent.prototype.createForm = function () {
        this.userForm = this.formBuilder.group({
            userId: 0,
            firstName: new forms_1.FormControl('', forms_1.Validators.required),
            lastName: new forms_1.FormControl('', forms_1.Validators.required),
            email: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
        });
        $("#firstName").focus();
    };
    //Pop Modal
    UsersComponent.prototype.addNew = function () {
        //debugger
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#firstName').focus();
        });
        this.reset();
    };
    //Get All User
    UsersComponent.prototype.getAll = function () {
        var _this = this;
        this.loading = true;
        this._dataService.getall(this._getUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.users = response;
        }, function (error) {
            console.log(error);
        });
    };
    //Get by ID
    UsersComponent.prototype.edit = function (e, m) {
        var _this = this;
        this.loading = true;
        e.preventDefault();
        this._dataService.getbyid(m.userId, this._getbyIdUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.user = response;
            _this.userForm.setValue({
                userId: _this.user.userId,
                firstName: _this.user.firstname,
                lastName: _this.user.lastname,
                email: _this.user.email
            });
            $('#defaultsizemodal').modal('show');
            $("#defaultsizemodal").on('shown.bs.modal', function () {
                $(this).find('#firstName').focus();
            });
        }, function (error) {
            //console.log(error);
        });
    };
    //Create
    UsersComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        if (this.userForm.invalid) {
            return;
        }
        //debugger
        this._dataService.save(this.userForm.value, this._saveUrl)
            .subscribe(function (response) {
            //console.log(response);
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            _this.getAll();
            _this.reset();
            _this.loading = false;
        }, function (error) {
            //console.log(error);
        });
    };
    //Delete
    UsersComponent.prototype.delete = function (e, m) {
        var _this = this;
        //debugger
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.firstname + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.userId, this._deleteUrl)
                .subscribe(function (response) {
                _this.loading = false;
                _this.resmessage = response;
                _this.getAll();
            }, function (error) {
                //console.log(error);
            });
        }
    };
    UsersComponent.prototype.reset = function () {
        this.userForm.setValue({
            userId: 0,
            firstName: null,
            lastName: null,
            email: null
        });
        this.resmessage = null;
        $('#firstName').focus();
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'ng-users',
            templateUrl: './app/backoffice/system/users/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            service_1.DataService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=component.js.map