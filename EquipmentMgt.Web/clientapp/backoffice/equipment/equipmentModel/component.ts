import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-test',
    templateUrl: './app/backoffice/equipment/equipmentModel/component.html',
    providers: [DataService]
})
export class EquipmentModelsComponent implements OnInit {
    public loading: boolean = false;
    public equipmentModels: any[];
    public equipmentModel: any;
    public equipmentModelForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;
    public imageUrl: any;

    public _getUrl: string = '/api/equipmentmodel/getall';
    public _getbyIdUrl: string = '/api/equipmentmodel/getbyid';
    public _saveUrl: string = '/api/equipmentmodel/save';
    public _deleteUrl: string = '/api/equipmentmodel/deletebyid';

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private _http: Http,
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | Equipment Model");
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
        this.equipmentModelForm = this.formBuilder.group({
            id: 0,
            name: new FormControl('', Validators.required),
            quantity: new FormControl(''),
            description: new FormControl(''),
            eDocWebAddress: new FormControl(''),
            eDocLocalAddress: new FormControl(''),
            fileupload: null
        });
    }
    onFileChange(event) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            this.equipmentModelForm.get('fileupload').setValue(file);
        }
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
    //Get LOcations 
    getAll() {
        //debugger
        this.loading = true;
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                   
                    this.equipmentModels = response;
                }, error => {
                    console.log(error);
                }
        );
        this.loading = false;
    }
    //Get by ID
    edit(e, m) {
        //debugger
        e.preventDefault();
        this.loading = true;
        this._dataService.getbyid(m.id, this._getbyIdUrl)
            .subscribe(response => {
                console.log(response);
                this.equipmentModel = response;
                this.equipmentModelForm.setValue({
                    id: this.equipmentModel.id,
                    name: this.equipmentModel.name,
                    quantity: this.equipmentModel.quantity,
                    description: this.equipmentModel.description,
                    eDocWebAddress: this.equipmentModel.eDocWebAddress,
                    eDocLocalAddress: this.equipmentModel.eDocLocalAddress,
                    fileupload: this.equipmentModel.coverImage
                });
                $('#largesizemodal').modal('show');
                $("#largesizemodal").on('shown.bs.modal', function () {
                    $(this).find('#name').focus();
                });
                this.loading = false;
            }, error => {
                console.log(error);
            });
    }
    //Create
    onSubmit() {
        this.loading = true;
        if (this.equipmentModelForm.invalid) {
            return;
        }
        const formModel = new FormData();
        formModel.append('id', this.equipmentModelForm.value.id);
        formModel.append('name', this.equipmentModelForm.value.name);
        formModel.append('quantity', this.equipmentModelForm.value.quantity);
        formModel.append('description', this.equipmentModelForm.value.description);
        formModel.append('eDocWebAddress', this.equipmentModelForm.value.eDocWebAddress);
        formModel.append('eDocLocalAddress', this.equipmentModelForm.value.eDocLocalAddress);
        formModel.append('fileupload', this.equipmentModelForm.value.fileupload);
        //debugger
        this._dataService.saveForm(formModel, this._saveUrl)
            .subscribe(response => {
                this.resmessage = response.message;
                this.alertmessage = "alert-outline-info";
                this.getAll();
                $('#largesizemodal').modal('hide');
                this.reset();
                this.loading = false;
            }, error => {
                console.log(error);
            });
    }
    //Delete
    delete(e, m) {
        this.loading = true;
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.equipmentModelName + '. Are you sure?');
        if (IsConf) {
            this._dataService.delete(m.id, this._deleteUrl)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getAll();
                    this.loading = false;
                }, error => {
                    console.log(error);
                });
        }
    }
    reset() {
        this.equipmentModelForm.setValue({
            id: 0,
            name: null,
            quantity: null,
            description:null,
            eDocWebAddress: null,
            eDocLocalAddress: null,
            fileupload: null
        });

        this.fileInput.nativeElement.value = '';
        this.resmessage = null;
        $('#name').focus();
    }
}
