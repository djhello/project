import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-ICregulator',
    templateUrl: './app/backoffice/hardware/ICregulator/component.html',
    providers: [DataService]
})
export class ICregulatorComponent implements OnInit {
    public loggedUser: any;
    public loggedUserName: string;
    public loggedUserType: number;
    public loggedEmail: string;

    public adet: any = 0;
    public loading: boolean = false;
    public searchTerm: any; 
    public ICregulators: any[];
    public ICregulatorsCopy: any[];
    public ICregulator: any;
    public ICregulatorForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public locations: any[];
    public projects: any[];

    public _getUrl: string = '/api/ICregulator/getAll';
    public _getbyIdUrl: string = '/api/ICregulator/getById';
    public _saveUrl: string = '/api/ICregulator/save';
    public _deleteUrl: string = '/api/ICregulator/deleteById';
    public _updateUrl: string = '/api/ICregulator/updateStatus';
    public _receiveUrl: string = '/api/ICregulator/receive';

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
        this.titleService.setTitle("Envanter Takip Sistemi | ICregulator");
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
        this.ICregulatorForm = this.formBuilder.group({
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

    //Get ICregulators 
    getAll() {
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(
                response => {
                    this.ICregulators = response;
                    this.ICregulatorsCopy = response;
                }, error => {
                    this.loading = false;
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
                this.ICregulator = response;
                this.ICregulatorForm.setValue({
                    id: this.ICregulator.id,
                    locationId: this.ICregulator.locationId,
                    port: this.ICregulator.port,
                    TeiPartNumber: this.ICregulator.teiPartNumber,
                    description: this.ICregulator.description,
                    supplier: this.ICregulator.supplier,
                    SPN: this.ICregulator.spn,
                    quantity: this.ICregulator.quantity,
                    MFPN: this.ICregulator.mfpn,
                    projectId: this.ICregulator.projectId,
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
        this.ICregulators = this.ICregulatorsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    }
    receive(e, m) {
        let id = m.id;
        let count = 0;
        for (let i = 0; i < this.ICregulators.length; i++) {
            if (this.ICregulators[i].id != m.id)
                count++;
            else if (this.ICregulators[i].id == m.id) {
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
        if (this.ICregulatorForm.invalid) {
            return;
        }

        const formModel = new FormData();
        formModel.append('id', this.ICregulatorForm.value.id);
        formModel.append('locationId', this.ICregulatorForm.value.locationId);
        formModel.append('port', this.ICregulatorForm.value.port);
        formModel.append('TeiPartNumber', this.ICregulatorForm.value.TeiPartNumber);
        formModel.append('description', this.ICregulatorForm.value.description);
        formModel.append('supplier', this.ICregulatorForm.value.supplier);
        formModel.append('SPN', this.ICregulatorForm.value.SPN);
        formModel.append('quantity', this.ICregulatorForm.value.quantity);
        formModel.append('MFPN', this.ICregulatorForm.value.MFPN);
        formModel.append('projectId', this.ICregulatorForm.value.projectId);

        //debugger
        this._dataService.saveWithUser(this.ICregulatorForm.value, this.loggedUser, this._saveUrl)
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
        this.ICregulatorForm.setValue({
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
        this.ICregulatorsCopy = [];
        this.ICregulators = [];
       
        this.resmessage = null;
        $('#name').focus();
    }

}
