import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FleetControlComponent } from './fleet-control/fleet-control.component';
import { FleetControlHeaderComponent } from './fleet-control/fleet-control-header/fleet-control-header.component';
import { FleetControlBodyComponent } from './fleet-control/fleet-control-body/fleet-control-body.component';
import { FleetControlFooterComponent } from './fleet-control/fleet-control-footer/fleet-control-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FleetControlComponent,
    FleetControlHeaderComponent,
    FleetControlBodyComponent,
    FleetControlFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
