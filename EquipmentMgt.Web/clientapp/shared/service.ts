import { Injectable, Component } from '@angular/core';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { text } from '@angular/core/src/render3/instructions';


@Component({
    providers: [Http]
})

@Injectable()

export class DataService {
    public headers: Headers;
    public loggedUser: any;

    constructor(private _http: Http) {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }
    

    //Get
    getall(_getUrl: string): Observable<any[]> {
        return this._http.get(_getUrl)
            .pipe(map(res => <any[]>res.json()))
            .pipe(catchError(this.handleError));
    }

    //GetByID
    getbyid(id: string, _getByIdUrl: string): Observable<any> {
        var getByIdUrl = _getByIdUrl + '/' + id;

        return this._http.get(getByIdUrl)
            .pipe(map(res => <any>res.json()))
            .pipe(catchError(this.handleError));
    }
    getbytext(text: string, _getByIdUrl: string): Observable<any> {
        var getByIdUrl = _getByIdUrl + '/' + text;

        return this._http.get(getByIdUrl)
            .pipe(map(res => <any>res.json()))
            .pipe(catchError(this.handleError));
    }
    //Post
    save(model: any, _saveUrl: string): Observable<any> {
        let body = JSON.stringify (model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(_saveUrl, body, options)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }
    saveWithUser(model: any, loggedUser: any, _saveUrl: string): Observable<any> {
        let body = JSON.stringify(Object.assign({}, model, { LastUserId: loggedUser.userid, Status: 1, LockStatus: 0, CreateDate: new Date() }));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(_saveUrl, body, options)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }
    //PostFormData
    saveForm(model: any, _saveUrl: string): Observable<any> {
        return this._http.post(_saveUrl, model)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }
    updateStatus(id: string, loggedUser: any, _updateUrl: string): Observable<any> {
        console.log(_updateUrl);
        let body = JSON.stringify({ id: id, LastUserId: loggedUser.userid, Status: 0, LockStatus:1, CreateDate: new Date() });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(_updateUrl, body, options)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }
    //Delete
    delete(id: string, _deleteByIdUrl: string): Observable<any> {
        var deleteByIdUrl = _deleteByIdUrl + '/' + id

        return this._http.delete(deleteByIdUrl)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }
}