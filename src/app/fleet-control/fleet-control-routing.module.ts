import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FleetControlListComponent } from './fleet-control-list/fleet-control-list.component';
import { FleetControlDetailComponent } from './fleet-control-detail/fleet-control-detail.component';


const FleetControlRoutes: Routes = [
    {
        path: 'fleetControl',
        component: FleetControlListComponent
    },
    {
        path: 'fleetControl/new',
        component: FleetControlDetailComponent
    },
    {
        path: 'fleetControl/edit/:placa',
        component: FleetControlDetailComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(FleetControlRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FleetControlRoutingModule {}