import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';


@Component({
    selector: 'ng-users',
    templateUrl: './app/backoffice/system/users/component.html',
    providers: [DataService]
})
export class UsersComponent implements OnInit {

    public loggedUser: any;
    public userForm: FormGroup;
    public users: any[];
    public departmans: any[];
    public user: any;
    public resmessage: string;
    public alertmessage: string;
    public loading: boolean = false; 

    public _getUrl: string = '/api/users/getall';
    public _getbyIdUrl: string = '/api/users/getbyid';
    public _saveUrl: string = '/api/users/save';
    public _deleteUrl: string = '/api/users/deletebyid';
    public _updateUrl: string = '/api/users/updateStatus';

    public _getDepartmanUrl: string = '/api/departman/getall';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {

        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | Kullancılar");
        this.createForm();
        this.getAll();
    }
    userTypeControl() {
        if (this.loggedUser.loggedUserType != 1) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('loggedUser');
            this.router.navigate(['/login']);
        }  
    }
    createForm() {
        this.userForm = this.formBuilder.group({
            id:0,
            userId: 0,
            departmanId:0,
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@tei.com.tr+$')
            ]))
        });

        $("#firstName").focus();
    }

    //Pop Modal
    addNew() {
        this.getDepartmanAll();
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#firstName').focus();
        });

        this.reset();
    }

    //Get All User
    getAll() {
        this.loading = true;
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    this.loading = false;
                    this.users = response;
                }, error => {
                    console.log(error);
                }
            );
    }
    getDepartmanAll() {
        this.loading = true;
        this._dataService.getall(this._getDepartmanUrl)
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
        this.getDepartmanAll();
        this.loading = true;
        e.preventDefault();
        this._dataService.getbyid(m.userId, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                this.user = response;
                this.userForm.setValue({
                    id:this.user.id,
                    userId: this.user.userId,
                    departmanId: this.user.departmanId,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email
                });
                $('#defaultsizemodal').modal('show');
                $("#defaultsizemodal").on('shown.bs.modal', function () {
                    $(this).find('#firstName').focus();
                });
            }, error => {
                //console.log(error);
            });
    }

    //Create
    onSubmit() {
        this.loading = true;
        if (this.userForm.invalid) {
            return;
        }
        this._dataService.saveWithUser(this.userForm.value, this.loggedUser,this._saveUrl)
            .subscribe(response => {
                //console.log(response);
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
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.firstName + '. Are you sure?');
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
        var IsConf = confirm('You are about to delete ' + m.firstName + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.userId, this._deleteUrl)
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
        this.userForm.setValue({
            id: 0,
            userId: 0,
            departmanId:0,
            firstName: null,
            lastName: null,
            email: null
        });

        this.resmessage = null;

        $('#firstName').focus();
    }
}
