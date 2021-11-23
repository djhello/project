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
import { UsersComponent } from './system/users/component';
import { EquipmentReportsComponent } from './reports/equipment/component';
import { LocationsComponent } from './equipment/location/component';

const routes: Routes = [
    {
        path: '',
        component: BackofficeComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardComponent },

            { path: 'equipment/equipments', component: EquipmentsComponent },
            { path: 'equipment/equipmentModel', component: EquipmentModelsComponent },
            { path: 'equipment/location', component: LocationsComponent },
            { path: 'equipment/calibration', component: CalibrationsComponent },
            
            { path: 'circulation/issue', component: IssueComponent },
            { path: 'circulation/return', component: ReturnComponent },

            { path: 'system/users', component: UsersComponent, canActivate: [AccessPermission] },

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
        EquipmentReportsComponent
    ],
    providers: [AccessPermission],
    bootstrap: [BackofficeComponent]
})

export class BackofficeModule { }