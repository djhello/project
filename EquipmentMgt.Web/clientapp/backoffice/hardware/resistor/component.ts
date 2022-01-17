import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-resistor',
    templateUrl: './app/backoffice/hardware/resistor/component.html',
    providers: [DataService]
})
export class ResistorComponent implements OnInit {
    public loggedUser: any;
    public loggedUserName: string;
    public loggedUserType: number;
    public loggedEmail: string;

    public adet: any = 0;
    public loading: boolean = false;
    public resistors: any[];
    public resistorsCopy: any[];
    public searchTerm: any;
    public resistor: any;
    public resistorForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public locations: any[];
    public projects: any[];

    public _getUrl: string = '/api/Resistor/getAll';
    public _getbyIdUrl: string = '/api/resistor/getbyid';
    public _saveUrl: string = '/api/resistor/save';
    public _deleteUrl: string = '/api/resistor/deletebyid';
    public _updateUrl: string = '/api/resistor/updateStatus';
    public _receiveUrl: string = '/api/resistor/receive';

    public _getLocationUrl: string = '/api/location/getall';
    public _getProjectUrl: string = '/api/project/getall';

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
        this.titleService.setTitle("Envanter Takip Sistemi | Resistor");
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
        this.resistorForm = this.formBuilder.group({
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
        //debugger
        this.getLocations();
        this.getProjects();
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#port').focus();
        });

        this.reset();
    }

    //Get Resistors 
    getAll() {
        //debugger
        this.loading = true;
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    this.resistors = response;
                    this.resistorsCopy = response;
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
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                this.resistor = response;
                this.resistorForm.setValue({
                    id: this.resistor.id,
                    locationId: this.resistor.locationId,
                    port: this.resistor.port,
                    TeiPartNumber: this.resistor.teiPartNumber,
                    description: this.resistor.description,
                    value: this.resistor.value,
                    voltage: this.resistor.voltage,
                    current: this.resistor.current,
                    manufacturePartNumber: this.resistor.manufacturePartNumber,
                    package: this.resistor.package,
                    power: this.resistor.power,
                    quantity: this.resistor.quantity,
                    projectId: this.resistor.projectId,
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
        this.resistors = this.resistorsCopy.filter(function (tag) {
            return tag.description.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    }
    receive(e, m) {
        let id = m.id;
        let count = 0;
        for (let i = 0; i < this.resistors.length; i++) {
            if (this.resistors[i].id != m.id)
                count++;
            else if (this.resistors[i].id == m.id) {
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
        if (this.resistorForm.invalid) {
            return;
        }

        const formModel = new FormData();
        formModel.append('id', this.resistorForm.value.id);
        formModel.append('locationId', this.resistorForm.value.locationId);
        formModel.append('port', this.resistorForm.value.port);
        formModel.append('TeiPartNumber', this.resistorForm.value.TeiPartNumber);
        formModel.append('description', this.resistorForm.value.description);
        formModel.append('value', this.resistorForm.value.value);
        formModel.append('current', this.resistorForm.value.current);
        formModel.append('power', this.resistorForm.value.power);
        formModel.append('manufacturePartNumber', this.resistorForm.value.manufacturePartNumber);
        formModel.append('voltage', this.resistorForm.value.voltage);
        formModel.append('quantity', this.resistorForm.value.quantity);
        formModel.append('package', this.resistorForm.value.package);
        formModel.append('projectId', this.resistorForm.value.projectId);

        //debugger
        this._dataService.saveWithUser(this.resistorForm.value, this.loggedUser, this._saveUrl)
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
        this._dataService.getall(this._getLocationUrl)
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
        this._dataService.getall(this._getProjectUrl)
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
        this.resistorForm.setValue({
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
        this.resistorsCopy = [];
        this.resistors = [];
        

        this.resmessage = null;
        $('#name').focus();
    }

}
