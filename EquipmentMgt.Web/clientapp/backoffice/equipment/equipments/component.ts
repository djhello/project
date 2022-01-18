import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';
import Handsontable from 'handsontable';


@Component({
    selector: 'ng-equipments',
    templateUrl: './app/backoffice/equipment/equipments/component.html',
    providers: [DataService]
})
export class EquipmentsComponent implements OnInit {
    public loggedUser: any;

    public loading: boolean = false;
    public equipments: any[];
    public equipment: any;
    public calibrations: any[];
    public locations: any[];
    public users: any[];
    public equipmentModels: any[];
    public equipmentForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public imageUrl: any;

    public _getUrl: string = '/api/equipment/getAll';
    public _getbyIdUrl: string = '/api/equipment/getById';
    public _saveUrl: string = '/api/equipment/save';
    public _deleteUrl: string = '/api/equipment/deleteById';
    public _getbyEquipmentIdUrl: string = '/api/equipment/getByText';
    public _updateUrl: string = '/api/equipment/updateStatus';


    public _getCalibrationUrl: string = '/api/calibration/getAll';
    public _getLocationUrl: string = '/api/location/getAll';
    public _getEquipmentModelUrl: string = '/api/equipmentmodel/getAll';
    public _getUserUrl: string = '/api/users/getAll';

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
        this.titleService.setTitle("Envanter Takip Sistemi | Cihazlar");
        this.createForm();
        this.getAll();
        //this.setupHandsontable();
    }

    createForm() {
        this.equipmentForm = this.formBuilder.group({
            id: 0,
            equipmentId: new FormControl('', Validators.required),
            calibrationId: new FormControl('', Validators.required),
            equipmentName: new FormControl('', Validators.required),
            serialPortUSB: new FormControl('', Validators.required),
            permanentLocationId: new FormControl('', Validators.required),
            description: new FormControl(''),
            currentUserId: new FormControl(''),
            equipmentModelId: new FormControl('', Validators.required)
        });
    }
    
    
    //Pop Modal
    addNew() {
        //debugger 
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#equipmentId').focus();
        });
        this.reset();
        this.getCalibration();
        this.getLocations();
        this.getEquipmentModels();
        this.getUserAll();
    }

    getAll() {
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(
                response => {
                    this.equipments = response;
                    this.loading = false;
                }, error => {
                    console.log(error);
                }
            );
    }
    
    //Get by ID
    edit(e, m) {
        this.loading = true;
        //debugger
        e.preventDefault();
        this.getCalibration();
        this.getLocations();
        this.getEquipmentModels();
        this.getUserAll();
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(response => {
                console.log(response);
                this.equipment = response;
                this.equipmentForm.setValue({
                    id: this.equipment.id,
                    equipmentId: this.equipment.equipmentId,
                    calibrationId: this.equipment.calibrationId,
                    equipmentName: this.equipment.equipmentName,
                    description: this.equipment.description,
                    serialPortUSB: this.equipment.serialPortUSB,
                    equipmentModelId: this.equipment.equipmentModelId,
                    permanentLocationId: this.equipment.permanentLocationId,
                    currentUserId: this.equipment.currentUserId
                });
                this.loading = false;
                $('#largesizemodal').modal('show');
                $("#largesizemodal").on('shown.bs.modal', function () {
                    $(this).find('#equipmentId').focus();
                });
            }, error => {
                console.log(error);
            });
    }
    onChangeSearchText($event) {
        if (this.router.url == "/backoffice/equipment/equipments") {
            var text = (<HTMLInputElement>document.getElementById("searchText")).value;
            this.getEquipments($event, text);
        }
    }
    getEquipments(e, m) {
        this.loading = true;
        this._dataService.getByText(m, this._getbyEquipmentIdUrl)
            .subscribe(
                response => {
                    this.equipments = response;
                    this.loading = false;
                }, error => {
                    console.log(error);
                }
            );
    }
    //Create
    onSubmit() {
        this.loading = true;
        if (this.equipmentForm.invalid) {
            return;
        }
        const formModel = new FormData();
        formModel.append('id', this.equipmentForm.value.id);
        formModel.append('equipmentId', this.equipmentForm.value.equipmentId);
        formModel.append('equipmentName', this.equipmentForm.value.equipmentName);
        formModel.append('calibrationId', this.equipmentForm.value.calibrationId);
        formModel.append('description', this.equipmentForm.value.description);
        formModel.append('serialPortUSB', this.equipmentForm.value.serialPortUSB);
        formModel.append('equipmentModelId', this.equipmentForm.value.equipmentModelId);
        formModel.append('permanentLocationId', this.equipmentForm.value.permanentLocationId);
        formModel.append('currentUserId', this.equipmentForm.value.currentUserId);
        //debugger
        this._dataService.saveWithUser(this.equipmentForm.value, this.loggedUser, this._saveUrl)
            .subscribe(response => {
                this.resmessage = response.message;
                this.alertmessage = "alert-outline-info";
                this.getAll();
                this.reset();
                $('#largesizemodal').modal('hide');
                this.loading = false;
            }, error => {
                console.log(error);
            });
    }
    updateStatus(e, m) {
        this.loading = true;
        e.preventDefault();
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
        this.loading = false;
    }
    //Delete
    delete(e, m) {
        this.loading = true;
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.equipmentName + '. Are you sure?');
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
    getCalibration() {
        this.loading = true;
        //debugger
        this._dataService.getAll(this._getCalibrationUrl)
            .subscribe(
                response => {
                    this.calibrations = response;
                    this.loading = false;
                }, error => {
                    console.log(error);
                }
            );
    }
    getEquipmentModels() {
        this.loading = true;
        //debugger
        this._dataService.getAll(this._getEquipmentModelUrl)
            .subscribe(
                response => {
                    this.equipmentModels = response;
                    this.loading = false;
                }, error => {
                    console.log(error);
                }
            );
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
   
    getUserAll() {
        this.loading = true;
        this._dataService.getAll(this._getUserUrl)
            .subscribe(
                response => {
                    this.users = response;
                    console.log(this.users);
                    this.loading = false;
                }, error => {
                    console.log(error);
                }
            );
    }

    reset() {
        this.equipmentForm.setValue({
            id: 0,
            equipmentId: '',
            equipmentName: '',
            calibrationId: 0,
            description: '',
            serialPortUSB: '',
            equipmentModelId: 0,
            permanentLocationId: 0,
            currentUserId:0
        });
        this.resmessage = null;
        $('#equipmentId').focus();
    }
}
