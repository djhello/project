import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-books',
    templateUrl: './app/backoffice/equipment/equipments/component.html',
    providers: [DataService]
})
export class EquipmentsComponent implements OnInit {
    public loggedUsername: string;
    public loggedUsertype: number;
    public loggedemail: string;

    public loading: boolean = false;
    public equipments: any[];
    public equipment: any;
    public calibrations: any[];
    public categories: any[];
    public locations: any[];
    public users: any[];
    public equipmentModels: any[];
    public equipmentForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public imageUrl: any;

    public _getUrl: string = '/api/equipment/getall';
    public _getbyIdUrl: string = '/api/equipment/getbyid';
    public _saveUrl: string = '/api/equipment/save';
    public _deleteUrl: string = '/api/equipment/deletebyid';
    public _getbyEquipmentIdUrl: string = '/api/equipment/getbytext';

    public _getCalibrationUrl: string = '/api/calibration/getall';
    public _getLocationUrl: string = '/api/location/getall';
    public _getEquipmentModelUrl: string = '/api/equipmentmodel/getall';
    public _getcategoryUrl: string = '/api/dropdown/getallcategory';
    public _getUserUrl: string = '/api/users/getall';

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private _http: Http,
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
        this.titleService.setTitle("Envanter Takip Sistemi | Cihazlar");
        this.createForm();
        this.getAll();
        if (this.loggedUsertype != 1) {
            localStorage.removeItem('isLoggedin');
            localStorage.removeItem('loggedUser');
            this.router.navigate(['/login']);
        }
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
        //this.reset();
        this.getCalibration();
        this.getLocations();
        this.getEquipmentModels();
        this.getUserAll();
       // this.getcategory();
    }

    getAll() {
        //debugger
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    //console.log(response)
                    this.equipments = response;
                }, error => {
                    console.log(error);
                }
            );
    }

    //Get by ID
    edit(e, m) {
        //debugger
        e.preventDefault();
        this.getCalibration();
        this.getLocations();
        this.getEquipmentModels();
        this.getUserAll();
        this._dataService.getbyid(m.id, this._getbyIdUrl)
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
        console.log(m);
        this._dataService.getbytext(m, this._getbyEquipmentIdUrl)
            .subscribe(
                response => {
                    console.log(response)
                    this.equipments = response;
                }, error => {
                    console.log(error);
                }
            );
    }
    //Create
    onSubmit() {

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
        this._dataService.saveForm(formModel, this._saveUrl)
            .subscribe(response => {
                //console.log(response);
                this.resmessage = response.message;
                this.alertmessage = "alert-outline-info";
                this.getAll();
                this.reset();
            }, error => {
                console.log(error);
            });
    }


    //Delete
    delete(e, m) {
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.bookname + '. Are you sure?');
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

    //Get Author 
    getCalibration() {
        //debugger
        this._dataService.getall(this._getCalibrationUrl)
            .subscribe(
                response => {
                    console.log(response)
                    this.calibrations = response;
                }, error => {
                    console.log(error);
                }
            );
    }
    getEquipmentModels() {
        //debugger
        this._dataService.getall(this._getEquipmentModelUrl)
            .subscribe(
                response => {
                    //console.log(response)
                    this.equipmentModels = response;
                }, error => {
                    console.log(error);
                }
            );
    }
    getLocations() {
        //debugger
        this._dataService.getall(this._getLocationUrl)
            .subscribe(
                response => {
                    //console.log(response)
                    this.locations = response;
                }, error => {
                    console.log(error);
                }
            );
    }
    //Get Category 
    getcategory() {
        //debugger
        this._dataService.getall(this._getcategoryUrl)
            .subscribe(
                response => {
                    console.log(response)
                    this.categories = response;
                }, error => {
                    console.log(error);
                }
            );
    }
    getUserAll() {
        //debugger
        this._dataService.getall(this._getUserUrl)
            .subscribe(
                response => {
                    //console.log(response)
                    this.users = response;
                }, error => {
                    console.log(error);
                }
            );
    }

    reset() {
        this.equipmentForm.setValue({
            id: 0,
            equipmentId: null,
            equipmentName: '',
            calibrationId: '',
            description: null,
            serialPortUSB: null,
            equipmentModelId: '',
            permanentLocationId: '',
            currentUserId:''
        });

        this.fileInput.nativeElement.value = '';
        this.resmessage = null;
        $('#equipmentId').focus();
    }

    //clearFile() {
    //    this.bookForm.get('fileupload').setValue(null);
    //    this.fileInput.nativeElement.value = '';
    //}
}
