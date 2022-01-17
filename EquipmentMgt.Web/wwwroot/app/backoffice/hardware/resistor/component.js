"use strict";var __decorate=this&&this.__decorate||function(e,t,r,o){var i,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,o);else for(var n=e.length-1;0<=n;n--)(i=e[n])&&(a=(s<3?i(a):3<s?i(t,r,a):i(t,r))||a);return 3<s&&a&&Object.defineProperty(t,r,a),a},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),http_1=require("@angular/http"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../../shared/service"),ResistorComponent=function(){function e(e,t,r,o,i){this._http=e,this.router=t,this.titleService=r,this.formBuilder=o,this._dataService=i,this.adet=0,this.loading=!1,this._getUrl="/api/Resistor/getAll",this._getbyIdUrl="/api/resistor/getbyid",this._saveUrl="/api/resistor/save",this._deleteUrl="/api/resistor/deletebyid",this._updateUrl="/api/resistor/updateStatus",this._receiveUrl="/api/resistor/receive",this._getLocationUrl="/api/location/getall",this._getProjectUrl="/api/project/getall",this.loggedUser=JSON.parse(localStorage.getItem("loggedUser")),this.loggedUserName=this.loggedUser.displayName,this.loggedEmail=this.loggedUser.email,this.loggedUserType=this.loggedUser.userType}return e.prototype.ngOnInit=function(){this.titleService.setTitle("Envanter Takip Sistemi | Resistor"),this.loadScripts(),this.createForm(),this.getAll()},e.prototype.loadScripts=function(){for(var e=["assets/js/datepicker-init.js"],t=0;t<e.length;t++){var r=document.createElement("script");r.src=e[t],r.type="text/javascript",r.async=!1,r.charset="utf-8",document.getElementsByTagName("body")[0].appendChild(r)}},e.prototype.createForm=function(){this.resistorForm=this.formBuilder.group({id:0,locationId:new forms_1.FormControl(""),port:new forms_1.FormControl(""),TeiPartNumber:new forms_1.FormControl(""),description:new forms_1.FormControl(""),value:new forms_1.FormControl(""),voltage:new forms_1.FormControl(""),current:new forms_1.FormControl(""),manufacturePartNumber:new forms_1.FormControl(""),package:new forms_1.FormControl(""),power:new forms_1.FormControl(""),quantity:new forms_1.FormControl(""),projectId:new forms_1.FormControl("")})},e.prototype.addNew=function(){this.getLocations(),this.getProjects(),$("#largesizemodal").modal("show"),$("#largesizemodal").on("shown.bs.modal",function(){$(this).find("#port").focus()}),this.reset()},e.prototype.getAll=function(){var t=this;this.loading=!0,this._dataService.getall(this._getUrl).subscribe(function(e){t.resistors=e,t.resistorsCopy=e},function(e){console.log(e)}),this.loading=!1},e.prototype.edit=function(e,t){var r=this;e.preventDefault(),this.loading=!0,this.getProjects(),this.getLocations(),this._dataService.getbyid(t.id,this._getbyIdUrl).subscribe(function(e){r.loading=!1,r.resistor=e,r.resistorForm.setValue({id:r.resistor.id,locationId:r.resistor.locationId,port:r.resistor.port,TeiPartNumber:r.resistor.teiPartNumber,description:r.resistor.description,value:r.resistor.value,voltage:r.resistor.voltage,current:r.resistor.current,manufacturePartNumber:r.resistor.manufacturePartNumber,package:r.resistor.package,power:r.resistor.power,quantity:r.resistor.quantity,projectId:r.resistor.projectId}),$("#largesizemodal").modal("show"),$("#largesizemodal").on("shown.bs.modal",function(){$(this).find("#name").focus()})},function(e){console.log(e)})},e.prototype.onSearch=function(){var t=this.searchTerm;this.resistors=this.resistorsCopy.filter(function(e){return 0<=e.description.toLowerCase().indexOf(t.toLowerCase())})},e.prototype.receive=function(e,t){for(var r=this,o=(t.id,0),i=0;i<this.resistors.length;i++)if(this.resistors[i].id!=t.id)o++;else if(this.resistors[i].id==t.id)break;this.adet=document.getElementById("receiveQuantity"+(o+1)).value,0==t.quantity?alert("Elimizde hiç malzeme bulunmamaktadır."):t.quantity>=this.adet?(this.loading=!0,this._dataService.receiveWithUser(t,this.adet,this.loggedUser,this._receiveUrl).subscribe(function(e){r.loading=!1,r.getAll()},function(e){console.log(e)})):alert("Ooopps elimizde o kadar yok mevcut sayısından az bir sayı giriniz"),e.preventDefault(),this.loading=!1},e.prototype.onSubmit=function(){var e,t=this;this.loading=!0,this.resistorForm.invalid||((e=new FormData).append("id",this.resistorForm.value.id),e.append("locationId",this.resistorForm.value.locationId),e.append("port",this.resistorForm.value.port),e.append("TeiPartNumber",this.resistorForm.value.TeiPartNumber),e.append("description",this.resistorForm.value.description),e.append("value",this.resistorForm.value.value),e.append("current",this.resistorForm.value.current),e.append("power",this.resistorForm.value.power),e.append("manufacturePartNumber",this.resistorForm.value.manufacturePartNumber),e.append("voltage",this.resistorForm.value.voltage),e.append("quantity",this.resistorForm.value.quantity),e.append("package",this.resistorForm.value.package),e.append("projectId",this.resistorForm.value.projectId),this._dataService.saveWithUser(this.resistorForm.value,this.loggedUser,this._saveUrl).subscribe(function(e){t.loading=!1,t.resmessage=e.message,t.alertmessage="alert-outline-info",t.getAll(),$("#largesizemodal").modal("hide")},function(e){console.log(e)}))},e.prototype.updateStatus=function(e,t){var r=this;this.loading=!0,e.preventDefault(),confirm("You are about to delete "+t.description+". Are you sure?")&&this._dataService.updateStatus(t,this.loggedUser,this._updateUrl).subscribe(function(e){r.resmessage=e.message,r.alertmessage="alert-outline-info",r.getAll(),r.reset(),r.loading=!1,$("#defaultsizemodal").modal("hide")},function(e){console.log(e),r.loading=!1}),this.loading=!1},e.prototype.getLocations=function(){var t=this;this.loading=!0,this._dataService.getall(this._getLocationUrl).subscribe(function(e){t.locations=e,t.loading=!1},function(e){console.log(e)})},e.prototype.getProjects=function(){var t=this;this.loading=!0,this._dataService.getall(this._getProjectUrl).subscribe(function(e){t.projects=e,t.loading=!1},function(e){console.log(e)})},e.prototype.delete=function(e,t){var r=this;this.loading=!0,e.preventDefault(),confirm("You are about to delete "+t.description+". Are you sure?")&&this._dataService.delete(t.id,this._deleteUrl).subscribe(function(e){r.loading=!1,r.resmessage=e,r.getAll()},function(e){console.log(e)})},e.prototype.reset=function(){this.resistorForm.setValue({id:0,locationId:0,port:null,TeiPartNumber:null,description:null,value:null,voltage:null,current:null,manufacturePartNumber:null,package:null,power:null,quantity:0,projectId:0}),this.searchTerm="",this.resistorsCopy=[],this.resistors=[],this.resmessage=null,$("#name").focus()},__decorate([core_1.Component({selector:"ng-resistor",templateUrl:"./app/backoffice/hardware/resistor/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[http_1.Http,router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,service_1.DataService])],e)}();exports.ResistorComponent=ResistorComponent;