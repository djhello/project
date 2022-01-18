import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-mosfet',
    templateUrl: './app/backoffice/hardware/mosfet/component.html',
    providers: [DataService]
})
export class MosfetComponent implements OnInit {
    public loggedUser: any;
    public loggedUserName: string;
    public loggedUserType: number;
    public loggedEmail: string;

    public adet: any = 0;
    public loading: boolean = false;
    public mosfets: any[];
    public mosfetsCopy: any[];
    public searchTerm: any;
    public mosfet: any;
    public mosfetForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public locations: any[];
    public projects: any[];

    public _getUrl: string = '/api/Mosfet/getAll';
    public _getbyIdUrl: string = '/api/mosfet/getById';
    public _saveUrl: string = '/api/mosfet/save';
    public _deleteUrl: string = '/api/mosfet/deleteById';
    public _updateUrl: string = '/api/mosfet/updateStatus';
    public _receiveUrl: string = '/api/mosfet/receive';

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
        this.titleService.setTitle("Envanter Takip Sistemi | Mosfet");
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
        this.mosfetForm = this.formBuilder.group({
            id: 0,
            locationId: new FormControl(''),
            port: new FormControl(''),
            TeiPartNumber: new FormControl(''),
            description: new FormControl(''),
            supplier: new FormControl(''),
            SPN: new FormControl(''),
            quantity: new FormControl(''),
            MFPN: new FormControl(''),
            projectId: new FormControl('')
        });
    }

    //Pop Modal
    addNew() {
        //debugger
        this.getLocations();
        this.getProjects();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#port').focus();
        });

        this.reset();
    }

    //Get Mosfets 
    getAll() {
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(
                response => {
                    this.mosfets = response;
                    this.mosfetsCopy = response;
                }, error => {
                    this.loading = false;
                    console.log(error);
                }
        );
        this.loading = false;
    }

    //Get by ID
    edit(e, m) {
        console.log(m);
        e.preventDefault();
        this.getProjects();
        this.getLocations();
        this.loading = true;
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                this.mosfet = response;
                this.mosfetForm.setValue({
                    id: this.mosfet.id,
                    locationId: this.mosfet.locationId,
                    port: this.mosfet.port,
                    TeiPartNumber: this.mosfet.teiPartNumber,
                    description: this.mosfet.description,
                    supplier: this.mosfet.supplier,
                    SPN: this.mosfet.spn,
                    quantity: this.mosfet.quantity,
                    MFPN: this.mosfet.mfpn,
                    projectId: this.mosfet.projectId,
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
        this.mosfets = this.mosfetsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    }
    receive(e, m) {
        let id = m.id;
        let count = 0;
        for (let i = 0; i < this.mosfets.length; i++) {
            if (this.mosfets[i].id != m.id)
                count++;
            else if (this.mosfets[i].id == m.id) {
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

    //Create
    onSubmit() {
        this.loading = true;
        if (this.mosfetForm.invalid) {
            return;
        }

        const formModel = new FormData();
        formModel.append('id', this.mosfetForm.value.id);
        formModel.append('locationId', this.mosfetForm.value.locationId);
        formModel.append('port', this.mosfetForm.value.port);
        formModel.append('TeiPartNumber', this.mosfetForm.value.TeiPartNumber);
        formModel.append('description', this.mosfetForm.value.description);
        formModel.append('supplier', this.mosfetForm.value.supplier);
        formModel.append('SPN', this.mosfetForm.value.SPN);
        formModel.append('quantity', this.mosfetForm.value.quantity);
        formModel.append('MFPN', this.mosfetForm.value.MFPN);
        formModel.append('projectId', this.mosfetForm.value.projectId);

        //debugger
        this._dataService.saveWithUser(this.mosfetForm.value, this.loggedUser, this._saveUrl)
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
        this.mosfetForm.setValue({
            id: 0,
            locationId: 0,
            port: null,
            TeiPartNumber: null,
            description: null,
            supplier: null,
            SPN: null,
            quantity: 0,
            MFPN: null,
            projectId: 0,
        });
        this.searchTerm = "";
        this.mosfetsCopy = [];
        this.mosfets = [];
        this.resmessage = null;
        $('#port').focus();
    }

}
