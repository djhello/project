import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-calibration',
    templateUrl: './app/backoffice/equipment/calibration/component.html',
    providers: [DataService]
})

export class CalibrationsComponent implements OnInit {
    public loggedUsername: string;
    public loggedUsertype: number;
    public loggedemail: string;

    public calibrations: any[];
    public calibration: any;
    public calibrationForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;

    public _getUrl: string = '/api/calibration/getall';
    public _getbyIdUrl: string = '/api/calibration/getbyid';
    public _saveUrl: string = '/api/calibration/save';
    public _deleteUrl: string = '/api/calibration/deletebyid';

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {

            var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
            this.loggedUsername = loggedUser.displayname;
            this.loggedemail = loggedUser.email;
            this.loggedUsertype = loggedUser.usertype;
    }

  

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | Calibrations");
        this.createForm();
        this.getAll();
        if (this.loggedUsertype != 1) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('loggedUser');
            this.router.navigate(['/login']);
        }
    }

    createForm() {
        this.calibrationForm = this.formBuilder.group({
            id: 0,
            calibrationName: new FormControl('', Validators.required)
        });
    }

    //Pop Modal
    addNew() {
        //debugger
        $('#defaultsizemodal').modal('show');
        $("#defaultsizemodal").on('shown.bs.modal', function () {
            $(this).find('#calibrationName').focus();
        });

        this.reset();
    }

    //Get All 
    getAll() {
        //debugger
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    this.calibrations = response;
                }, error => {
                    console.log(error);
                }
            );
    }

    //Get by ID
    edit(e, m) {
        //debugger
        e.preventDefault();
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(response => {
                
                this.calibration = response;
               //console.log(this.calibration.calibrationName);
                this.calibrationForm.setValue({
                    id: this.calibration.id,
                    calibrationName: this.calibration.calibrationName
                });

                $('#defaultsizemodal').modal('show');
                $("#defaultsizemodal").on('shown.bs.modal', function () {
                    $(this).find('#calibrationName').focus();
                });
            }, error => {
                console.log(error);
            });
    }

    //Create
    onSubmit() {

        if (this.calibrationForm.invalid) {
            return;
        }

        //debugger
        this._dataService.save(this.calibrationForm.value, this._saveUrl)
            .subscribe(response => {
                //console.log(response);
                this.resmessage = response.message;
                this.alertmessage = "alert-outline-info";
                this.getAll();
                this.reset();
                $('#defaultsizemodal').modal('hide');
            }, error => {
                console.log(error);
            });
    }


    //Delete
    delete(e, m) {
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.calibrationname + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(response => {
                    //console.log(response)
                    this.resmessage = response;
                    this.getAll();
                }, error => {
                    console.log(error);
                });
        }
    }

    reset() {
        this.calibrationForm.setValue({
            id: 0,
            calibrationName: null
        });

        this.resmessage = null;
        $('#calibrationName').focus();
    }
}
