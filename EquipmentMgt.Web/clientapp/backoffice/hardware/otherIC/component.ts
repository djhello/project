import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-otherIC',
    templateUrl: './app/backoffice/hardware/otherIC/component.html',
    providers: [DataService]
})
export class OtherICComponent implements OnInit {
    public loggedUser: any;
    public loggedUserName: string;
    public loggedUserType: number;
    public loggedEmail: string;

    public adet: any = 0;
    public loading: boolean = false;
    public otherICs: any[];
    public otherICsCopy: any[];
    public searchTerm: any;
    public otherIC: any;
    public otherICForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public locations: any[];
    public projects: any[];

    public _getUrl: string = '/api/OtherIC/getAll';
    public _getbyIdUrl: string = '/api/otherIC/getById';
    public _saveUrl: string = '/api/otherIC/save';
    public _deleteUrl: string = '/api/otherIC/deleteById';
    public _updateUrl: string = '/api/otherIC/updateStatus';
    public _receiveUrl: string = '/api/otherIC/receive';

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
        this.titleService.setTitle("Envanter Takip Sistemi | OtherIC");
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
        this.otherICForm = this.formBuilder.group({
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

    //Get OtherICs 
    getAll() {
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(
                response => {
                    this.otherICs = response;
                    this.otherICsCopy = response;
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
        this.getProjects();
        this.getLocations();
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                this.otherIC = response;
                this.otherICForm.setValue({
                    id: this.otherIC.id,
                    locationId: this.otherIC.locationId,
                    port: this.otherIC.port,
                    TeiPartNumber: this.otherIC.teiPartNumber,
                    description: this.otherIC.description,
                    supplier: this.otherIC.supplier,
                    SPN: this.otherIC.spn,
                    quantity: this.otherIC.quantity,
                    MFPN: this.otherIC.mfpn,
                    projectId: this.otherIC.projectId,
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
        this.otherICs = this.otherICsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    }
    receive(e, m) {
        let id = m.id;
        let count = 0;
        for (let i = 0; i < this.otherICs.length; i++) {
            if (this.otherICs[i].id != m.id)
                count++;
            else if (this.otherICs[i].id == m.id) {
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
        if (this.otherICForm.invalid) {
            return;
        }

        const formModel = new FormData();
        formModel.append('id', this.otherICForm.value.id);
        formModel.append('locationId', this.otherICForm.value.locationId);
        formModel.append('port', this.otherICForm.value.port);
        formModel.append('TeiPartNumber', this.otherICForm.value.TeiPartNumber);
        formModel.append('description', this.otherICForm.value.description);
        formModel.append('supplier', this.otherICForm.value.supplier);
        formModel.append('SPN', this.otherICForm.value.SPN);
        formModel.append('quantity', this.otherICForm.value.quantity);
        formModel.append('MFPN', this.otherICForm.value.MFPN);
        formModel.append('projectId', this.otherICForm.value.projectId);

        //debugger
        this._dataService.saveWithUser(this.otherICForm.value, this.loggedUser, this._saveUrl)
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
        this.otherICForm.setValue({
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
        this.otherICsCopy = [];
        this.otherICs = [];
        this.resmessage = null;
        $('#name').focus();
    }

}
