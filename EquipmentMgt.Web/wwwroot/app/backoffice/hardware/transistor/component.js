"use strict";var __decorate=this&&this.__decorate||function(t,e,r,o){var i,s=arguments.length,a=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,r,o);else for(var n=t.length-1;0<=n;n--)(i=t[n])&&(a=(s<3?i(a):3<s?i(e,r,a):i(e,r))||a);return 3<s&&a&&Object.defineProperty(e,r,a),a},__metadata=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),http_1=require("@angular/http"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../../shared/service"),TransistorComponent=function(){function t(t,e,r,o,i){this._http=t,this.router=e,this.titleService=r,this.formBuilder=o,this._dataService=i,this.adet=0,this.loading=!1,this._getUrl="/api/Transistor/getAll",this._getbyIdUrl="/api/transistor/getbyid",this._saveUrl="/api/transistor/save",this._deleteUrl="/api/transistor/deletebyid",this._updateUrl="/api/transistor/updateStatus",this._receiveUrl="/api/transistor/receive",this._getLocationUrl="/api/location/getall",this._getProjectUrl="/api/project/getall",this.loggedUser=JSON.parse(localStorage.getItem("loggedUser")),this.loggedUserName=this.loggedUser.displayName,this.loggedEmail=this.loggedUser.email,this.loggedUserType=this.loggedUser.userType}return t.prototype.ngOnInit=function(){this.titleService.setTitle("Envanter Takip Sistemi | Transistor"),this.loadScripts(),this.createForm(),this.getAll()},t.prototype.loadScripts=function(){for(var t=["assets/js/datepicker-init.js"],e=0;e<t.length;e++){var r=document.createElement("script");r.src=t[e],r.type="text/javascript",r.async=!1,r.charset="utf-8",document.getElementsByTagName("body")[0].appendChild(r)}},t.prototype.createForm=function(){this.transistorForm=this.formBuilder.group({id:0,locationId:new forms_1.FormControl(""),port:new forms_1.FormControl(""),TeiPartNumber:new forms_1.FormControl(""),description:new forms_1.FormControl(""),supplier:new forms_1.FormControl(""),SPN:new forms_1.FormControl(""),quantity:new forms_1.FormControl(""),MFPN:new forms_1.FormControl(""),projectId:new forms_1.FormControl("")})},t.prototype.addNew=function(){this.getLocations(),this.getProjects(),$("#largesizemodal").modal("show"),$("#largesizemodal").on("shown.bs.modal",function(){$(this).find("#port").focus()}),this.reset()},t.prototype.getAll=function(){var e=this;this.loading=!0,this._dataService.getall(this._getUrl).subscribe(function(t){e.transistors=t,e.transistorsCopy=t},function(t){console.log(t)}),this.loading=!1},t.prototype.edit=function(t,e){var r=this;t.preventDefault(),this.loading=!0,this.getProjects(),this.getLocations(),this._dataService.getbyid(e.id,this._getbyIdUrl).subscribe(function(t){r.loading=!1,r.transistor=t,r.transistorForm.setValue({id:r.transistor.id,locationId:r.transistor.locationId,port:r.transistor.port,TeiPartNumber:r.transistor.teiPartNumber,description:r.transistor.description,supplier:r.transistor.supplier,SPN:r.transistor.spn,quantity:r.transistor.quantity,MFPN:r.transistor.mfpn,projectId:r.transistor.projectId}),$("#largesizemodal").modal("show"),$("#largesizemodal").on("shown.bs.modal",function(){$(this).find("#name").focus()})},function(t){console.log(t)})},t.prototype.onSearch=function(){var e=this.searchTerm;this.transistors=this.transistorsCopy.filter(function(t){return 0<=t.description.toLowerCase().indexOf(e.toLowerCase())})},t.prototype.receive=function(t,e){for(var r=this,o=(e.id,0),i=0;i<this.transistors.length;i++)if(this.transistors[i].id!=e.id)o++;else if(this.transistors[i].id==e.id)break;this.adet=document.getElementById("receiveQuantity"+(o+1)).value,0==e.quantity?alert("Elimizde hiç malzeme bulunmamaktadır."):e.quantity>=this.adet?(this.loading=!0,this._dataService.receiveWithUser(e,this.adet,this.loggedUser,this._receiveUrl).subscribe(function(t){r.loading=!1,r.getAll()},function(t){console.log(t)})):alert("Ooopps elimizde o kadar yok mevcut sayısından az bir sayı giriniz"),t.preventDefault(),this.loading=!1},t.prototype.onSubmit=function(){var t,e=this;this.loading=!0,this.transistorForm.invalid||((t=new FormData).append("id",this.transistorForm.value.id),t.append("locationId",this.transistorForm.value.locationId),t.append("port",this.transistorForm.value.port),t.append("TeiPartNumber",this.transistorForm.value.TeiPartNumber),t.append("description",this.transistorForm.value.description),t.append("supplier",this.transistorForm.value.supplier),t.append("SPN",this.transistorForm.value.SPN),t.append("quantity",this.transistorForm.value.quantity),t.append("MFPN",this.transistorForm.value.MFPN),t.append("projectId",this.transistorForm.value.projectId),this._dataService.saveWithUser(this.transistorForm.value,this.loggedUser,this._saveUrl).subscribe(function(t){e.loading=!1,e.resmessage=t.message,e.alertmessage="alert-outline-info",e.getAll(),$("#largesizemodal").modal("hide")},function(t){console.log(t)}))},t.prototype.updateStatus=function(t,e){var r=this;this.loading=!0,t.preventDefault(),confirm("You are about to delete "+e.description+". Are you sure?")&&this._dataService.updateStatus(e,this.loggedUser,this._updateUrl).subscribe(function(t){r.resmessage=t.message,r.alertmessage="alert-outline-info",r.getAll(),r.reset(),r.loading=!1,$("#defaultsizemodal").modal("hide")},function(t){console.log(t),r.loading=!1}),this.loading=!1},t.prototype.getLocations=function(){var e=this;this.loading=!0,this._dataService.getall(this._getLocationUrl).subscribe(function(t){e.locations=t,e.loading=!1},function(t){console.log(t)})},t.prototype.getProjects=function(){var e=this;this.loading=!0,this._dataService.getall(this._getProjectUrl).subscribe(function(t){e.projects=t,e.loading=!1},function(t){console.log(t)})},t.prototype.delete=function(t,e){var r=this;this.loading=!0,t.preventDefault(),confirm("You are about to delete "+e.description+". Are you sure?")&&this._dataService.delete(e.id,this._deleteUrl).subscribe(function(t){r.loading=!1,r.resmessage=t,r.getAll()},function(t){console.log(t)})},t.prototype.reset=function(){this.transistorForm.setValue({id:0,locationId:0,port:null,TeiPartNumber:null,description:null,supplier:null,SPN:null,quantity:0,MFPN:null,projectId:0}),this.searchTerm="",this.transistorsCopy=[],this.transistors=[],this.resmessage=null,$("#name").focus()},__decorate([core_1.Component({selector:"ng-transistor",templateUrl:"./app/backoffice/hardware/transistor/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[http_1.Http,router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,service_1.DataService])],t)}();exports.TransistorComponent=TransistorComponent;