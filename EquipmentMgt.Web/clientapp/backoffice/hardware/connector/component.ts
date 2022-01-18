import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-connector',
    templateUrl: './app/backoffice/hardware/connector/component.html',
    providers: [DataService]
})
export class ConnectorComponent implements OnInit {
    public loggedUser: any;
    public loggedUserName: string;
    public loggedUserType: number;
    public loggedEmail: string;

    public adet: any = 0;
    public loading: boolean = false;
    public searchTerm: any;
    public connectors: any[];
    public connectorsCopy: any[];
    public connector: any;
    public connectorForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public locations: any[];
    public projects: any[];

    public _getUrl: string = '/api/Connector/getAll';
    public _getbyIdUrl: string = '/api/connector/getById';
    public _saveUrl: string = '/api/connector/save';
    public _deleteUrl: string = '/api/connector/deleteById';
    public _updateUrl: string = '/api/connector/updateStatus';
    public _receiveUrl: string = '/api/connector/receive';

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
        this.titleService.setTitle("Envanter Takip Sistemi | Connector");
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
        this.connectorForm = this.formBuilder.group({
            id: 0,
            locationId: new FormControl(''),
            port: new FormControl(''),
            TeiPartNumber: new FormControl(''),
            description: new FormControl(''),
            manufacturer: new FormControl(''),
            manufacturePartNumber: new FormControl(''),
            quantity: new FormControl(''),
            package: new FormControl(''),
            projectId: new FormControl('')
        });
    }

    //Pop Modal
    addNew() {
        this.reset();
        this.getLocations();
        this.getProjects();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#port').focus();
        });
    }

    //Get Connectors 
    getAll() {
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(
                response => {
                    this.connectors = response;
                    this.connectorsCopy = response;

                }, error => {

                    console.log(error);
                }
        );
        this.loading = false;
    }

    //Get by ID
    edit(e, m) {
        e.preventDefault();
        this.loading = true;
        this.getLocations();
        this.getProjects();
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                this.connector = response;
                this.connectorForm.setValue({
                    id: this.connector.id,
                    locationId: this.connector.locationId,
                    port: this.connector.port,
                    TeiPartNumber: this.connector.teiPartNumber,
                    description: this.connector.description,
                    manufacturer: this.connector.manufacturer,
                    manufacturePartNumber: this.connector.manufacturePartNumber,
                    quantity: this.connector.quantity,
                    package: this.connector.package,
                    projectId: this.connector.projectId,
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
        this.connectors = this.connectorsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    }
    receive(e, m) {
        let id = m.id;
        let count = 0;
        for (let i = 0; i < this.connectors.length; i++) {
            if (this.connectors[i].id != m.id)
                count++;
            else if (this.connectors[i].id == m.id) {
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
        if (this.connectorForm.invalid) {
            return;
        }

        const formModel = new FormData();
        formModel.append('id', this.connectorForm.value.id);
        formModel.append('locationId', this.connectorForm.value.locationId);
        formModel.append('port', this.connectorForm.value.port);
        formModel.append('TeiPartNumber', this.connectorForm.value.TeiPartNumber);
        formModel.append('description', this.connectorForm.value.description);
        formModel.append('manufacturer', this.connectorForm.value.manufacturer);
        formModel.append('manufacturePartNumber', this.connectorForm.value.manufacturePartNumber);
        formModel.append('quantity', this.connectorForm.value.quantity);
        formModel.append('package', this.connectorForm.value.package);
        formModel.append('projectId', this.connectorForm.value.projectId);

        //debugger
        this._dataService.saveWithUser(this.connectorForm.value, this.loggedUser, this._saveUrl)
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
        this.connectorForm.setValue({
            id: 0,
            locationId: 0,
            port: null,
            TeiPartNumber: null,
            description: null,
            quantity: 0,
            projectId: 0,
            manufacturer: null,
            manufacturePartNumber: null,
            package: null,
        });
        this.searchTerm = "";
        this.connectorsCopy = [];
        this.connectors = [];

        this.resmessage = null;
        $('#port').focus();
    }

}
