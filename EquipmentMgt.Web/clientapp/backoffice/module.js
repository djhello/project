"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular_highcharts_1 = require("angular-highcharts");
var access_guard_1 = require("../shared/guard/access.guard");
//Components
var component_1 = require("./component");
var component_2 = require("./dashboard/component");
var component_3 = require("./equipment/equipments/component");
var component_4 = require("./equipment/equipmentModel/component");
var component_5 = require("./equipment/calibration/component");
var component_6 = require("./circulation/issue/component");
var component_7 = require("./circulation/return/component");
var component_8 = require("./system/settings/component");
var component_9 = require("./system/users/component");
var component_10 = require("./system/departmans/component");
var component_11 = require("./reports/equipment/component");
var component_12 = require("./equipment/location/component");
var routes = [
    {
        path: '',
        component: component_1.BackofficeComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', component: component_2.DashboardComponent },
            { path: 'equipment/equipments', component: component_3.EquipmentsComponent, canActivate: [access_guard_1.AccessPermission] },
            { path: 'equipment/equipmentModel', component: component_4.EquipmentModelsComponent, canActivate: [access_guard_1.AccessPermission] },
            { path: 'equipment/location', component: component_12.LocationsComponent, canActivate: [access_guard_1.AccessPermission] },
            { path: 'equipment/calibration', component: component_5.CalibrationsComponent, canActivate: [access_guard_1.AccessPermission] },
            { path: 'circulation/issue', component: component_6.IssueComponent },
            { path: 'circulation/return', component: component_7.ReturnComponent },
            { path: 'system/users', component: component_9.UsersComponent, canActivate: [access_guard_1.AccessPermission] },
            { path: 'system/departmans', component: component_10.DepartmansComponent, canActivate: [access_guard_1.AccessPermission] },
            { path: 'system/settings', component: component_8.UserSettingsComponent, canActivate: [access_guard_1.AccessPermission] },
            { path: 'reports/equipment', component: component_11.EquipmentReportsComponent }
        ]
    }
];
var BackofficeModule = /** @class */ (function () {
    function BackofficeModule() {
    }
    BackofficeModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, router_1.RouterModule.forChild(routes), angular_highcharts_1.ChartModule],
            declarations: [
                component_1.BackofficeComponent,
                component_2.DashboardComponent,
                component_3.EquipmentsComponent,
                component_4.EquipmentModelsComponent,
                component_12.LocationsComponent,
                component_5.CalibrationsComponent,
                component_6.IssueComponent,
                component_7.ReturnComponent,
                component_9.UsersComponent,
                component_10.DepartmansComponent,
                component_8.UserSettingsComponent,
                component_11.EquipmentReportsComponent
            ],
            providers: [access_guard_1.AccessPermission],
            bootstrap: [component_1.BackofficeComponent]
        })
    ], BackofficeModule);
    return BackofficeModule;
}());
exports.BackofficeModule = BackofficeModule;
//# sourceMappingURL=module.js.map