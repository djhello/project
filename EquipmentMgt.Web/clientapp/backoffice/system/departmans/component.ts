import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-departmans',
    templateUrl: './app/backoffice/system/departmans/component.html',
    providers: [DataService]
})
export class DepartmansComponent implements OnInit {
    public loggedUser: any;
    public departmanForm: FormGroup;
    public departmans: any[];
    public departman: any;
    public resmessage: string;
    public alertmessage: string;
    public booleanValue: any = false;
    public loading: boolean = false; 
    public _getUrl: string = '/api/departman/getAll';
    public _getbyIdUrl: string = '/api/departman/getById';
    public _saveUrl: string = '/api/departman/save';
    public _deleteUrl: string = '/api/departman/deleteById';

    public _updateUrl: string = '/api/departman/updateStatus';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }
    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | Bölümler");
        this.createForm();
        this.getAll();
    }
    
    createForm() {
        this.departmanForm = this.formBuilder.group({
            departmanId: 0,
            departmanName: new FormControl('', Validators.required)
        });
        $("#departmanName").focus();
    }
    //Pop Modal
    addNew() {
        //debugger
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#departmanName').focus();
        });

        this.reset();
    }
    
    //Get All Departman
    getAll() {
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(
                response => {
                    this.loading = false;
                    this.departmans = response;
                }, error => {
                    console.log(error);
                }
            );
    }

    //Get by ID
    edit(e, m) {
        this.loading = true;
        e.preventDefault();
        this._dataService.getById(m.departmanId, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                this.departman = response;
                this.departmanForm.setValue({
                    departmanId: this.departman.departmanId,
                    departmanName: this.departman.departmanName
                });
                $('#defaultsizemodal').modal('show');
                $("#defaultsizemodal").on('shown.bs.modal', function () {
                    $(this).find('#departmanName').focus();
                });
            }, error => {
                //console.log(error);
            });
    }

    //Create
    onSubmit() {
        this.loading = true;
        if (this.departmanForm.invalid) {
            return;
        }
        this._dataService.saveWithUser(this.departmanForm.value, this.loggedUser, this._saveUrl)
            .subscribe(response => {
                this.resmessage = response.message;
                this.alertmessage = "alert-outline-info";
                this.getAll();
                this.reset();
                this.loading = false;
                $('#defaultsizemodal').modal('hide');
            }, error => {
                //console.log(error);
            });
    }
    updateStatus(e, m) {
        console.log(m);
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.departmanName + '. Are you sure?');
        if (IsConf) {
            this._dataService.updateStatus(m, this.loggedUser, this._updateUrl)
                .subscribe(response => {
                    //console.log(response);
                    this.resmessage = response.message;
                    this.alertmessage = "alert-outline-info";
                    this.getAll();
                    this.reset();
                    this.loading = false;
                    $('#defaultsizemodal').modal('hide');
                }, error => {
                    console.log(error);
                    this.loading = false;
                });
        }
        this.loading = false;
    }
    //Delete
    delete(e, m) {
        //debugger
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.departmanName + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.departmanId, this._deleteUrl)
                .subscribe(response => {
                    this.loading = false;
                    this.resmessage = response;
                    this.getAll();
                }, error => {
                    //console.log(error);
                });
        }
    }
    sort(colName) {
        this.departmans.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
    }
    sortFunction(colName, boolean) {
        if (boolean == true) {
            this.departmans.sort((a, b) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
            this.booleanValue = !this.booleanValue
        }
        else {
            this.departmans.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
            this.booleanValue = !this.booleanValue
        }
    }
    reset() {
        this.departmanForm.setValue({
            departmanId: 0,
            departmanName: null
        });

        this.resmessage = null;

        $('#departmanName').focus();
    }
}
