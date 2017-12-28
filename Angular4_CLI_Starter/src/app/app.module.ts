import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FilesComponent } from './dashboard/files/files.component';
import {VideoComponent} from "./dashboard/video/video.component";
import {SettingsComponent} from "./dashboard/settings/settings.component";
import {WalletComponent} from "./dashboard/wallet/wallet.component";
import {ChatComponent} from "./dashboard/chat/chat.component";
import {CameraComponent} from "./dashboard/camera/camera.component";
import {MusicComponent} from "./dashboard/music/music.component";
import {CallsComponent} from "./dashboard/calls/calls.component";
import {ContactsComponent} from "./dashboard/contacts/contacts.component";
import {TorrentsComponent} from "./dashboard/torrents/torrents.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import {fakeBackendProvider} from "./_helpers/fake-backend";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, HttpModule} from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import {MatButtonModule, MatCheckboxModule, MatListModule, MatInputModule, MatProgressBarModule} from "@angular/material";
import {TransferComponent} from "./dashboard/files/ipfs-file-explorer/transfer/transfer.component";
import {InputComponent} from "app/dashboard/files/ipfs-file-explorer/input/input.component";
import {HomeComponent} from "./dashboard/files/ipfs-file-explorer/home/home.component";
import {TestComponent} from "app/dashboard/files/ipfs-file-explorer/test/test.component";
import {HeaderComponent} from "./dashboard/files/ipfs-file-explorer/header/header.component";
import {AccountComponent} from "./dashboard/files/ipfs-file-explorer/account/account.component";
import {IpfsService} from "./dashboard/files/ipfs-file-explorer/ipfs.service";
import {PhotosComponent} from "./dashboard/photos/photos.component";
import {StorageComponent} from "./dashboard/storage/storage.component";
import {SidebarComponent} from "./dashboard/sidebar/sidebar.component";
import {VrComponent} from "./dashboard/vr/vr.component";
import {NetworkComponent} from "./dashboard/network/network.component";
import {WebSocketService} from "angular2-websocket-service";
import {ConvergenceService} from "./convergence.service";
import {LoginComponent} from "./dashboard/login/login.component";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    [FormsModule, ReactiveFormsModule],
    [MatButtonModule, MatCheckboxModule, MatInputModule, MatListModule, MatProgressBarModule],
  ],
  declarations: [
    AppComponent,
    VrComponent,
    NetworkComponent,
    SidebarComponent,
    StorageComponent,
    PhotosComponent,
    TransferComponent,
    InputComponent,
    TestComponent,
    AccountComponent,
    HeaderComponent,
    HomeComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    DashboardComponent,
    VideoComponent,
    SettingsComponent,
    WalletComponent,
    ChatComponent,
    CameraComponent,
    MusicComponent,
    CallsComponent,
    ContactsComponent,
    TorrentsComponent,
    FilesComponent,
    LoginComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    // Convergence Providers
    AuthGuard,
    AuthenticationService,
    IpfsService,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    WebSocketService,
    ConvergenceService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
