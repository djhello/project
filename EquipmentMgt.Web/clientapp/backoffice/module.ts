import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular-highcharts';
import { AccessPermission } from '../shared/guard/access.guard';

//Components
import { BackofficeComponent } from './component';
import { DashboardComponent } from './dashboard/component';
import { EquipmentsComponent } from './equipment/equipments/component'; 
import { EquipmentModelsComponent } from './equipment/equipmentModel/component';
import { CalibrationsComponent } from './equipment/calibration/component';
import { IssueComponent } from './circulation/issue/component';
import { ReturnComponent } from './circulation/return/component';
import { UserSettingsComponent } from './system/settings/component';
import { UsersComponent } from './system/users/component';
import { DepartmansComponent } from './system/departmans/component';
import { EquipmentReportsComponent } from './reports/equipment/component';
import { LocationsComponent } from './equipment/location/component';

const routes: Routes = [
    {
        path: '',
        component: BackofficeComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'equipment/equipments', component: EquipmentsComponent, canActivate: [AccessPermission]  },
            { path: 'equipment/equipmentModel', component: EquipmentModelsComponent, canActivate: [AccessPermission] },
            { path: 'equipment/location', component: LocationsComponent, canActivate: [AccessPermission] },
            { path: 'equipment/calibration', component: CalibrationsComponent, canActivate: [AccessPermission] },
            { path: 'circulation/issue', component: IssueComponent },
            { path: 'circulation/return', component: ReturnComponent },
            { path: 'system/users', component: UsersComponent, canActivate: [AccessPermission] },
            { path: 'system/departmans', component: DepartmansComponent, canActivate: [AccessPermission] },
            { path: 'system/settings', component: UserSettingsComponent, canActivate: [AccessPermission] },
            { path: 'reports/equipment', component: EquipmentReportsComponent }
        ]
    }
];

@NgModule({
    imports: [CommonModule, HttpModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), ChartModule],
    declarations: [
        BackofficeComponent,
        DashboardComponent,
        EquipmentsComponent,
        EquipmentModelsComponent,
        LocationsComponent,
        CalibrationsComponent,
        IssueComponent,
        ReturnComponent,
        UsersComponent,
        DepartmansComponent,
        UserSettingsComponent,
        EquipmentReportsComponent
    ],
    providers: [AccessPermission],
    bootstrap: [BackofficeComponent]
})

export class BackofficeModule { }