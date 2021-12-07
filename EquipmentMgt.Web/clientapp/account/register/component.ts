import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../shared/service';
import { ConfirmedValidator } from '../../shared/confirmed.validator';

@Component({
    selector: 'app-register',
    templateUrl: './app/account/register/component.html',
    providers: [DataService]
})

export class RegisterComponent implements OnInit {
    public loggedUser: any;
    public userForm: FormGroup;
    public loading: boolean = false;
    public departmans: any[];
    public resmessage: string;
    public alertmessage: string;
    public _saveUrl: string = '/api/auth/regusers';
    public _getDepartmanUrl: string = '/api/departman/getall';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | Register");
        this.createForm();
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.getDepartmanAll();
    }
   
    createForm() {
        this.userForm = this.formBuilder.group({
            userId: new FormControl('', Validators.required),
            departmanId: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@tei.com.tr+$')
            ])),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required)
        },{
            validator: ConfirmedValidator('password', 'confirmPassword')
        });

        $("#userId").focus();
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
    onSubmit() {
        if (this.userForm.invalid) {
            return;
        }
        this.loading = true;
        //debugger
        this._dataService.save(this.userForm.value, this._saveUrl)
            .subscribe(response => {
                this.loading = false;
                this.resmessage = response.message;
                this.alertmessage = "alert-outline-info";
                if (this.resmessage == "Saved Successfully.") {
                    this.reset();
                    //this.router.navigate(['/login']);
                }
            }, error => {
            });
    }

    reset() {
        this.userForm.setValue({
            firstName: null,
            lastName: null,
            userId: null,
            departmanId:null,
            email: null,
            password: null,
            confirmPassword:null
        });

        //this.resmessage = null;
    }
}
