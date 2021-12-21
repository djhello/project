import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-location',
    templateUrl: './app/backoffice/equipment/location/component.html',
    providers: [DataService]
})
export class LocationsComponent implements OnInit {
    public loggedUser: any;

    public loading: boolean = false;
    public locations: any[];
    public location: any;
    public calibrations: any[];
    public categories: any[];
    public locationForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public imageUrl: any;

    public _getUrl: string = '/api/location/getall';
    public _getbyIdUrl: string = '/api/location/getbyid';
    public _saveUrl: string = '/api/location/save';
    public _deleteUrl: string = '/api/location/deletebyid';

    public _updateUrl: string = '/api/location/updateStatus';

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private _http: Http,
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | Location");
        this.loadScripts();
        this.createForm();
        this.getAll();
    }
    public loadScripts() {
        const libScripts = [
            'assets/js/datepicker-init.js'
        ];
        for (let i = 0; i < libScripts.length; i++) {
            const node = document.createElement('script');
            node.src = libScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('body')[0].appendChild(node);
        }
    }
    createForm() {
        this.locationForm = this.formBuilder.group({
            id: 0,
            name: new FormControl('', Validators.required)
        });
    }

    //Pop Modal
    addNew() {
        //debugger 
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#name').focus();
        });

        this.reset();
    }

    //Get Locations 
    getAll() {
        //debugger
        this.loading = true;
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    this.loading = false;
                    this.locations = response;
                }, error => {
                    console.log(error);
                }
            );
    }

    //Get by ID
    edit(e, m) {
        e.preventDefault();
        this.loading = true;
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                this.location = response;
                this.locationForm.setValue({
                    id: this.location.id,
                    name: this.location.name
                });

                $('#largesizemodal').modal('show');
                $("#largesizemodal").on('shown.bs.modal', function () {
                    $(this).find('#name').focus();
                });
            }, error => {
                console.log(error);
            });
    }

   

    //Create
    onSubmit() {
        this.loading = true;
        if (this.locationForm.invalid) {
            return;
        }

        const formModel = new FormData();
        formModel.append('id', this.locationForm.value.id);
        formModel.append('name', this.locationForm.value.name);

        //debugger
        this._dataService.saveWithUser(this.locationForm.value, this.loggedUser, this._saveUrl)
            .subscribe(response => {
                this.loading = false;
                this.resmessage = response.message;
                this.alertmessage = "alert-outline-info";
                this.getAll();
                $('#largesizemodal').modal('hide');
                //this.reset();
            }, error => {
                console.log(error);
            });
    }
    updateStatus(e, m) {
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.name + '. Are you sure?');
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
        this.loading = true;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.name + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(response => {
                    this.loading = false;
                    this.resmessage = response;
                    this.getAll();
                }, error => {
                    console.log(error);
                });
        }
    }

    reset() {
        this.locationForm.setValue({
            id: 0,
            name: null
        });

        this.fileInput.nativeElement.value = '';
        this.resmessage = null;
        $('#name').focus();
    }

}
