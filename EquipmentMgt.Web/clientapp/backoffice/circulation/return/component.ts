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
    public loggedUser: any;
    public returnForm: FormGroup;
    public keyPress: number;
    public user: any;
    public searchTerm: any;
    public equipmentIssue: any;
    public equipmentReturned: any[] = [];
    public equipmentReturnedList: any[] = [];
    public equipmentIssueedList: any[] = [];
    public equipmentChoosed: any[] = [];
    public resMessage: string;
    public alertMessage: string;
    public loading: boolean = false;
    public showSearchMemberDiv: boolean = false;

    public _getUrl: string = '/api/circulation/getreturnall';
    public _getbyIdUrl: string = '/api/circulation/getreturnbyid';
    public _saveUrl: string = '/api/circulation/returnequipment';
    public _getbyUserIdUrl: string = '/api/users/getbyid';

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        this.keyPress = event.keyCode;
        if (this.keyPress == 32) {
            this.resMessage = null;
            this.reset();
            this.focus();
        }
    }

    constructor(
        private router: Router,
        private titleService: Title,
        private formBuilder: FormBuilder,
        private _dataService: DataService) {

        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi | İade");
        this.loadScripts();
        this.createForm();
        this.setUser();
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

    setUser() {
        if (this.loggedUser.usertype != 1) {
            this.showSearchMemberDiv = false;
            this.returnForm.setValue({
                id: 0,
                userId: this.loggedUser.userid,
                memberName: this.loggedUser.displayname,
                email: this.loggedUser.email,
                memberSearch: null,
                equipments: []
            });
            this.loading = true;
            this._dataService.getbyid(this.loggedUser.userid, this._getbyIdUrl)
                .subscribe(response => {
                    this.loading = false;
                    if (response != null) {
                        this.equipmentIssueedList = response;
                    }
                    this.resMessage = null;
                }, error => {
                    //console.log(error);
                });
        }
        else {
            this.showSearchMemberDiv = true;
        }
    }
    //Search Member
    onChange(e, searchValue) {
        this.loading = true;
        this.reset();
        e.preventDefault();
        this._dataService.getbyid(searchValue, this._getbyUserIdUrl)
            .subscribe(response => {
                this.loading = false;
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
        this.loading = true;
        this._dataService.getbyid(searchValue, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                if (response != null) {
                    this.equipmentIssueedList = response;
                }
                this.resMessage = null;
            }, error => {
                //console.log(error);
            });
       
    }

    //Create
    onSubmit() {
        this.loading = true;
        this.returnForm.patchValue({
            equipments: this.equipmentChoosed
        });
        if (this.returnForm.invalid) {
            return;
        }
        if (this.returnForm.value.userId > 0) {
            this._dataService.save(this.returnForm.value, this._saveUrl)
                .subscribe(response => {
                    this.loading = false;
                    this.resMessage = response.message;
                    this.alertMessage = "alert-outline-info";
                    this.reset();
                    this.focus();
                }, error => {
                    //console.log(error);
                });
        }
    }

    //Pop Modal
    returnedList() {
        this.loading = true;
        $('#largesizemodal').modal({ backdrop: 'static', keyboard: false, show: true });
        this._dataService.getall(this._getUrl)
            .subscribe(
                response => {
                    this.loading = false;
                    this.equipmentReturned = response;
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
        this.equipmentIssueedList = this.equipmentIssueedList.filter(function (tag) {
            return tag.equipmentId.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    }
    oncheckChange(e, i) {
        e.preventDefault();
        if (e.currentTarget.checked) {
            this.equipmentChoosed.push({
                id: i
            });
        }
        else {
            this.removeArrayList(this.equipmentChoosed, i);
        }
    }
    removeArrayList(array, item) {
        array.forEach((element, index) => {
            if (element.id == item) {
                array.splice(index, 1)
            }
        });
        return array;
    }
    //Reset Form
    reset() {
        if (this.loggedUser.usertype == 1) {
            this.returnForm.setValue({
                id: 0,
                userId: 0,
                memberSearch: null,
                memberName: null,
                email: null,
                equipments: []
            });
        }
        this.searchTerm = "";
        this.equipmentReturnedList = [];
        this.equipmentIssueedList = [];
    }

    //Focus input
    focus() {
        $("#memberSearch").focus();
    }
}
