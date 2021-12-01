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
    public loading: boolean = false; 
    public _getUrl: string = '/api/departman/getall';
    public _getbyIdUrl: string = '/api/departman/getbyid';
    public _saveUrl: string = '/api/departman/save';
    public _deleteUrl: string = '/api/departman/deletebyid';

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
    userTypeControl() {
        if (this.loggedUser.usertype != 1) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('loggedUser');
            this.router.navigate(['/login']);
        }  
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
        this._dataService.getall(this._getUrl)
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
        this._dataService.getbyid(m.departmanId, this._getbyIdUrl)
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
        console.log(this.departmanForm.value);
        this._dataService.save(this.departmanForm.value, this._saveUrl)
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

    reset() {
        this.departmanForm.setValue({
            departmanId: 0,
            departmanName: null
        });

        this.resmessage = null;

        $('#departmanName').focus();
    }
}
