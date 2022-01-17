"use strict";var __decorate=this&&this.__decorate||function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var d=e.length-1;0<=d;d--)(r=e[d])&&(s=(a<3?r(s):3<a?r(t,o,s):r(t,o))||s);return 3<a&&s&&Object.defineProperty(t,o,s),s},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),http_1=require("@angular/http"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../../shared/service"),DiodeComponent=function(){function e(e,t,o,i,r){this._http=e,this.router=t,this.titleService=o,this.formBuilder=i,this._dataService=r,this.adet=0,this.loading=!1,this._getUrl="/api/Diode/getAll",this._getbyIdUrl="/api/diode/getbyid",this._saveUrl="/api/diode/save",this._deleteUrl="/api/diode/deletebyid",this._updateUrl="/api/diode/updateStatus",this._receiveUrl="/api/diode/receive",this._getLocationUrl="/api/location/getall",this._getProjectUrl="/api/project/getall",this.loggedUser=JSON.parse(localStorage.getItem("loggedUser")),this.loggedUserName=this.loggedUser.displayName,this.loggedEmail=this.loggedUser.email,this.loggedUserType=this.loggedUser.userType}return e.prototype.ngOnInit=function(){this.titleService.setTitle("Envanter Takip Sistemi | Diode"),this.loadScripts(),this.createForm(),this.getAll()},e.prototype.loadScripts=function(){for(var e=["assets/js/datepicker-init.js"],t=0;t<e.length;t++){var o=document.createElement("script");o.src=e[t],o.type="text/javascript",o.async=!1,o.charset="utf-8",document.getElementsByTagName("body")[0].appendChild(o)}},e.prototype.createForm=function(){this.diodeForm=this.formBuilder.group({id:0,locationId:new forms_1.FormControl(""),port:new forms_1.FormControl(""),TeiPartNumber:new forms_1.FormControl(""),description:new forms_1.FormControl(""),value:new forms_1.FormControl(""),voltage:new forms_1.FormControl(""),current:new forms_1.FormControl(""),manufacturePartNumber:new forms_1.FormControl(""),package:new forms_1.FormControl(""),power:new forms_1.FormControl(""),quantity:new forms_1.FormControl(""),projectId:new forms_1.FormControl("")})},e.prototype.addNew=function(){this.getLocations(),this.getProjects(),$("#largesizemodal").modal("show"),$("#largesizemodal").on("shown.bs.modal",function(){$(this).find("#name").focus()}),this.reset()},e.prototype.getAll=function(){var t=this;this.loading=!0,this._dataService.getall(this._getUrl).subscribe(function(e){t.diodes=e,t.diodesCopy=e},function(e){console.log(e)}),this.loading=!1},e.prototype.edit=function(e,t){var o=this;e.preventDefault(),this.getProjects(),this.getLocations(),this.loading=!0,this._dataService.getbyid(t.id,this._getbyIdUrl).subscribe(function(e){o.loading=!1,o.diode=e,o.diodeForm.setValue({id:o.diode.id,locationId:o.diode.locationId,port:o.diode.port,TeiPartNumber:o.diode.teiPartNumber,description:o.diode.description,value:o.diode.value,voltage:o.diode.voltage,current:o.diode.current,manufacturePartNumber:o.diode.manufacturePartNumber,package:o.diode.package,power:o.diode.power,quantity:o.diode.quantity,projectId:o.diode.projectId}),$("#largesizemodal").modal("show"),$("#largesizemodal").on("shown.bs.modal",function(){$(this).find("#name").focus()})},function(e){console.log(e)})},e.prototype.onSearch=function(){var t=this.searchTerm;this.diodes=this.diodesCopy.filter(function(e){return 0<=e.description.toLowerCase().indexOf(t.toLowerCase())})},e.prototype.receive=function(e,t){for(var o=this,i=(t.id,0),r=0;r<this.diodes.length;r++)if(this.diodes[r].id!=t.id)i++;else if(this.diodes[r].id==t.id)break;this.adet=document.getElementById("receiveQuantity"+(i+1)).value,0==t.quantity?alert("Elimizde hiç malzeme bulunmamaktadır."):t.quantity>=this.adet?(this.loading=!0,this._dataService.receiveWithUser(t,this.adet,this.loggedUser,this._receiveUrl).subscribe(function(e){o.loading=!1,o.getAll()},function(e){console.log(e)})):alert("Ooopps elimizde o kadar yok mevcut sayısından az bir sayı giriniz"),e.preventDefault(),this.loading=!1},e.prototype.getLocations=function(){var t=this;this.loading=!0,this._dataService.getall(this._getLocationUrl).subscribe(function(e){t.locations=e,t.loading=!1},function(e){console.log(e)})},e.prototype.getProjects=function(){var t=this;this.loading=!0,this._dataService.getall(this._getProjectUrl).subscribe(function(e){t.projects=e,t.loading=!1},function(e){console.log(e)})},e.prototype.onSubmit=function(){var e,t=this;this.loading=!0,this.diodeForm.invalid||((e=new FormData).append("id",this.diodeForm.value.id),e.append("locationId",this.diodeForm.value.locationId),e.append("port",this.diodeForm.value.port),e.append("TeiPartNumber",this.diodeForm.value.TeiPartNumber),e.append("description",this.diodeForm.value.description),e.append("value",this.diodeForm.value.value),e.append("current",this.diodeForm.value.current),e.append("power",this.diodeForm.value.power),e.append("manufacturePartNumber",this.diodeForm.value.manufacturePartNumber),e.append("voltage",this.diodeForm.value.voltage),e.append("quantity",this.diodeForm.value.quantity),e.append("package",this.diodeForm.value.package),e.append("projectId",this.diodeForm.value.projectId),this._dataService.saveWithUser(this.diodeForm.value,this.loggedUser,this._saveUrl).subscribe(function(e){t.loading=!1,t.resmessage=e.message,t.alertmessage="alert-outline-info",t.getAll(),$("#largesizemodal").modal("hide")},function(e){console.log(e)}))},e.prototype.updateStatus=function(e,t){var o=this;this.loading=!0,e.preventDefault(),confirm("You are about to delete "+t.description+". Are you sure?")&&this._dataService.updateStatus(t,this.loggedUser,this._updateUrl).subscribe(function(e){o.resmessage=e.message,o.alertmessage="alert-outline-info",o.getAll(),o.reset(),o.loading=!1,$("#defaultsizemodal").modal("hide")},function(e){console.log(e),o.loading=!1}),this.loading=!1},e.prototype.delete=function(e,t){var o=this;this.loading=!0,e.preventDefault(),confirm("You are about to delete "+t.description+". Are you sure?")&&this._dataService.delete(t.id,this._deleteUrl).subscribe(function(e){o.loading=!1,o.resmessage=e,o.getAll()},function(e){console.log(e)})},e.prototype.reset=function(){this.diodeForm.setValue({id:0,locationId:0,port:null,TeiPartNumber:null,description:null,value:null,voltage:null,current:null,manufacturePartNumber:null,package:null,power:null,quantity:0,projectId:0}),this.searchTerm="",this.diodesCopy=[],this.diodes=[],this.resmessage=null,$("#port").focus()},__decorate([core_1.Component({selector:"ng-diode",templateUrl:"./app/backoffice/hardware/diode/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[http_1.Http,router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,service_1.DataService])],e)}();exports.DiodeComponent=DiodeComponent;