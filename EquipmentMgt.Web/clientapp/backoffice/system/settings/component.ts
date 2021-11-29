import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';
import { ConfirmedValidator } from '../../../shared/confirmed.validator';

@Component({
    selector: 'app-userSettings',
    templateUrl: './app/backoffice/system/settings/component.html',
    providers: [DataService]
})

export class UserSettingsComponent implements OnInit {
    public userForm: FormGroup;
    public passwordForm: FormGroup;
    public user: any;
    public loggedUser: any;
    public loading: boolean = false;
    public resmessage: string;
    public alertmessage: string;
    public _getbyIdUrl: string = '/api/users/getbyid';
    public _updateUrl: string = '/api/users/updateUserInfos';
    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private passwordFormBuilder: FormBuilder,
        private _dataService: DataService) {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | User Settings");
        this.createUserForm();
        this.createPasswordForm();
        this.getbyIdUrl();
    }
   
    createUserForm() {
        this.userForm = this.formBuilder.group({
            userId: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@tei.com.tr+$')
            ]))
        });
        $("#userId").focus();
    }
    createPasswordForm() {
        this.passwordForm = this.passwordFormBuilder.group({
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required)
        }, {
            validator: ConfirmedValidator('password', 'confirmPassword')
        });
    }
    onSubmit() {
        if (this.userForm.invalid) {
            return;
        }
        this.loading = true;
        this._dataService.save(this.userForm.value, this._updateUrl)
            .subscribe(response => {
                this.loading = false;
                this.resmessage = response.message;
                this.alertmessage = "alert-outline-info";
                if (this.resmessage == "Saved Successfully.") {
                    this.reset();
                }
            }, error => {
            });
    }
    getbyIdUrl() {
        this.loading = true;
        console.log(this.loggedUser);
        this._dataService.getbyid(this.loggedUser.userid, this._getbyIdUrl )
            .subscribe(response => {
                console.log(response);
                this.loading = false;
                this.user = response;
                this.userForm.setValue({
                    userId: this.user.userId,
                    firstName: this.user.firstname,
                    lastName: this.user.lastname,
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
   
    reset() {
        this.userForm.setValue({
            firstName: null,
            lastName: null,
            userId:null,
            email: null
        });

        //this.resmessage = null;
    }
}
