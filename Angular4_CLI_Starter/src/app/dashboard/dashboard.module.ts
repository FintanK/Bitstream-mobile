import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LandingComponent } from './landing/landing.component';
import { FilesComponent } from './files/files.component';
import { StorageComponent } from './storage/storage.component';
import { PhotosComponent } from './photos/photos.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VrComponent } from './vr/vr.component';
import { NetworkComponent } from './network/network.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule
  ],
  declarations: [
    DashboardComponent,
    LandingComponent,
    FilesComponent,
    StorageComponent,
    PhotosComponent,
    SidebarComponent,
    VrComponent,
    NetworkComponent,
    LoginComponent
  ]

})
export class DashboardModule { }
