import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../../shared/service';

@Component({
    selector: 'ng-issue',
    templateUrl: './app/backoffice/circulation/issue/component.html',
    providers: [DataService]
})

export class IssueComponent implements OnInit {
    public issueForm: FormGroup;
    public keypress: number;
    public user: any;
    public searchTerm: any;
    public equipmentissue: any;
    public equipmentlist: any[] = [];
    public availableequipmentlist: any[] = [];
    public equipmentchoosed: any[] = [];
    public equipmentissueed: any[] = [];
    public equipmentissueedlist: any[] = [];
    public resmessage: string;
    public alertmessage: string;

    public _getUrl: string = '/api/circulation/getissueall';
    public _getbyIdUrl: string = '/api/circulation/getissuebyid';
    public _saveUrl: string = '/api/circulation/issueequipment';
    public _getequipmentUrl: string = '/api/circulation/getallequipment';
    public _getavailableallequipmentUrl: string = '/api/equipment/getavailableallequipment';
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
        this.titleService.setTitle("Envanter Takip Sistemi| Ödünç");
        this.loadScripts();
        this.createForm();
        //this.equipmentList();
        this.availableequipmentList();
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
        this.issueForm = this.formBuilder.group({
            id: 0,
            userId: 0,
            memberSearch: new FormControl(''),
            memberName: new FormControl(''),
            email: new FormControl(''),
            dueDate: new FormControl(''),
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
                this.user = response;
                var dt = new Date();
                dt.setDate(dt.getDate() + 15);
                this.issueForm.setValue({
                    id: 0,
                    userId: this.user.userId,
                    memberName: this.user.firstname + " " + this.user.firstname ,
                    email: this.user.email,
                    dueDate: dt.toLocaleDateString('en-US'),
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
                //this.focus();
                this.resmessage = null;
            }, error => {
                //console.log(error);
            });
    }

    //Search
    onSearch(): void {
        let term = this.searchTerm;
        this.availableequipmentlist = this.availableequipmentlist.filter(function (tag) {
            return tag.equipmentId.indexOf(term) >= 0;
        });
    }

    //Get Choosed equipment
    oncheckChange(e, i) {
        e.preventDefault();
        if (e.currentTarget.checked) {
            this.equipmentchoosed.push({
                id: i
            });
        }
    }

    //Create
    onSubmit() {
        this.issueForm.patchValue({
            equipments: this.equipmentchoosed
        });
        console.log(this.equipmentchoosed);
        if (this.issueForm.invalid) {
            return;
        }
        if (this.issueForm.value.userId > 0) {
            this._dataService.save(this.issueForm.value, this._saveUrl)
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

    //equipmentlist to choose
    equipmentList() {
        this._dataService.getall(this._getequipmentUrl)
            .subscribe(
                response => {
                    this.equipmentlist = response;
                }, error => {
                    //console.log(error);
                }
            );
    }
    availableequipmentList() {
        this._dataService.getall(this._getavailableallequipmentUrl)
            .subscribe(
                response => {
                    this.availableequipmentlist = response;
                }, error => {
                    //console.log(error);
                }
            );
    }
    //Pop Modal
    issueedList() {
        $('#largesizemodal').modal({ backdrop: 'static', keyboard: false, show: true });
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    this.equipmentissueed = response;
                }, error => {
                    //console.log(error);
                }
                
        );
        console.log(this.equipmentissueed);
    }

    //Close Modal
    issueedListclose() {
        this.focus();
    }

    //Reset Form
    reset() {
        this.issueForm.setValue({
            id: 0,
            userId: 0,
            memberSearch: null,
            memberName: null,
            email: null,
            dueDate: null,
            equipments: []
        });
        this.searchTerm = "";
        this.equipmentissueedlist = [];
        this.availableequipmentList();
        this.availableequipmentlist= [];
    }

    //Focus input
    focus() {
        $("#memberSearch").focus();
    }
}
