import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../shared/service';
import * as bcrypt from "bcryptjs";
const saltround = 10;

@Component({
    selector: 'app-login',
    templateUrl: './app/account/login/component.html',
    providers: [DataService],
})

export class LoginComponent implements OnInit {
    public checked: boolean = false;
    public loggedUser: any;
    public userForm: FormGroup;
    public loading: boolean = false;
    public resmessage: string;
    public alertmessage: string;
    public _saveUrl: string = '/api/auth/loginusers';
    public _checkPasswordUrl: string = '/api/auth/checkPassword';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
        if (localStorage.getItem('isLoggedin')) {
            this.router.navigate(['/backoffice']);

        }
    }
    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | Login");
        this.createForm();
        this.reset();
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }

    createForm() {
        this.userForm = this.formBuilder.group({
            userName: new FormControl('', Validators.required),
            userPass: new FormControl('', Validators.required)
        });

        $("#userName").focus();
    }

    onSubmit() {
        this.resmessage = null;
        if (this.userForm.invalid) {
            return;
        }
        var that = this;
        this.loading = true;
        this._dataService.saveForm({ userName: this.userForm.value.userName }, this._checkPasswordUrl)
            .subscribe(loginCheckResponse => {
                bcrypt.compare(this.userForm.value.userPass, loginCheckResponse.loggedUser.userPass, function (err, matches) {
                    if (err)
                        console.log('Error while checking password');
                    else if (matches) {
                        that._dataService.saveForm({ userName: that.userForm.value.userName }, that._saveUrl)
                            .subscribe(response => {
                                that.loading = false;
                                var loggedUser = response.loggedUser;
                                if (loggedUser != null) {
                                    localStorage.setItem('isLoggedin', 'true');
                                    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
                                    that.router.navigate(['/backoffice']);
                                }
                            }, error => {
                                //console.log(error);
                            });
                    }
                    else {
                        that.loading = false;
                        that.resmessage = "Login Faild";
                        that.alertmessage = "alert-outline-danger";
                    }
                    that.loading = false;
                });
            });
    }
  
    reset() {
        this.userForm.setValue({
            userName: null,
            userPass: null
        });

        this.resmessage = null;
    }
}
