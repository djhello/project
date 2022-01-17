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
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var DataService = /** @class */ (function () {
    function DataService(_http) {
        this._http = _http;
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }
    //Get
    DataService.prototype.getall = function (_getUrl) {
        return this._http.get(_getUrl)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.getTestall = function (_getUrl) {
        console.log(_getUrl);
        return this._http.get(_getUrl)
            .pipe(operators_1.map(function (res) { return res.json(); }));
    };
    //GetByID
    DataService.prototype.getbyid = function (id, _getByIdUrl) {
        var getByIdUrl = _getByIdUrl + '/' + id;
        return this._http.get(getByIdUrl)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.getbytext = function (text, _getByIdUrl) {
        var getByIdUrl = _getByIdUrl + '/' + text;
        return this._http.get(getByIdUrl)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    //Post
    DataService.prototype.save = function (model, _saveUrl) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(_saveUrl, body, options)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.saveWithUser = function (model, loggedUser, _saveUrl) {
        console.log(model);
        var body = JSON.stringify(Object.assign({}, model, { LastUserId: loggedUser.userId, Status: 1, LockStatus: 0, CreateDate: new Date() }));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(_saveUrl, body, options)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.receiveWithUser = function (model, receiveQuantity, loggedUser, _receiveUrl) {
        console.log(model);
        console.log(_receiveUrl);
        console.log(receiveQuantity);
        var body = JSON.stringify(Object.assign({}, model, { receiveQuantity: receiveQuantity, LastUserId: loggedUser.userId, Status: 1, LockStatus: 0, CreateDate: new Date() }));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(_receiveUrl, body, options)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    //PostFormData
    DataService.prototype.saveForm = function (model, _saveUrl) {
        return this._http.post(_saveUrl, model)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    //updateStatus
    DataService.prototype.updateStatus = function (model, loggedUser, _updateUrl) {
        var body = JSON.stringify(Object.assign({}, model, { LastUserId: loggedUser.userid, Status: 0, LockStatus: 1, CreateDate: new Date() }));
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(_updateUrl, body, options)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    //Delete
    DataService.prototype.delete = function (id, _deleteByIdUrl) {
        var deleteByIdUrl = _deleteByIdUrl + '/' + id;
        return this._http.delete(deleteByIdUrl)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.handleError = function (error) {
        console.log("geldi hata");
        console.log(error);
        console.log(error.json());
        return rxjs_1.Observable.throw(error.json().error || 'Opps!! Server error');
    };
    DataService = __decorate([
        core_1.Component({
            providers: [http_1.Http]
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=service.js.map