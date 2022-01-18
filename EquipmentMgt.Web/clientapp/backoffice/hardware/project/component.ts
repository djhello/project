import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-project',
    templateUrl: './app/backoffice/hardware/project/component.html',
    providers: [DataService]
})
export class ProjectComponent implements OnInit {
    public loggedUser: any;

    public loading: boolean = false;
    public projects: any[];
    public project: any;
    public projectForm: FormGroup;
    public resmessage: string;
    public alertmessage: string;


    public _getUrl: string = '/api/Project/getAll';
    public _getbyIdUrl: string = '/api/project/getById';
    public _saveUrl: string = '/api/project/save';
    public _deleteUrl: string = '/api/project/deleteById';
    public _updateUrl: string = '/api/project/updateStatus';

   

    constructor(
        private _http: Http,
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | Project");
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
        this.projectForm = this.formBuilder.group({
            id: 0,
            projectName: new FormControl('')
        });
    }

    //Pop Modal
    addNew() {
        //debugger
       
        $('#largesizemodal').modal('show');
        $("#largesizemodal").on('shown.bs.modal', function () {
            $(this).find('#projectName').focus();
        });

        this.reset();
    }

    //Get Projects 
    getAll() {
        //debugger
        this.loading = true;
        this._dataService.getAll(this._getUrl)
            .subscribe(
                response => {
                    console.log(response);
                    this.projects = response;
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
        this._dataService.getById(m.id, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                this.project = response;
                this.projectForm.setValue({
                    id: this.project.id,
                    projectName: this.project.projectName
                });

                $('#largesizemodal').modal('show');
                $("#largesizemodal").on('shown.bs.modal', function () {
                    $(this).find('#projectName').focus();
                });
            }, error => {
                console.log(error);
            });
    }



    //Create
    onSubmit() {
        this.loading = true;
        if (this.projectForm.invalid) {
            return;
        }

        const formModel = new FormData();
        formModel.append('id', this.projectForm.value.id);
        formModel.append('projectName', this.projectForm.value.projectName);

        //debugger
        this._dataService.saveWithUser(this.projectForm.value, this.loggedUser, this._saveUrl)
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
        var IsConf = confirm('You are about to delete ' + m.projectName + '. Are you sure?');
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
        var IsConf = confirm('You are about to delete ' + m.projectName + '. Are you sure?');
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
        this.projectForm.setValue({
            id: 0,
            projectName: null
        });


        this.resmessage = null;
        $('#projectName').focus();
    }

}
