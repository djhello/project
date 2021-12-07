"use strict";var __decorate=this&&this.__decorate||function(e,r,t,s){var o,a=arguments.length,i=a<3?r:null===s?s=Object.getOwnPropertyDescriptor(r,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,r,t,s);else for(var n=e.length-1;0<=n;n--)(o=e[n])&&(i=(a<3?o(i):3<a?o(r,t,i):o(r,t))||i);return 3<a&&i&&Object.defineProperty(r,t,i),i},__metadata=this&&this.__metadata||function(e,r){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,r)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../../shared/service"),confirmed_validator_1=require("../../../shared/confirmed.validator"),UserSettingsComponent=function(){function e(e,r,t,s,o){this.router=e,this.titleService=r,this.formBuilder=t,this.passwordFormBuilder=s,this._dataService=o,this.loading=!1,this._getbyIdUrl="/api/users/getbyid",this._updateUrl="/api/users/updateUserInfos",this._updatePasswordUrl="/api/users/updatePasswordUrl",this.loggedUser=JSON.parse(localStorage.getItem("loggedUser"))}return e.prototype.ngOnInit=function(){this.titleService.setTitle("Envanter Takip Sistemi | User Settings"),this.createUserForm(),this.createPasswordForm(),this.getbyIdUrl(),this.loggedUser=JSON.parse(localStorage.getItem("loggedUser"))},e.prototype.createUserForm=function(){this.userForm=this.formBuilder.group({userId:new forms_1.FormControl("",forms_1.Validators.required),firstName:new forms_1.FormControl("",forms_1.Validators.required),lastName:new forms_1.FormControl("",forms_1.Validators.required),email:new forms_1.FormControl("",forms_1.Validators.compose([forms_1.Validators.required,forms_1.Validators.pattern("^[a-zA-Z0-9_.+-]+@tei.com.tr+$")]))}),$("#userId").focus()},e.prototype.createPasswordForm=function(){this.passwordForm=this.passwordFormBuilder.group({password:new forms_1.FormControl("",forms_1.Validators.required),confirmPassword:new forms_1.FormControl("",forms_1.Validators.required)},{validator:confirmed_validator_1.ConfirmedValidator("password","confirmPassword")})},e.prototype.onSubmit=function(){var r=this;this.userForm.invalid||(this.loading=!0,this._dataService.saveWithUser(this.userForm.value,this.loggedUser,this._updateUrl).subscribe(function(e){r.loading=!1,r.resmessage=e.message,r.alertmessage="alert-outline-info"},function(e){}))},e.prototype.onSubmitPassword=function(){var r=this;this.passwordForm.invalid||(this.loading=!0,this._dataService.saveWithUser({userId:this.user.userId,password:this.passwordForm.value.password},this.loggedUser,this._updatePasswordUrl).subscribe(function(e){r.loading=!1,r.resmessage=e.message,r.alertmessage="alert-outline-info","Saved Successfully."==r.resmessage&&r.passwordReset()},function(e){}))},e.prototype.getbyIdUrl=function(){var r=this;this.loading=!0,this._dataService.getbyid(this.loggedUser.userid,this._getbyIdUrl).subscribe(function(e){r.loading=!1,r.user=e,r.userForm.setValue({userId:r.user.userId,firstName:r.user.firstname,lastName:r.user.lastname,email:r.user.email}),$("#defaultsizemodal").modal("show"),$("#defaultsizemodal").on("shown.bs.modal",function(){$(this).find("#firstName").focus()})},function(e){})},e.prototype.reset=function(){this.userForm.setValue({firstName:null,lastName:null,userId:null,email:null})},e.prototype.passwordReset=function(){this.passwordForm.setValue({password:null,confirmPassword:null})},__decorate([core_1.Component({selector:"app-userSettings",templateUrl:"./app/backoffice/system/settings/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,forms_1.FormBuilder,service_1.DataService])],e)}();exports.UserSettingsComponent=UserSettingsComponent;