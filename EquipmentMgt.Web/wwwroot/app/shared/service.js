"use strict";var __decorate=this&&this.__decorate||function(t,e,r,o){var p,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,r,o);else for(var s=t.length-1;0<=s;s--)(p=t[s])&&(a=(n<3?p(a):3<n?p(e,r,a):p(e,r))||a);return 3<n&&a&&Object.defineProperty(e,r,a),a},__metadata=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),http_1=require("@angular/http"),rxjs_1=require("rxjs"),operators_1=require("rxjs/operators"),DataService=function(){function t(t){this._http=t,this.loggedUser=JSON.parse(localStorage.getItem("loggedUser"))}return t.prototype.getall=function(t){return this._http.get(t).pipe(operators_1.map(function(t){return t.json()})).pipe(operators_1.catchError(this.handleError))},t.prototype.getbyid=function(t,e){return this._http.get(e+"/"+t).pipe(operators_1.map(function(t){return t.json()})).pipe(operators_1.catchError(this.handleError))},t.prototype.getbytext=function(t,e){return this._http.get(e+"/"+t).pipe(operators_1.map(function(t){return t.json()})).pipe(operators_1.catchError(this.handleError))},t.prototype.save=function(t,e){var r=JSON.stringify(t),t=new http_1.Headers({"Content-Type":"application/json"}),t=new http_1.RequestOptions({headers:t});return this._http.post(e,r,t).pipe(operators_1.map(function(t){return t.json()})).pipe(operators_1.catchError(this.handleError))},t.prototype.saveWithUser=function(t,e,r){t=JSON.stringify(Object.assign({},t,{LastUserId:e.userid,Status:1,LockStatus:0,CreateDate:new Date})),e=new http_1.Headers({"Content-Type":"application/json"}),e=new http_1.RequestOptions({headers:e});return this._http.post(r,t,e).pipe(operators_1.map(function(t){return t.json()})).pipe(operators_1.catchError(this.handleError))},t.prototype.saveForm=function(t,e){return this._http.post(e,t).pipe(operators_1.map(function(t){return t.json()})).pipe(operators_1.catchError(this.handleError))},t.prototype.updateStatus=function(t,e,r){console.log(r);t=JSON.stringify({id:t,LastUserId:e.userid,Status:0,LockStatus:1,CreateDate:new Date}),e=new http_1.Headers({"Content-Type":"application/json"}),e=new http_1.RequestOptions({headers:e});return this._http.post(r,t,e).pipe(operators_1.map(function(t){return t.json()})).pipe(operators_1.catchError(this.handleError))},t.prototype.delete=function(t,e){return this._http.delete(e+"/"+t).pipe(operators_1.map(function(t){return t.json()})).pipe(operators_1.catchError(this.handleError))},t.prototype.handleError=function(t){return rxjs_1.Observable.throw(t.json().error||"Opps!! Server error")},__decorate([core_1.Component({providers:[http_1.Http]}),core_1.Injectable(),__metadata("design:paramtypes",[http_1.Http])],t)}();exports.DataService=DataService;