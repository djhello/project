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
    
    public loggedUser: any;
    public issueForm: FormGroup;
    public keyPress: number;
    public user: any;
    public searchTerm: any;
    public equipmentIssue: any;
    public equipmentsList: any[] = [];
    public availableEquipmentList: any[] = [];
    public availableEquipmentListCopy: any[] = [];
    public equipmentChoosed: any[] = [];
    public equipmentIssueedList: any[] = [];
    public equipmentByUserIssueedList: any[] = [];
    public resMessage: string;
    public alertMessage: string;
    public loading: boolean = false; 
    public showSearchMemberDiv: boolean = false;


    public _getUrl: string = '/api/circulation/getIssueAll';
    public _getbyIdUrl: string = '/api/circulation/getIssueById';
    public _saveUrl: string = '/api/circulation/issueEquipment';
    public _getEquipmentUrl: string = '/api/circulation/getAllequipment';
    public _getAvailableallEquipmentUrl: string = '/api/equipment/getAvailableallEquipment';
    public _getbyUserIdUrl: string = '/api/users/getById';
    
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
        this.loggedUser  = JSON.parse(localStorage.getItem('loggedUser'));
    }

    ngOnInit() {
        this.titleService.setTitle("Envanter Takip Sistemi| Ödünç");
        this.loadScripts();
        this.createForm();
        this.getAvailableEquipmentList();
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
        this.issueForm = this.formBuilder.group({
            id: 0,
            userId: new FormControl('', Validators.required),
            memberSearch: new FormControl(''),
            memberName: new FormControl(''),
            email: new FormControl('', Validators.required),
            dueDate: new FormControl('', Validators.required),
            equipments: []
        });
        this.focus();
    }
    setUser() {
        console.log(this.loggedUser);
        if (this.loggedUser.userType != 1) {
            this.showSearchMemberDiv = false;
            var dt = new Date();
            dt.setDate(dt.getDate() + 15);
            this.issueForm.setValue({
                id: 0,
                userId: this.loggedUser.userId,
                memberName: this.loggedUser.displayName,
                email: this.loggedUser.email,
                dueDate: dt.toLocaleDateString('en-US'),
                memberSearch: null,
                equipments: []
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
        this._dataService.getById(searchValue, this._getbyUserIdUrl)
            .subscribe(response => {
                this.user = response;
                var dt = new Date();
                dt.setDate(dt.getDate() + 15);
                this.issueForm.setValue({
                    id: 0,
                    userId: this.user.userId,
                    memberName: this.user.firstName + ' ' + this.user.lastName,
                    email: this.user.email,
                    dueDate: dt.toLocaleDateString('en-US'),
                    memberSearch: null,
                    equipments: []
                });

                
            }, error => {
                //console.log(error);
            });

        this._dataService.getById(searchValue, this._getbyIdUrl)
            .subscribe(response => {
                this.loading = false;
                if (response != null) {
                    this.equipmentByUserIssueedList = response;
                }
                this.resMessage = null;
            }, error => {
                //console.log(error);
            });
    }

    //Search
    onSearch(): void {
        let term = this.searchTerm;
        this.availableEquipmentList = this.availableEquipmentListCopy.filter(function (tag) {
            return tag.equipmentId.toLowerCase().indexOf(term.toLowerCase()) >= 0;
        });
    }

    //Get Choosed equipment
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
    
    //Create
    onSubmit() {
        this.loading = true;
        this.issueForm.patchValue({
            equipments: this.equipmentChoosed
        });
        if (this.issueForm.invalid) {
            return;
        }
        if (this.issueForm.value.equipments.length != 0) {
            if (this.issueForm.value.userId > 0) {
                this._dataService.saveWithUser(this.issueForm.value, this.loggedUser, this._saveUrl)
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
        else {
            this.loading = false;
            alert('Lütfen en az bir ekipmanı seçiniz');
        }
    }

    //equipmentlist to choose
    equipmentList() {
        this.loading = true;
        this._dataService.getAll(this._getEquipmentUrl)
            .subscribe(
                response => {
                    this.loading = false;
                    this.equipmentsList = response;
                }, error => {
                    //console.log(error);
                }
            );
    }
    getAvailableEquipmentList() {
        this.loading = true;
        this._dataService.getAll(this._getAvailableallEquipmentUrl)
            .subscribe(
                response => {
                    this.loading = false;
                    this.availableEquipmentList = response;
                    this.availableEquipmentListCopy = response;
                }, error => {
                    //console.log(error);
                }
            );
    }
    //Pop Modal
    issueedList() {
        this.loading = true;
        $('#largesizemodal').modal({ backdrop: 'static', keyboard: false, show: true });
        this._dataService.getAll(this._getUrl)
            .subscribe(
                response => {
                    this.loading = false;
                    this.equipmentIssueedList = response;
                }, error => {
                    //console.log(error);
                }
                
        );
    }

    //Close Modal
    issueedListclose() {
        this.focus();
    }

    //Reset Form
    reset() {
        if (this.loggedUser.userType == 1) {
            this.issueForm.setValue({
                id: 0,
                userId: 0,
                memberSearch: null,
                memberName: null,
                email: null,
                dueDate: null,
                equipments: []
            });
        }
        this.searchTerm = "";
        this.availableEquipmentList = [];
        this.availableEquipmentListCopy = [];
        this.getAvailableEquipmentList();
        this.equipmentByUserIssueedList = [];  
        this.equipmentChoosed = [];
    }

    //Focus input
    focus() {
        $("#memberSearch").focus();
    }
}
