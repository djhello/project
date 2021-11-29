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
var confirmed_validator_1 = require("../../../shared/confirmed.validator");
var UserSettingsComponent = /** @class */ (function () {
    function UserSettingsComponent(router, titleService, formBuilder, passwordFormBuilder, _dataService) {
        this.router = router;
        this.titleService = titleService;
        this.formBuilder = formBuilder;
        this.passwordFormBuilder = passwordFormBuilder;
        this._dataService = _dataService;
        this.loading = false;
        this._getbyIdUrl = '/api/users/getbyid';
        this._updateUrl = '/api/users/updateUserInfos';
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }
    UserSettingsComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("Envanter Takip Sistemi | User Settings");
        this.createUserForm();
        this.createPasswordForm();
        this.getbyIdUrl();
    };
    UserSettingsComponent.prototype.createUserForm = function () {
        this.userForm = this.formBuilder.group({
            userId: new forms_1.FormControl('', forms_1.Validators.required),
            firstName: new forms_1.FormControl('', forms_1.Validators.required),
            lastName: new forms_1.FormControl('', forms_1.Validators.required),
            email: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.pattern('^[a-zA-Z0-9_.+-]+@tei.com.tr+$')
            ]))
        });
        $("#userId").focus();
    };
    UserSettingsComponent.prototype.createPasswordForm = function () {
        this.passwordForm = this.passwordFormBuilder.group({
            password: new forms_1.FormControl('', forms_1.Validators.required),
            confirmPassword: new forms_1.FormControl('', forms_1.Validators.required)
        }, {
            validator: confirmed_validator_1.ConfirmedValidator('password', 'confirmPassword')
        });
    };
    UserSettingsComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.userForm.invalid) {
            return;
        }
        this.loading = true;
        this._dataService.save(this.userForm.value, this._updateUrl)
            .subscribe(function (response) {
            _this.loading = false;
            _this.resmessage = response.message;
            _this.alertmessage = "alert-outline-info";
            if (_this.resmessage == "Saved Successfully.") {
                _this.reset();
            }
        }, function (error) {
        });
    };
    UserSettingsComponent.prototype.getbyIdUrl = function () {
        var _this = this;
        this.loading = true;
        console.log(this.loggedUser);
        this._dataService.getbyid(this.loggedUser.userid, this._getbyIdUrl)
            .subscribe(function (response) {
            console.log(response);
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
    UserSettingsComponent.prototype.reset = function () {
        this.userForm.setValue({
            firstName: null,
            lastName: null,
            userId: null,
            email: null
        });
        //this.resmessage = null;
    };
    UserSettingsComponent = __decorate([
        core_1.Component({
            selector: 'app-userSettings',
            templateUrl: './app/backoffice/system/settings/component.html',
            providers: [service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            platform_browser_1.Title,
            forms_1.FormBuilder,
            forms_1.FormBuilder,
            service_1.DataService])
    ], UserSettingsComponent);
    return UserSettingsComponent;
}());
exports.UserSettingsComponent = UserSettingsComponent;
//# sourceMappingURL=component.js.map