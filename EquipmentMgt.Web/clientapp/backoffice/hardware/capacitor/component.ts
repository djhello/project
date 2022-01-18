import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-capacitor',
    templateUrl: './app/backoffice/hardware/capacitor/component.html',
    providers: [DataService]
})
export class CapacitorComponent implements OnInit {
    public loggedUser: any;
    public loggedUserName: string;
    public loggedUserType: number;
    public loggedEmail: string;

    public loading: boolean = false;
    public adet: any = 0;
    public capacitors: any[];
    public capacitorsCopy: any[];
    public capacitor: any;
    public searchTerm: any;
    public capacitorForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public locations: any[];
    public projects: any[];

    public _getUrl: string = '/api/Capacitor/getAll';
    public _getbyIdUrl: string = '/api/capacitor/getById';
    public _saveUrl: string = '/api/capacitor/save';
    public _deleteUrl: string = '/api/capacitor/deleteById';
    public _updateUrl: string = '/api/capacitor/updateStatus';
    public _receiveUrl: string = '/api/capacitor/receive';

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
        this.titleService.setTitle("Envanter Takip Sistemi | Capacitor");
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
        this.capacitorForm = this.formBuilder.group({
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
        this.reset();
        this.getLocations();
        this.getProjects();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#port').focus();
        });
    }

    //Get Capacitors 
    getAll() {
        this.loading = true;
        this._dataService.getTestall(this._getUrl)
            .subscribe(
                response => {
                    this.capacitors = response;
                    this.capacitorsCopy = response;

                }, error => {
                    console.log(error);
                }
        );
        this.loading = false;
    }

    //Get by ID
    edit(e, m) {
        e.preventDefault();
        this.getLocations();
        this.getProjects();
        this.loading = true;
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                this.capacitor = response;
                this.capacitorForm.setValue({
                    id: this.capacitor.id,
                    locationId: this.capacitor.locationId,
                    port: this.capacitor.port,
                    TeiPartNumber : this.capacitor.teiPartNumber,
                    description : this.capacitor.description,
                    supplier: this.capacitor.supplier,
                    SPN: this.capacitor.spn,
                    quantity : this.capacitor.quantity,
                    MFPN: this.capacitor.mfpn,
                    projectId: this.capacitor.projectId,
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
        this.capacitors = this.capacitorsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    }
    receive(e, m) {
        let id = m.id;
        let count = 0;
        for (let i = 0; i < this.capacitors.length; i++) {
            if (this.capacitors[i].id != m.id)
                count++;
            else if (this.capacitors[i].id == m.id) {
                break;
            }
        }
        
        this.adet=(<HTMLInputElement>document.getElementById("receiveQuantity"+(count+1))).value;
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
        if (this.capacitorForm.invalid) {
            return;
        }

        const formModel = new FormData();
        formModel.append('id', this.capacitorForm.value.id);
        formModel.append('locationId', this.capacitorForm.value.locationId);
        formModel.append('port', this.capacitorForm.value.port);
        formModel.append('TeiPartNumber', this.capacitorForm.value.TeiPartNumber);
        formModel.append('description', this.capacitorForm.value.description);
        formModel.append('supplier', this.capacitorForm.value.supplier);
        formModel.append('SPN', this.capacitorForm.value.SPN);
        formModel.append('quantity', this.capacitorForm.value.quantity);
        formModel.append('MFPN', this.capacitorForm.value.MFPN);
        formModel.append('projectId', this.capacitorForm.value.projectId);

        //debugger
        this._dataService.saveWithUser(this.capacitorForm.value, this.loggedUser, this._saveUrl)
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
        this.capacitorForm.setValue({
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
        this.capacitorsCopy = [];
        this.capacitors = [];

       
        this.resmessage = null;
        $('#name').focus();
    }

}
