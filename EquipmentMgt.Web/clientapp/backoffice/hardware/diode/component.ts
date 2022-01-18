import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-diode',
    templateUrl: './app/backoffice/hardware/diode/component.html',
    providers: [DataService]
})
export class DiodeComponent implements OnInit {
    public loggedUser: any;
    public loggedUserName: string;
    public loggedUserType: number;
    public loggedEmail: string;

    public adet: any = 0;
    public loading: boolean = false;
    public searchTerm: any;
    public diodes: any[];
    public diodesCopy: any[];
    public diode: any;
    public diodeForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public locations: any[];
    public projects: any[];

    public _getUrl: string = '/api/Diode/getAll';
    public _getbyIdUrl: string = '/api/diode/getById';
    public _saveUrl: string = '/api/diode/save';
    public _deleteUrl: string = '/api/diode/deleteById';
    public _updateUrl: string = '/api/diode/updateStatus';
    public _receiveUrl: string = '/api/diode/receive';

    public _getLocationUrl: string = '/api/location/getAll';
    public _getProjectUrl: string = '/api/project/getAll';


    constructor(
        private _http: Http,
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        this.loggedUserName = this.loggedUser.displayName;
        this.loggedEmail = this.loggedUser.email;
        this.loggedUserType = this.loggedUser.userType;
    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | Diode");
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
        this.diodeForm = this.formBuilder.group({
            id: 0,
            locationId: new FormControl(''),
            port: new FormControl(''),
            TeiPartNumber: new FormControl(''),
            description: new FormControl(''),
            value: new FormControl(''),
            voltage: new FormControl(''),
            current: new FormControl(''),
            manufacturePartNumber: new FormControl(''),
            package: new FormControl(''),
            power: new FormControl(''),
            quantity: new FormControl(''),
            projectId: new FormControl('')
        });
    }

    //Pop Modal
    addNew() {
        this.getLocations();
        this.getProjects();
        //debugger 
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#name').focus();
        });

        this.reset();
    }

    //Get Diodes 
    getAll() {
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(
                response => {
                    this.diodes = response;
                    this.diodesCopy = response;

                }, error => {
                    console.log(error);
                }
        );
        this.loading = false;
    }

    //Get by ID
    edit(e, m) {
        e.preventDefault();
        this.getProjects();
        this.getLocations();
        this.loading = true;
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                this.diode = response;
                this.diodeForm.setValue({
                    id: this.diode.id,
                    locationId: this.diode.locationId,
                    port: this.diode.port,
                    TeiPartNumber: this.diode.teiPartNumber,
                    description: this.diode.description,
                    value: this.diode.value,
                    voltage: this.diode.voltage,
                    current: this.diode.current,
                    manufacturePartNumber: this.diode.manufacturePartNumber,
                    package: this.diode.package,
                    power: this.diode.power,
                    quantity: this.diode.quantity,
                    projectId: this.diode.projectId,
                });

                $('#largesizemodal').modal('show');
                $("#largesizemodal").on('shown.bs.modal', function () {
                    $(this).find('#name').focus();
                });
            }, error => {
                console.log(error);
            });
    }
    onSearch(): void {
        let term = this.searchTerm;
        this.diodes = this.diodesCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    }
    receive(e, m) {
        let id = m.id;
        let count = 0;
        for (let i = 0; i < this.diodes.length; i++) {
            if (this.diodes[i].id != m.id)
                count++;
            else if (this.diodes[i].id == m.id) {
                break;
            }
        }

        this.adet = (<HTMLInputElement>document.getElementById("receiveQuantity" + (count + 1))).value;
        if (m.quantity == 0) {
            alert("Elimizde hiç malzeme bulunmamaktadır.");
        }
        else if (m.quantity >= this.adet) {
            this.loading = true;
            this._dataService.receiveWithUser(m, this.adet, this.loggedUser, this._receiveUrl)
                .subscribe(response => {
                    this.loading = false;
                    this.getAll();

                }, error => {
                    console.log(error);
                });
        }
        else {
            alert("Ooopps elimizde o kadar yok mevcut sayısından az bir sayı giriniz");
        }
        e.preventDefault();
        this.loading = false;

    }

    getLocations() {
        this.loading = true;
        //debugger
        this._dataService.getAll(this._getLocationUrl)
            .subscribe(
                response => {
                    this.locations = response;
                    this.loading = false;
                }, error => {
                    console.log(error);
                }
            );
    }
    getProjects() {
        this.loading = true;
        //debugger
        this._dataService.getAll(this._getProjectUrl)
            .subscribe(
                response => {
                    this.projects = response;
                    this.loading = false;
                }, error => {
                    console.log(error);
                }
            );
    }

    //Create
    onSubmit() {
        this.loading = true;
        if (this.diodeForm.invalid) {
            return;
        }

        const formModel = new FormData();
        formModel.append('id', this.diodeForm.value.id);
        formModel.append('locationId', this.diodeForm.value.locationId);
        formModel.append('port', this.diodeForm.value.port);
        formModel.append('TeiPartNumber', this.diodeForm.value.TeiPartNumber);
        formModel.append('description', this.diodeForm.value.description);
        formModel.append('value', this.diodeForm.value.value);
        formModel.append('current', this.diodeForm.value.current);
        formModel.append('power', this.diodeForm.value.power);
        formModel.append('manufacturePartNumber', this.diodeForm.value.manufacturePartNumber);
        formModel.append('voltage', this.diodeForm.value.voltage);
        formModel.append('quantity', this.diodeForm.value.quantity);
        formModel.append('package', this.diodeForm.value.package);
        formModel.append('projectId', this.diodeForm.value.projectId);

        //debugger
        this._dataService.saveWithUser(this.diodeForm.value, this.loggedUser, this._saveUrl)
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
        var IsConf = confirm('You are about to delete ' + m.description + '. Are you sure?');
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
        var IsConf = confirm('You are about to delete ' + m.description + '. Are you sure?');
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
        this.diodeForm.setValue({
            id: 0,
            locationId: 0,
            port: null,
            TeiPartNumber: null,
            description: null,
            value: null,
            voltage: null,
            current: null,
            manufacturePartNumber: null,
            package: null,
            power: null,
            quantity: 0,
            projectId: 0,
        });
        this.searchTerm = "";
        this.diodesCopy = [];
        this.diodes = [];
        this.resmessage = null;
        $('#port').focus();
    }

}
