import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-return',
    templateUrl: './app/backoffice/circulation/return/component.html',
    providers: [DataService]
})

export class ReturnComponent implements OnInit {
    public returnForm: FormGroup;
    public keypress: number;
    public user: any;
    public searchTerm: any;
    public equipmentissue: any;
    public equipmentreturned: any[] = [];
    public equipmentreturnedlist: any[] = [];
    public equipmentissueedlist: any[] = [];
    public equipmentchoosed: any[] = [];
    public resmessage: string;
    public alertmessage: string;

    public _getUrl: string = '/api/circulation/getreturnall';
    public _getbyIdUrl: string = '/api/circulation/getreturnbyid';
    public _saveUrl: string = '/api/circulation/returnequipment';
    public _getbyUserIdUrl: string = '/api/users/getbyid';

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        this.keypress = event.keyCode;
        if (this.keypress == 32) {
            this.resmessage = null;
            this.reset();
            this.focus();
        }
    }

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {
    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | İade");
        this.loadScripts();
        this.createForm();
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
        this.returnForm = this.formBuilder.group({
            id: 0,
            userId: 0,
            memberSearch: new FormControl(''),
            memberName: new FormControl(''),
            email: new FormControl(''),
            equipments: []
            
        });
        this.focus();
    }

    //Search Member
    onChange(e, searchValue) {
        this.reset();
        e.preventDefault();
        this._dataService.getbyid(searchValue, this._getbyUserIdUrl)
            .subscribe(response => {
                console.log(response);
                this.user = response;
                this.returnForm.setValue({
                    id: 0,
                    userId: this.user.userId,
                    memberName: this.user.firstname + " " + this.user.firstname,
                    email: this.user.email,
                    memberSearch: null,
                    equipments: []
                });


            }, error => {
                //console.log(error);
            });

        this._dataService.getbyid(searchValue, this._getbyIdUrl)
            .subscribe(response => {
                console.log(response);
                if (response != null) {
                    this.equipmentissueedlist = response;
                }
                console.log(this.equipmentissueedlist);
                //this.focus();
                this.resmessage = null;
            }, error => {
                //console.log(error);
            });
        //e.preventDefault();
        //this._dataService.getbyid(searchValue, this._getbyIdUrl)
        //    .subscribe(response => {
        //        if (response != null) {
        //            this.equipmentissue = response;
        //            this.equipmentreturnedlist = response.equipments;
        //            this.returnForm.setValue({
        //                id: this.equipmentissue.id,
        //                memberName: this.equipmentissue.membername,
        //                dueDate: this.equipmentissue.duedate,
        //                memberSearch: null
        //            });

        //        }
        //        else {
        //            this.reset();
        //        }
        //        this.focus();
        //        this.resmessage = null;
        //    }, error => {
        //        //console.log(error);
        //    });
    }

    //Create
    onSubmit() {
        this.returnForm.patchValue({
            equipments: this.equipmentchoosed
        });
        console.log(this.equipmentchoosed);
        if (this.returnForm.invalid) {
            return;
        }
        console.log(this.returnForm.value.id);
        if (this.returnForm.value.userId > 0) {
            this._dataService.save(this.returnForm.value, this._saveUrl)
                .subscribe(response => {
                    this.resmessage = response.message;
                    this.alertmessage = "alert-outline-info";
                    this.reset();
                    this.focus();
                }, error => {
                    //console.log(error);
                });
        }
    }

    //Pop Modal
    returnedList() {
        $('#largesizemodal').modal({ backdrop: 'static', keyboard: false, show: true });
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    this.equipmentreturned = response;
                }, error => {
                    //console.log(error);
                }
            );
    }

    //Close Modal
    returnedListclose() {
        this.focus();
    }
    onSearch(): void {
        let term = this.searchTerm;
        this.equipmentissueedlist = this.equipmentissueedlist.filter(function (tag) {
            return tag.equipmentId.indexOf(term) >= 0;
        });
    }
    oncheckChange(e, i) {
        e.preventDefault();
        if (e.currentTarget.checked) {
            this.equipmentchoosed.push({
                id: i
            });
        }
    }
    //Reset Form
    reset() {
        this.returnForm.setValue({
            id: 0,
            userId: 0,
            memberSearch: null,
            memberName: null,
            email: null,
            equipments: []
        });
        this.searchTerm = "";
        this.equipmentreturnedlist = [];
        this.equipmentissueedlist = [];
    }

    //Focus input
    focus() {
        $("#memberSearch").focus();
    }
}
