import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { FleetControlListComponent } from './fleet-control-list/fleet-control-list.component';
import { FleetControlDetailComponent } from './fleet-control-detail/fleet-control-detail.component';

import { FleetControlRoutingModule } from './fleet-control-routing.module';
import { FleetControlService } from './fleet-control.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FleetControlRoutingModule
    ],
    declarations: [
        FleetControlListComponent,
        FleetControlDetailComponent
    ],
    exports: [ 
        FleetControlListComponent,
        FleetControlDetailComponent
    ],
    providers: [
        FleetControlService
    ]
})
export class FleetControlModule {}