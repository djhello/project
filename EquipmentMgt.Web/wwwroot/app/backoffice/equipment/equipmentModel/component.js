"use strict";var __decorate=this&&this.__decorate||function(e,t,o,i){var a,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,i);else for(var l=e.length-1;0<=l;l--)(a=e[l])&&(r=(n<3?a(r):3<n?a(t,o,r):a(t,o))||r);return 3<n&&r&&Object.defineProperty(t,o,r),r},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),forms_1=require("@angular/forms"),http_1=require("@angular/http"),router_1=require("@angular/router"),platform_browser_1=require("@angular/platform-browser"),service_1=require("../../../shared/service"),EquipmentModelsComponent=function(){function e(e,t,o,i,a){this._http=e,this.router=t,this.titleService=o,this.formBuilder=i,this._dataService=a,this.loading=!1,this.updatePicture=!1,this._getUrl="/api/equipmentmodel/getall",this._getbyIdUrl="/api/equipmentmodel/getbyid",this._saveUrl="/api/equipmentmodel/save",this._deleteUrl="/api/equipmentmodel/deletebyid",this._updateUrl="/api/equipmentmodel/updateStatus",this._getDepartmanUrl="/api/departman/getall",this.loggedUser=JSON.parse(localStorage.getItem("loggedUser"))}return e.prototype.ngOnInit=function(){this.titleService.setTitle("Envanter Takip Sistemi | Equipment Model"),this.loadScripts(),this.createForm(),this.getAll()},e.prototype.loadScripts=function(){for(var e=["assets/js/datepicker-init.js"],t=0;t<e.length;t++){var o=document.createElement("script");o.src=e[t],o.type="text/javascript",o.async=!1,o.charset="utf-8",document.getElementsByTagName("body")[0].appendChild(o)}},e.prototype.createForm=function(){this.equipmentModelForm=this.formBuilder.group({id:0,departmanId:0,name:new forms_1.FormControl("",forms_1.Validators.required),quantity:new forms_1.FormControl(""),description:new forms_1.FormControl(""),eDocWebAddress:new forms_1.FormControl(""),eDocLocalAddress:new forms_1.FormControl(""),fileupload:null})},e.prototype.onFileChange=function(e){var t,o,i;0<e.target.files.length?(o=e.target.files[0],this.equipmentModelForm.get("fileupload").setValue(o)):(i=new DataTransfer,t=this.equipmentModel.coverImage.substr(this.equipmentModel.coverImage.indexOf("/")+1),o=new File(["content"],t),i.items.add(o),i=i.files,e.target.files=i)},e.prototype.addNew=function(){this.getDepartmanAll(),$("#largesizemodal").modal("show"),$("#largesizemodal").on("shown.bs.modal",function(){$(this).find("#name").focus()}),this.reset()},e.prototype.getAll=function(){var t=this;this.loading=!0,this._dataService.getall(this._getUrl).subscribe(function(e){t.equipmentModels=e},function(e){console.log(e)}),this.loading=!1},e.prototype.getDepartmanAll=function(){var t=this;this.loading=!0,this._dataService.getall(this._getDepartmanUrl).subscribe(function(e){t.loading=!1,t.departmans=e},function(e){console.log(e)})},e.prototype.edit=function(e,t){var i=this;this.getDepartmanAll(),e.preventDefault(),this.loading=!0,this._dataService.getbyid(t.id,this._getbyIdUrl).subscribe(function(e){console.log(e),i.equipmentModel=e,i.equipmentModelForm.setValue({id:i.equipmentModel.id,name:i.equipmentModel.name,departmanId:i.equipmentModel.departmanId,quantity:i.equipmentModel.quantity,description:i.equipmentModel.description,eDocWebAddress:i.equipmentModel.eDocWebAddress,eDocLocalAddress:i.equipmentModel.eDocLocalAddress,fileupload:i.equipmentModel.coverImage});var t=document.getElementById("fileupload"),o=new DataTransfer,e=i.equipmentModel.coverImage.substr(i.equipmentModel.coverImage.indexOf("/")+1),e=new File(["content"],e);o.items.add(e);o=o.files;t.files=o,$("#largesizemodal").modal("show"),$("#largesizemodal").on("shown.bs.modal",function(){$(this).find("#name").focus()}),i.loading=!1},function(e){console.log(e)})},e.prototype.updateStatus=function(e,t){var o=this;console.log(t),this.loading=!0,e.preventDefault(),confirm("You are about to delete "+t.equipmentModelName+". Are you sure?")&&this._dataService.updateStatus(t,this.loggedUser,this._updateUrl).subscribe(function(e){o.resmessage=e.message,o.alertmessage="alert-outline-info",o.getAll(),o.reset(),o.loading=!1,$("#defaultsizemodal").modal("hide")},function(e){console.log(e),o.loading=!1}),this.loading=!1},e.prototype.onSubmit=function(){var e,t,o=this;this.loading=!0,this.equipmentModelForm.invalid||(console.log(this.equipmentModelForm.value.fileupload),e=new Date,(t=new FormData).append("id",this.equipmentModelForm.value.id),t.append("name",this.equipmentModelForm.value.name),t.append("quantity",this.equipmentModelForm.value.quantity),t.append("description",this.equipmentModelForm.value.description),t.append("departmanId",this.equipmentModelForm.value.departmanId),t.append("eDocWebAddress",this.equipmentModelForm.value.eDocWebAddress),t.append("eDocLocalAddress",this.equipmentModelForm.value.eDocLocalAddress),t.append("fileupload",this.equipmentModelForm.value.fileupload),t.append("Status","1"),t.append("LastUserId",this.loggedUser.userId),t.append("LockStatus","1"),t.append("CreateDate",e.toString()),this._dataService.saveForm(t,this._saveUrl).subscribe(function(e){o.resmessage=e.message,o.alertmessage="alert-outline-info",o.getAll(),$("#largesizemodal").modal("hide"),o.reset(),o.loading=!1},function(e){console.log(e)}))},e.prototype.delete=function(e,t){var o=this;this.loading=!0,e.preventDefault(),confirm("You are about to delete "+t.equipmentModelName+". Are you sure?")&&this._dataService.delete(t.id,this._deleteUrl).subscribe(function(e){o.resmessage=e,o.getAll(),o.loading=!1},function(e){console.log(e)})},e.prototype.reset=function(){this.equipmentModelForm.setValue({id:0,departmanId:0,name:null,quantity:null,description:null,eDocWebAddress:null,eDocLocalAddress:null,fileupload:null}),this.equipmentModelForm.get("fileupload").setValue(null),this.fileInput.nativeElement.value="",this.resmessage=null,$("#name").focus()},__decorate([core_1.ViewChild("fileInput"),__metadata("design:type",core_1.ElementRef)],e.prototype,"fileInput",void 0),__decorate([core_1.Component({selector:"ng-equipmentModel",templateUrl:"./app/backoffice/equipment/equipmentModel/component.html",providers:[service_1.DataService]}),__metadata("design:paramtypes",[http_1.Http,router_1.Router,platform_browser_1.Title,forms_1.FormBuilder,service_1.DataService])],e)}();exports.EquipmentModelsComponent=EquipmentModelsComponent;