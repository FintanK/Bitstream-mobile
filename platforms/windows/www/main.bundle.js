webpackJsonp(["main"],{

/***/ "../../../../../src lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src lazy recursive";

/***/ }),

/***/ "../../../../../src/app/_guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (localStorage.getItem('currentUserJWTToken')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());

//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/_helpers/fake-backend.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fakeBackendFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fakeBackendProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http_testing__ = __webpack_require__("../../../http/esm5/testing.js");


function fakeBackendFactory(backend, options) {
    // configure fake backend
    backend.connections.subscribe(function (connection) {
        var testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
        // wrap in timeout to simulate server api call
        setTimeout(function () {
            // fake authenticate api end point
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === __WEBPACK_IMPORTED_MODULE_0__angular_http__["f" /* RequestMethod */].Post) {
                // get parameters from post request
                var params = JSON.parse(connection.request.getBody());
                // check user credentials and return fake jwt token if valid
                if (params.username === testUser.username && params.password === testUser.password) {
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["h" /* ResponseOptions */]({ status: 200, body: { token: 'fake-jwt-token' } })));
                }
                else {
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["h" /* ResponseOptions */]({ status: 200 })));
                }
            }
            // fake users api end point
            if (connection.request.url.endsWith('/api/users') && connection.request.method === __WEBPACK_IMPORTED_MODULE_0__angular_http__["f" /* RequestMethod */].Get) {
                // check for fake auth token in header and return test users if valid, this security is implemented server side
                // in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["h" /* ResponseOptions */]({ status: 200, body: [testUser] })));
                }
                else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new __WEBPACK_IMPORTED_MODULE_0__angular_http__["g" /* Response */](new __WEBPACK_IMPORTED_MODULE_0__angular_http__["h" /* ResponseOptions */]({ status: 401 })));
                }
            }
        }, 500);
    });
    return new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */](backend, options);
}
var fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */],
    useFactory: fakeBackendFactory,
    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http_testing__["a" /* MockBackend */], __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* BaseRequestOptions */]]
};
//# sourceMappingURL=fake-backend.js.map

/***/ }),

/***/ "../../../../../src/app/_services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 *
 *   This Authentication service ensures that a session is only valid as long as
 *   the native app has a private key that can decrypt the convergence file
 *   located at an IPFS hash.
 *
 *   Once a convergence configuration is loaded the app initialises and pulls in all of the
 *   information required to restore an old session (Still working on synch strategy).
 *
 */
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        // Set configuration if found in local storage
        this.convergence = JSON.parse(localStorage.getItem('Convergence'));
    }
    AuthenticationService.prototype.isAuthenticated = function () {
        return localStorage.getItem('Convergence').length > 0;
    };
    /**
     *
     *     Security
     *
     *     We never keep a copy of the the user's private key. It is generated on the client and is just used to decrypt
     *     data pulled down from IPFS
     *
     *
     *     Login
     *
     *     This will only require a private and public key. When entering the private key it will only be stored locally
     *     in order for user's to have complete control over the storage of information
     *
     *
     *     New Profile
     *
     *     Private key generated on client and stored there only.
     *     Public key generated on client and stored in Convergence as an identifier for the json merkel index file
     *
     */
    AuthenticationService.prototype.login = function (public_key) {
        this.authenticated = false;
        console.log('Attempting login with public key ' + public_key);
        // Import convergence.json file stored at the public key location
        // Populate the application configuration using
        // Login fails if a convergence.json file can't be pulled from IPFS.
        // Pull content down from IPFS hash supplied
        // Decrypt using private key
        // Populate application
    };
    AuthenticationService.prototype.newProfile = function (public_key) {
        // Generate a brand new convergence.json file
        var Convergence = {
            "public_key": "",
        }.toString();
        localStorage.setItem('Convergence', Convergence);
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('Convergence');
    };
    AuthenticationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], AuthenticationService);
    return AuthenticationService;
    var _a;
}());

//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.uploadedFiles = localStorage.getItem('uploadedFiles') ? JSON.parse(localStorage.getItem('uploadedFiles')) : [];
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            // tslint:disable-next-line
            selector: 'body',
            template: '<router-outlet></router-outlet>'
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_tabs__ = __webpack_require__("../../../../ngx-bootstrap/tabs/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_nav_dropdown_directive__ = __webpack_require__("../../../../../src/app/shared/nav-dropdown.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_sidebar_directive__ = __webpack_require__("../../../../../src/app/shared/sidebar.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_aside_directive__ = __webpack_require__("../../../../../src/app/shared/aside.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_breadcrumb_component__ = __webpack_require__("../../../../../src/app/shared/breadcrumb.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__dashboard_files_files_component__ = __webpack_require__("../../../../../src/app/dashboard/files/files.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__dashboard_video_video_component__ = __webpack_require__("../../../../../src/app/dashboard/video/video.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__dashboard_settings_settings_component__ = __webpack_require__("../../../../../src/app/dashboard/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__dashboard_wallet_wallet_component__ = __webpack_require__("../../../../../src/app/dashboard/wallet/wallet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dashboard_chat_chat_component__ = __webpack_require__("../../../../../src/app/dashboard/chat/chat.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__dashboard_camera_camera_component__ = __webpack_require__("../../../../../src/app/dashboard/camera/camera.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__dashboard_music_music_component__ = __webpack_require__("../../../../../src/app/dashboard/music/music.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__dashboard_calls_calls_component__ = __webpack_require__("../../../../../src/app/dashboard/calls/calls.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__dashboard_contacts_contacts_component__ = __webpack_require__("../../../../../src/app/dashboard/contacts/contacts.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__dashboard_torrents_torrents_component__ = __webpack_require__("../../../../../src/app/dashboard/torrents/torrents.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__guards_auth_guard__ = __webpack_require__("../../../../../src/app/_guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_authentication_service__ = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__helpers_fake_backend__ = __webpack_require__("../../../../../src/app/_helpers/fake-backend.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_http_testing__ = __webpack_require__("../../../http/esm5/testing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__dashboard_files_ipfs_file_explorer_transfer_transfer_component__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/transfer/transfer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_app_dashboard_files_ipfs_file_explorer_input_input_component__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/input/input.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__dashboard_files_ipfs_file_explorer_home_home_component__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_app_dashboard_files_ipfs_file_explorer_test_test_component__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/test/test.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__dashboard_files_ipfs_file_explorer_header_header_component__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__dashboard_files_ipfs_file_explorer_account_account_component__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__dashboard_files_ipfs_file_explorer_ipfs_service__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/ipfs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__dashboard_photos_photos_component__ = __webpack_require__("../../../../../src/app/dashboard/photos/photos.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__dashboard_storage_storage_component__ = __webpack_require__("../../../../../src/app/dashboard/storage/storage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__dashboard_sidebar_sidebar_component__ = __webpack_require__("../../../../../src/app/dashboard/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__dashboard_vr_vr_component__ = __webpack_require__("../../../../../src/app/dashboard/vr/vr.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__dashboard_network_network_component__ = __webpack_require__("../../../../../src/app/dashboard/network/network.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_angular2_websocket_service__ = __webpack_require__("../../../../angular2-websocket-service/lib/index.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_angular2_websocket_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_43_angular2_websocket_service__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__convergence_service__ = __webpack_require__("../../../../../src/app/convergence.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__dashboard_login_login_component__ = __webpack_require__("../../../../../src/app/dashboard/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










// Routing Module

// Layouts




































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_27__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_27__angular_forms__["h" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_10__app_routing__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_tabs__["a" /* TabsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_26__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_46__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser_animations__["b" /* NoopAnimationsModule */],
                [__WEBPACK_IMPORTED_MODULE_27__angular_forms__["c" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_27__angular_forms__["h" /* ReactiveFormsModule */]],
                [__WEBPACK_IMPORTED_MODULE_30__angular_material__["a" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_30__angular_material__["b" /* MatCheckboxModule */], __WEBPACK_IMPORTED_MODULE_30__angular_material__["c" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_30__angular_material__["d" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_30__angular_material__["e" /* MatProgressBarModule */]],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_29__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_41__dashboard_vr_vr_component__["a" /* VrComponent */],
                __WEBPACK_IMPORTED_MODULE_42__dashboard_network_network_component__["a" /* NetworkComponent */],
                __WEBPACK_IMPORTED_MODULE_40__dashboard_sidebar_sidebar_component__["a" /* SidebarComponent */],
                __WEBPACK_IMPORTED_MODULE_39__dashboard_storage_storage_component__["a" /* StorageComponent */],
                __WEBPACK_IMPORTED_MODULE_38__dashboard_photos_photos_component__["a" /* PhotosComponent */],
                __WEBPACK_IMPORTED_MODULE_31__dashboard_files_ipfs_file_explorer_transfer_transfer_component__["a" /* TransferComponent */],
                __WEBPACK_IMPORTED_MODULE_32_app_dashboard_files_ipfs_file_explorer_input_input_component__["a" /* InputComponent */],
                __WEBPACK_IMPORTED_MODULE_34_app_dashboard_files_ipfs_file_explorer_test_test_component__["a" /* TestComponent */],
                __WEBPACK_IMPORTED_MODULE_36__dashboard_files_ipfs_file_explorer_account_account_component__["a" /* AccountComponent */],
                __WEBPACK_IMPORTED_MODULE_35__dashboard_files_ipfs_file_explorer_header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_33__dashboard_files_ipfs_file_explorer_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_5__shared_nav_dropdown_directive__["a" /* NAV_DROPDOWN_DIRECTIVES */],
                __WEBPACK_IMPORTED_MODULE_9__shared_breadcrumb_component__["a" /* BreadcrumbsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__shared_sidebar_directive__["a" /* SIDEBAR_TOGGLE_DIRECTIVES */],
                __WEBPACK_IMPORTED_MODULE_8__shared_aside_directive__["a" /* AsideToggleDirective */],
                __WEBPACK_IMPORTED_MODULE_21__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_12__dashboard_video_video_component__["a" /* VideoComponent */],
                __WEBPACK_IMPORTED_MODULE_13__dashboard_settings_settings_component__["a" /* SettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_14__dashboard_wallet_wallet_component__["a" /* WalletComponent */],
                __WEBPACK_IMPORTED_MODULE_15__dashboard_chat_chat_component__["a" /* ChatComponent */],
                __WEBPACK_IMPORTED_MODULE_16__dashboard_camera_camera_component__["a" /* CameraComponent */],
                __WEBPACK_IMPORTED_MODULE_17__dashboard_music_music_component__["a" /* MusicComponent */],
                __WEBPACK_IMPORTED_MODULE_18__dashboard_calls_calls_component__["a" /* CallsComponent */],
                __WEBPACK_IMPORTED_MODULE_19__dashboard_contacts_contacts_component__["a" /* ContactsComponent */],
                __WEBPACK_IMPORTED_MODULE_20__dashboard_torrents_torrents_component__["a" /* TorrentsComponent */],
                __WEBPACK_IMPORTED_MODULE_11__dashboard_files_files_component__["a" /* FilesComponent */],
                __WEBPACK_IMPORTED_MODULE_45__dashboard_login_login_component__["a" /* LoginComponent */]
            ],
            providers: [{
                    provide: __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* LocationStrategy */],
                    useClass: __WEBPACK_IMPORTED_MODULE_2__angular_common__["d" /* HashLocationStrategy */]
                },
                // Convergence Providers
                __WEBPACK_IMPORTED_MODULE_22__guards_auth_guard__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_23__services_authentication_service__["a" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_37__dashboard_files_ipfs_file_explorer_ipfs_service__["a" /* IpfsService */],
                __WEBPACK_IMPORTED_MODULE_24__helpers_fake_backend__["a" /* fakeBackendProvider */],
                __WEBPACK_IMPORTED_MODULE_25__angular_http_testing__["a" /* MockBackend */],
                __WEBPACK_IMPORTED_MODULE_26__angular_http__["a" /* BaseRequestOptions */],
                __WEBPACK_IMPORTED_MODULE_43_angular2_websocket_service__["WebSocketService"],
                __WEBPACK_IMPORTED_MODULE_44__convergence_service__["a" /* ConvergenceService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_29__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_camera_camera_component__ = __webpack_require__("../../../../../src/app/dashboard/camera/camera.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_chat_chat_component__ = __webpack_require__("../../../../../src/app/dashboard/chat/chat.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_contacts_contacts_component__ = __webpack_require__("../../../../../src/app/dashboard/contacts/contacts.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dashboard_music_music_component__ = __webpack_require__("../../../../../src/app/dashboard/music/music.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dashboard_settings_settings_component__ = __webpack_require__("../../../../../src/app/dashboard/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dashboard_torrents_torrents_component__ = __webpack_require__("../../../../../src/app/dashboard/torrents/torrents.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dashboard_video_video_component__ = __webpack_require__("../../../../../src/app/dashboard/video/video.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dashboard_wallet_wallet_component__ = __webpack_require__("../../../../../src/app/dashboard/wallet/wallet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dashboard_photos_photos_component__ = __webpack_require__("../../../../../src/app/dashboard/photos/photos.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__dashboard_storage_storage_component__ = __webpack_require__("../../../../../src/app/dashboard/storage/storage.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__dashboard_files_ipfs_file_explorer_home_home_component__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__dashboard_vr_vr_component__ = __webpack_require__("../../../../../src/app/dashboard/vr/vr.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__dashboard_network_network_component__ = __webpack_require__("../../../../../src/app/dashboard/network/network.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dashboard_login_login_component__ = __webpack_require__("../../../../../src/app/dashboard/login/login.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
///<reference path="dashboard/vr/vr.component.ts"/>
















var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_15__dashboard_login_login_component__["a" /* LoginComponent */],
        data: {
            title: 'BitStream'
        }
    },
    {
        path: 'files',
        component: __WEBPACK_IMPORTED_MODULE_12__dashboard_files_ipfs_file_explorer_home_home_component__["a" /* HomeComponent */],
        data: {
            title: 'Files'
        }
    },
    {
        path: 'network',
        component: __WEBPACK_IMPORTED_MODULE_14__dashboard_network_network_component__["a" /* NetworkComponent */],
        data: {
            title: 'Networking'
        }
    },
    {
        path: 'photos',
        component: __WEBPACK_IMPORTED_MODULE_10__dashboard_photos_photos_component__["a" /* PhotosComponent */],
        data: {
            title: 'Photos'
        }
    },
    {
        path: 'storage',
        component: __WEBPACK_IMPORTED_MODULE_11__dashboard_storage_storage_component__["a" /* StorageComponent */],
        data: {
            title: 'Downloads'
        }
    },
    {
        path: 'calls',
        component: __WEBPACK_IMPORTED_MODULE_3__dashboard_chat_chat_component__["a" /* ChatComponent */],
        data: {
            title: 'Files'
        }
    },
    {
        path: 'camera',
        component: __WEBPACK_IMPORTED_MODULE_2__dashboard_camera_camera_component__["a" /* CameraComponent */],
        data: {
            title: 'Camera'
        }
    },
    {
        path: 'chat',
        component: __WEBPACK_IMPORTED_MODULE_3__dashboard_chat_chat_component__["a" /* ChatComponent */],
        data: {
            title: 'Chat'
        }
    },
    {
        path: 'contacts',
        component: __WEBPACK_IMPORTED_MODULE_4__dashboard_contacts_contacts_component__["a" /* ContactsComponent */],
        data: {
            title: 'Contacts'
        }
    },
    {
        path: 'vr',
        component: __WEBPACK_IMPORTED_MODULE_13__dashboard_vr_vr_component__["a" /* VrComponent */],
        data: {
            title: 'VR'
        }
    },
    {
        path: 'music',
        component: __WEBPACK_IMPORTED_MODULE_5__dashboard_music_music_component__["a" /* MusicComponent */],
        data: {
            title: 'Music'
        }
    },
    {
        path: 'settings',
        component: __WEBPACK_IMPORTED_MODULE_6__dashboard_settings_settings_component__["a" /* SettingsComponent */],
        data: {
            title: 'Files'
        }
    }, {
        path: 'torrents',
        component: __WEBPACK_IMPORTED_MODULE_7__dashboard_torrents_torrents_component__["a" /* TorrentsComponent */],
        data: {
            title: 'Files'
        }
    }, {
        path: 'video',
        component: __WEBPACK_IMPORTED_MODULE_8__dashboard_video_video_component__["a" /* VideoComponent */],
        data: {
            title: 'Files'
        }
    }, {
        path: 'wallet',
        component: __WEBPACK_IMPORTED_MODULE_9__dashboard_wallet_wallet_component__["a" /* WalletComponent */],
        data: {
            title: 'Token Wallet'
        }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());

//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/app/convergence.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConvergenceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ConvergenceService = /** @class */ (function () {
    function ConvergenceService() {
    }
    ConvergenceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ConvergenceService);
    return ConvergenceService;
}());

//# sourceMappingURL=convergence.service.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/calls/calls.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>&#9776;</button>\n  <ul class=\"nav navbar-nav mr-auto d-md-down-none\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler\" href=\"#\" appSidebarToggler>&#9776;</a>\n    </li>\n  </ul>\n</header>\n\n<ol class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n  <li class=\"breadcrumb-item active\"><a href=\"#\">Chat</a></li>\n</ol>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <app-sidebar></app-sidebar>\n  </div>\n\n  <main class=\"card\" style=\"width: 100%\">\n\n    <div class=\"container\">\n\n      Chat\n\n    </div>\n\n  </main>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/calls/calls.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/calls/calls.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CallsComponent = /** @class */ (function () {
    function CallsComponent() {
    }
    CallsComponent.prototype.ngOnInit = function () {
    };
    CallsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-calls',
            template: __webpack_require__("../../../../../src/app/dashboard/calls/calls.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/calls/calls.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CallsComponent);
    return CallsComponent;
}());

//# sourceMappingURL=calls.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/camera/camera.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <nav class=\"sidebar-nav\">\n      <ul class=\"nav\">\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\">\n            <i class=\"icon-layers\"></i> Dashboard\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/files']\">\n            <i class=\"icon-briefcase\"></i> Recent Files\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/contacts']\">\n            <i class=\"icon-people\"></i> Contacts\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/music']\">\n            <i class=\"icon-music-tone\"></i> Music\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/video']\">\n            <i class=\"icon-film\"></i> Video\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/camera']\">\n            <i class=\"icon-camera\"></i> Camera\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/chat']\">\n            <i class=\"icon-speech\"></i> Chat\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/wallet']\">\n            <i class=\"icon-wallet\"></i> Wallet (Top up)\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/settings']\">\n            <i class=\"icon-settings\"></i> Settings\n          </a>\n        </li>\n      </ul>\n    </nav>\n  </div>\n\n  <main class=\"\">\n    <div class=\"animated fadeIn\" style=\"background-image: url('assets/img/background.jpeg'); background-repeat: no-repeat; min-height: 1000px; max-width: 100%; background-size: cover;\">\n\n      <video autoplay></video>\n\n      <script>\n        var errorCallback = function(e) {\n          console.log('Reeeejected!', e);\n        };\n\n        // Not showing vendor prefixes.\n        navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {\n          var video = document.querySelector('video');\n          video.src = window.URL.createObjectURL(localMediaStream);\n\n          // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.\n          // See crbug.com/110938.\n          video.onloadedmetadata = function(e) {\n            // Ready to go. Do some stuff.\n          };\n        }, errorCallback);\n      </script>\n\n\n    </div>\n  </main>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/camera/camera.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/camera/camera.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CameraComponent = /** @class */ (function () {
    function CameraComponent() {
    }
    CameraComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-camera',
            template: __webpack_require__("../../../../../src/app/dashboard/camera/camera.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/camera/camera.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CameraComponent);
    return CameraComponent;
}());

//# sourceMappingURL=camera.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/chat/chat.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>&#9776;</button>\n  <ul class=\"nav navbar-nav mr-auto d-md-down-none\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler\" href=\"#\" appSidebarToggler>&#9776;</a>\n    </li>\n  </ul>\n</header>\n\n<ol class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n  <li class=\"breadcrumb-item active\"><a href=\"#\">Chat</a></li>\n</ol>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <app-sidebar></app-sidebar>\n  </div>\n\n  <main class=\"card\" style=\"width: 100%; padding-top: 40px;\">\n\n    <div class=\"container\">\n\n      <div class=\"row\">\n\n        <div class=\"col-sm-12\">\n          <h2>Create a room</h2>\n          <input [(ngModel)]=\"peerId\" #ctrl=\"ngModel\" type=\"text\" class=\"form-control\" placeholder=\"Your custom room name\">\n        </div>\n        <div class=\"col-sm-12\" *ngIf=\"peerId\">\n          <p>Your room ID for this session: {{peerId}} - share this with anyone who wants to join</p>\n        </div>\n        <div class=\"col-sm-12\">\n          <button (click)=\"createRoom()\">Create a room</button>\n        </div>\n        <div class=\"col-sm-12\">\n          <p>or...\n          </p>\n          <h2>Connect to existing room</h2>\n          <input [(ngModel)]=\"remotePeerId\" #ctrl=\"ngModel\" type=\"text\" class=\"form-control\" placeholder=\"Existing room name\">\n          <button (click)=\"connectToRoom()\">Connect to room</button>\n        </div>\n      </div>\n\n    </div>\n\n  </main>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/chat/chat.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/chat/chat.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_peerjs__ = __webpack_require__("../../../../peerjs/lib/peer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_peerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_peerjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChatComponent = /** @class */ (function () {
    function ChatComponent() {
    }
    ChatComponent.prototype.createRoom = function () {
        this.peer = new __WEBPACK_IMPORTED_MODULE_1_peerjs__(this.peerId, { key: 'wtbo9z9g1l1ve7b9' });
        this.peer.on('connection', function (conn) {
            conn.on('data', function (data) {
                // Will print 'hi!'
                console.log(data);
            });
        });
        console.log("Room created with peer ID: " + this.peerId);
    };
    ChatComponent.prototype.connectToRoom = function () {
        this.peer = new __WEBPACK_IMPORTED_MODULE_1_peerjs__({ key: 'wtbo9z9g1l1ve7b9' });
        this.conn = this.peer.connect(this.remotePeerId);
        this.conn.on('open', function () {
            this.conn.send('hi!');
        });
        console.log("Connected to peer ID: " + this.remotePeerId);
    };
    ChatComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-chat',
            template: __webpack_require__("../../../../../src/app/dashboard/chat/chat.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/chat/chat.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ChatComponent);
    return ChatComponent;
}());

//# sourceMappingURL=chat.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/contacts/contacts.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>&#9776;</button>\n  <ul class=\"nav navbar-nav mr-auto d-md-down-none\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler\" href=\"#\" appSidebarToggler>&#9776;</a>\n    </li>\n  </ul>\n</header>\n\n<ol class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n  <li class=\"breadcrumb-item active\"><a href=\"#\">Contacts</a></li>\n</ol>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <app-sidebar></app-sidebar>\n  </div>\n\n  <main class=\"card\" style=\"width: 100%\">\n\n    <div class=\"container\">\n\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <ul class=\"list-group\" id=\"contact-list\">\n            <li class=\"list-group-item\">\n              <div class=\"col-xs-12 col-sm-3\">\n                <img src=\"http://api.randomuser.me/portraits/men/97.jpg\" alt=\"Seth Frazier\" class=\"img-responsive img-circle\" />\n              </div>\n              <div class=\"col-xs-12 col-sm-9\">\n                <span class=\"name\">Seth Frazier</span><br/>\n                <span class=\"glyphicon glyphicon-map-marker text-muted c-info\" data-toggle=\"tooltip\" title=\"7396 E North St\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">7396 E North St</span><br/></span>\n                <span class=\"glyphicon glyphicon-earphone text-muted c-info\" data-toggle=\"tooltip\" title=\"(560) 180-4143\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">(560) 180-4143</span><br/></span>\n                <span class=\"fa fa-comments text-muted c-info\" data-toggle=\"tooltip\" title=\"seth.frazier@example.com\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">seth.frazier@example.com</span><br/></span>\n              </div>\n              <div class=\"clearfix\"></div>\n            </li>\n            <li class=\"list-group-item\">\n              <div class=\"col-xs-12 col-sm-3\">\n                <img src=\"http://api.randomuser.me/portraits/women/90.jpg\" alt=\"Jean Myers\" class=\"img-responsive img-circle\" />\n              </div>\n              <div class=\"col-xs-12 col-sm-9\">\n                <span class=\"name\">Jean Myers</span><br/>\n                <span class=\"glyphicon glyphicon-map-marker text-muted c-info\" data-toggle=\"tooltip\" title=\"4949 W Dallas St\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">4949 W Dallas St</span><br/></span>\n                <span class=\"glyphicon glyphicon-earphone text-muted c-info\" data-toggle=\"tooltip\" title=\"(477) 792-2822\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">(477) 792-2822</span><br/></span>\n                <span class=\"fa fa-comments text-muted c-info\" data-toggle=\"tooltip\" title=\"jean.myers@example.com\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">jean.myers@example.com</span><br/></span>\n              </div>\n              <div class=\"clearfix\"></div>\n            </li>\n            <li class=\"list-group-item\">\n              <div class=\"col-xs-12 col-sm-3\">\n                <img src=\"http://api.randomuser.me/portraits/men/24.jpg\" alt=\"Todd Shelton\" class=\"img-responsive img-circle\" />\n              </div>\n              <div class=\"col-xs-12 col-sm-9\">\n                <span class=\"name\">Todd Shelton</span><br/>\n                <span class=\"glyphicon glyphicon-map-marker text-muted c-info\" data-toggle=\"tooltip\" title=\"5133 Pecan Acres Ln\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">5133 Pecan Acres Ln</span><br/></span>\n                <span class=\"glyphicon glyphicon-earphone text-muted c-info\" data-toggle=\"tooltip\" title=\"(522) 991-3367\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">(522) 991-3367</span><br/></span>\n                <span class=\"fa fa-comments text-muted c-info\" data-toggle=\"tooltip\" title=\"todd.shelton@example.com\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">todd.shelton@example.com</span><br/></span>\n              </div>\n              <div class=\"clearfix\"></div>\n            </li>\n            <li class=\"list-group-item\">\n              <div class=\"col-xs-12 col-sm-3\">\n                <img src=\"http://api.randomuser.me/portraits/women/34.jpg\" alt=\"Rosemary Porter\" class=\"img-responsive img-circle\" />\n              </div>\n              <div class=\"col-xs-12 col-sm-9\">\n                <span class=\"name\">Rosemary Porter</span><br/>\n                <span class=\"glyphicon glyphicon-map-marker text-muted c-info\" data-toggle=\"tooltip\" title=\"5267 Cackson St\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">5267 Cackson St</span><br/></span>\n                <span class=\"glyphicon glyphicon-earphone text-muted c-info\" data-toggle=\"tooltip\" title=\"(497) 160-9776\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">(497) 160-9776</span><br/></span>\n                <span class=\"fa fa-comments text-muted c-info\" data-toggle=\"tooltip\" title=\"rosemary.porter@example.com\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">rosemary.porter@example.com</span><br/></span>\n              </div>\n              <div class=\"clearfix\"></div>\n            </li>\n            <li class=\"list-group-item\">\n              <div class=\"col-xs-12 col-sm-3\">\n                <img src=\"http://api.randomuser.me/portraits/women/56.jpg\" alt=\"Debbie Schmidt\" class=\"img-responsive img-circle\" />\n              </div>\n              <div class=\"col-xs-12 col-sm-9\">\n                <span class=\"name\">Debbie Schmidt</span><br/>\n                <span class=\"glyphicon glyphicon-map-marker text-muted c-info\" data-toggle=\"tooltip\" title=\"3903 W Alexander Rd\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">3903 W Alexander Rd</span><br/></span>\n                <span class=\"glyphicon glyphicon-earphone text-muted c-info\" data-toggle=\"tooltip\" title=\"(867) 322-1852\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">(867) 322-1852</span><br/></span>\n                <span class=\"fa fa-comments text-muted c-info\" data-toggle=\"tooltip\" title=\"debbie.schmidt@example.com\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">debbie.schmidt@example.com</span><br/></span>\n              </div>\n              <div class=\"clearfix\"></div>\n            </li>\n            <li class=\"list-group-item\">\n              <div class=\"col-xs-12 col-sm-3\">\n                <img src=\"http://api.randomuser.me/portraits/women/76.jpg\" alt=\"Glenda Patterson\" class=\"img-responsive img-circle\" />\n              </div>\n              <div class=\"col-xs-12 col-sm-9\">\n                <span class=\"name\">Glenda Patterson</span><br/>\n                <span class=\"glyphicon glyphicon-map-marker text-muted c-info\" data-toggle=\"tooltip\" title=\"5020 Poplar Dr\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">5020 Poplar Dr</span><br/></span>\n                <span class=\"glyphicon glyphicon-earphone text-muted c-info\" data-toggle=\"tooltip\" title=\"(538) 718-7548\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">(538) 718-7548</span><br/></span>\n                <span class=\"fa fa-comments text-muted c-info\" data-toggle=\"tooltip\" title=\"glenda.patterson@example.com\"></span>\n                <span class=\"visible-xs\"> <span class=\"text-muted\">glenda.patterson@example.com</span><br/></span>\n              </div>\n              <div class=\"clearfix\"></div>\n            </li>\n          </ul>\n        </div>\n      </div>\n\n    </div>\n\n  </main>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/contacts/contacts.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#contact-list {\n  margin-top: 35px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/contacts/contacts.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ContactsComponent = /** @class */ (function () {
    function ContactsComponent() {
    }
    ContactsComponent.prototype.ngOnInit = function () {
    };
    ContactsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-contacts',
            template: __webpack_require__("../../../../../src/app/dashboard/contacts/contacts.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/contacts/contacts.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ContactsComponent);
    return ContactsComponent;
}());

//# sourceMappingURL=contacts.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <nav class=\"sidebar-nav\">\n      <ul class=\"nav\">\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\">\n            <i class=\"icon-layers\"></i> Dashboard\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/files']\">\n            <i class=\"icon-briefcase\"></i> Recent Files\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/contacts']\">\n            <i class=\"icon-people\"></i> Contacts\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/calls']\">\n            <i class=\"icon-call-in\"></i> Calls\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/music']\">\n            <i class=\"icon-music-tone\"></i> Music\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/video']\">\n            <i class=\"icon-film\"></i> Video\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/camera']\">\n            <i class=\"icon-camera\"></i> Camera\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/chat']\">\n            <i class=\"icon-speech\"></i> Chat\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/wallet']\">\n            <i class=\"icon-wallet\"></i> Wallet (Top up)\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/settings']\">\n            <i class=\"icon-settings\"></i> Settings\n          </a>\n        </li>\n      </ul>\n    </nav>\n  </div>\n\n  <main class=\"\">\n    <div class=\"animated fadeIn\" style=\"background-image: url('assets/img/background.jpeg'); background-repeat: no-repeat; min-height: 1000px; max-width: 100%; background-size: cover;\">\n\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-sm-4\">\n\n            <img src=\"https://cdn0.tnwcdn.com/wp-content/themes/cyberdelia/assets/img/icon-facebook.svg\" alt=\"\">\n            <div>App Name</div>\n\n\n          </div>\n          <div class=\"col-sm-4\">\n            <img src=\"https://cdn0.tnwcdn.com/wp-content/themes/cyberdelia/assets/img/icon-facebook.svg\" alt=\"\">\n            <div>App Name</div>\n          </div>\n          <div class=\"col-sm-4\">\n            <img src=\"https://cdn0.tnwcdn.com/wp-content/themes/cyberdelia/assets/img/icon-facebook.svg\" alt=\"\">\n            <div>App Name</div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-sm-4\"></div>\n          <div class=\"col-sm-4\"></div>\n          <div class=\"col-sm-4\"></div>\n        </div>\n      </div>\n\n\n    </div>\n  </main>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = /** @class */ (function () {
    function DashboardComponent() {
        this.users = [];
    }
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/files/files.component.html":
/***/ (function(module, exports) {

module.exports = "<ipfs-home></ipfs-home>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/files/files.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".topHolder {\n  padding: 80px; }\n\nmain {\n  width: 100%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/files/files.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FilesComponent = /** @class */ (function () {
    function FilesComponent() {
        this.convergence = {
            "files": [
                {
                    "name": "London Timelapses",
                    "pinned": "2017-11-12 12:34 GMT",
                    "extension": "mp4",
                    "url": "https://ipfs.io/ipfs/QmS8dtyZwNCj9rMkDy7EP2ZTdPAKhuvPtz6xZA46E2xydt"
                },
                {
                    "name": "London Timelapses 2",
                    "pinned": "2017-11-12 12:34 GMT",
                    "extension": "mp4",
                    "url": "https://ipfs.io/ipfs/QmS8dtyZwNCj9rMkDy7EP2ZTdPAKhuvPtz6xZA46E2xydt"
                }
            ],
        };
    }
    FilesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-files',
            template: __webpack_require__("../../../../../src/app/dashboard/files/files.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/files/files.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FilesComponent);
    return FilesComponent;
}());

//# sourceMappingURL=files.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/account/account.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".account {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n\n  width: 50vw;\n  max-width: 500px;\n  height: 70vh;\n  border-radius: 5px;\n  margin: 10px;\n  border: 3px solid #ff4081;\n}\n\n.username{\n  color: grey;\n  font-weight: bold;\n  /*background-color: #0099cc;*/\n  border-left: 1px solid grey;\n  height: 100%;\n  /*border-radius: 15px;*/\n  font-family: Helvetica;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n#greet {\n  font-weight: lighter;\n  color: accent;\n  margin: 2px;\n}\n#text {\n\n  margin-left: 10px;\n}\n.navbar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background-color: #f0eeec;\n  height: 6%;\n  width: 100%;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  box-shadow:0px 1px 1px grey;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.files {\n\n}\nbutton {\n  /*width: %;*/\n  height: 60%;\n  /*margin-right: 2px;*/\n  border-radius: 5px;\n  /*margin: 5px;*/\n  color: white;\n  background-color: #ff4081;\n  border: none;\n    /*background-color: #f0eeec; */\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/account/account.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"account\">\n  <div class=\"navbar\">\n\n    <div class=\"files\">\n      <button (click)=\"onFiles()\">Recent Files</button>\n    </div>\n    <div class=\"contacts\">\n      <button (click)=\"onContacts()\">Contacts</button>\n    </div>\n    <div class=\"username\">\n      <div id=\"greet\">\n        hello, <br />\n      </div>\n      <div id=\"text\">\n        {{this.user.split('@')[0]}}\n      </div>\n    </div>\n  </div>\n  <div *ngIf=\"this.filePage === true\" >\n    <div *ngFor=\"let file of this.files\">\n\n      {{file}}\n\n    </div>\n    accounts works!\n  </div>\n  <div *ngIf=\"this.contactsPage === true\">\n\n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/account/account.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccountComponent = /** @class */ (function () {
    function AccountComponent() {
        this.user = 'eddyfredyreding@gmail.com';
        this.files = ['https://ipfs.io/ipfs/Qmd1UhG3GaAo1apjm6dHXzsMkwsAMjHqYfoViyrPuQeJSq', 'https://ipfs.io/ipfs/QmUPsPmpf96fNyoTB5mfQxRN6eS9tXn12VtxdQBs1QuYGx'];
        this.filePage = true;
        this.contactsPage = false;
    }
    AccountComponent.prototype.onFiles = function () {
        this.filePage = true;
        this.contactsPage = false;
    };
    AccountComponent.prototype.onContacts = function () {
        this.filePage = false;
        this.contactsPage = true;
    };
    AccountComponent.prototype.ngOnInit = function () {
    };
    AccountComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-account',
            template: __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/account/account.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/account/account.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AccountComponent);
    return AccountComponent;
}());

//# sourceMappingURL=account.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/email.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EmailService = /** @class */ (function () {
    function EmailService(http) {
        this.http = http;
        this.http = http;
    }
    EmailService.prototype.sendEmail = function (to, from, hashes) {
        return this.http.post('https://mighty-headland-68035.herokuapp.com/createEmail', { to: to, from: from, hashes: hashes })
            .map(function (res) { return res.json(); });
    };
    EmailService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], EmailService);
    return EmailService;
    var _a;
}());

//# sourceMappingURL=email.service.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/header/header.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h1, h2, h3 {\n  margin-left: 20px;\n  font-family: 'Roboto',sans-serif;\n}\n\nh1 {\n  font-weight: 900;\n  font-size: 3.5rem;\n}\n\nh1:focus {\n  outline: -webkit-focus-ring-color auto 0px;\n  outline-color: -webkit-focus-ring-color;\n  outline-style: auto;\n  outline-width: 0px;\n}\n\n\n\n.logo {\n  margin-bottom: -10px;\n  position: relative;\n  -ms-flex-line-pack: center;\n      align-content: center;\n  margin-left: 30px;\n  -webkit-filter: drop-shadow(0 0 300px white);\n          filter: drop-shadow(0 0 300px white);\n  /*background-color: white;*/\n}\n\n\nh3 {\n  margin-left: 45px;\n  font-size: 1.6rem;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "\n<header class=\"content-header\">\n    <nav class=\"navbar navbar-static-top\">\n      <div class=\"container\">\n        <h1 class=\"logo\" [routerLink]=\"['/']\"><img src=\"https://ipfs.io/ipfs/QmWUnikBm1sADXghU16YxSZKWXKizyf471v2vhzmAiY57a\" height=\"60\" width=\"95\"></h1>\n        <!-- <h3 style=\"color: #0099cc\">\n              The WeTranser Alternative.\n        </h3> -->\n      </div>\n    </nav>\n </header>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());

//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "main {\n  width: 100%;\n}\n\n.icon-briefcase {\n  margin-right: 12px;\n}\n\n.sidebar {\n  position: relative !important;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<app-transfer></app-transfer>\n\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ipfs-home',
            template: __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/input/input.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".fa {\n  font-size: 50px;\n  padding-top: 45px;\n  float: left;\n  width: 100%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/input/input.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>&#9776;</button>\n  <ul class=\"nav navbar-nav mr-auto d-md-down-none\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler\" href=\"#\" appSidebarToggler>&#9776;</a>\n    </li>\n  </ul>\n</header>\n\n<ol class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n  <li class=\"breadcrumb-item active\"><a href=\"#\">IPFS</a></li>\n</ol>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <app-sidebar active=\"files\"></app-sidebar>\n  </div>\n\n  <main style=\"width: 100%\">\n    <div class=\"card\" *ngIf=\"form\">\n      <div class=\"container\">\n        <div class=\"row\">\n          <div class=\"col-sm-12\">\n            <label for=\"file-input\" (click)=\"upload($event)\">\n              <i class=\"fa fa-cloud fa-sm\"></i>Click here to upload a file to IPFS.<br/><br/>\n            </label>\n            <input style=\"display: none\" #file id=\"file-input\" type=\"file\" (change)=\"upload($event)\"/>\n            <hr/>\n          </div>\n          <div class=\"col-sm-12\">\n            <!-- Displays progress of file upload-->\n            <div class=\"progressBarTitle\" *ngIf=\"!progress && showUpdate\" style=\"text-align: center;\">\n              <div>Your browser is preparing the file for upload. Larger files take a long time, be patient :)</div>\n              <hr />\n            </div>\n            <div class=\"progressBar\" *ngIf=\"this.progress / this.parentSize *100\">\n              Upload progress: {{(this.progress / this.parentSize *100).toFixed(1)}} %\n              <hr />\n            </div>\n            <div *ngIf=\"!uploadedFiles || !uploadedFiles.length\">\n              You have not uploaded any files. Click the cloud to get started.\n              <hr/>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\" *ngFor=\"let file of uploadedFiles\">\n          <div class=\"col-sm-12 file-info\"><strong>{{file.name}}</strong></div>\n          <br/>\n          <div class=\"col-sm-12 file-info\">{{file.type}}</div>\n          <div class=\"col-sm-12 file-info\" style=\"float:left\">\n            <i class=\"fa fa-trash-o\" (click)=\"deleteFile(file)\"></i> Remove link from device\n          </div>\n          <div class=\"col-sm-12 file-info\">\n            <a href=\"https://ipfs.io/ipfs/{{file.url}}\" target=\"_blank\" style=\"color: black\"><i class=\"fa fa-link\" aria-hidden=\"true\"></i> IPFS Link</a>\n          </div>\n          <div class=\"col-sm-12\">\n            <hr/>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-sm-12\">\n            <div class=\"col-sm-12\">\n              <p>\n                IPFS is a versioned, peer-to-peer filesystem protocol that works by distributing content over a global network. It can be used to share files publicly, anonymously and without censorship.\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/input/input.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InputComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__email_service__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/email.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ipfs_service__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/ipfs.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InputComponent = /** @class */ (function () {
    function InputComponent(emailService, ipfsService) {
        var _this = this;
        this.emailService = emailService;
        this.ipfsService = ipfsService;
        this.upload = function ($event) {
            if (_this.file.length < 1) {
                _this.showUpdate = true;
                var file = $event.target.files[0];
                console.log('Selected file');
                console.log(file);
                console.log(_this.torrents);
                _this.name = file.name;
                _this.parentSize = file.size;
                _this.ipfsService.uploadIPFS(file)
                    .then(function (torrent) {
                    console.log(torrent.path);
                    _this.uploadedFiles.unshift({
                        "name": file.name,
                        "type": file.type,
                        "url": torrent.path
                    });
                    localStorage.setItem('uploadedFiles', JSON.stringify(_this.uploadedFiles));
                });
            }
            else {
                alert("Sorry, still uploading previous file!");
            }
        };
        this.data = {
            to: '',
            from: '',
            hashes: ''
        };
    }
    InputComponent.prototype.ngOnInit = function () {
        this.hashes = [];
        this.file = [];
        this.submit = false;
        this.submitResponse = false;
        this.form = true;
        this.progress = this.ipfsService.progress;
        this.showUpdate = false;
        this.uploadedFiles = localStorage.getItem('uploadedFiles') ? JSON.parse(localStorage.getItem('uploadedFiles')) : [];
        this.getTransfer();
    };
    ;
    InputComponent.prototype.getTransfer = function () {
        var _this = this;
        setInterval(function () { return _this.progress = _this.ipfsService.progress; }), 500;
    };
    InputComponent.prototype.refresh = function () {
        this.hashes = [];
        this.file = [];
        this.submit = false;
        this.submitResponse = false;
        this.form = true;
        this.data.to = '';
        this.data.from = '';
        this.showUpdate = false;
    };
    InputComponent.prototype.deleteFile = function (file) {
        var files = JSON.parse(localStorage.getItem('uploadedFiles'));
        var index = this.uploadedFiles.indexOf(file);
        if (files && index !== -1) {
            files.splice(index, 1);
            this.uploadedFiles.splice(index, 1);
        }
        else {
            alert("This file no longer exists");
        }
        localStorage.removeItem('uploadedFiles');
        this.uploadedFiles = files;
        localStorage.setItem('uploadedFiles', files.stringify());
    };
    InputComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-input',
            template: __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/input/input.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/input/input.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__email_service__["a" /* EmailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__email_service__["a" /* EmailService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ipfs_service__["a" /* IpfsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ipfs_service__["a" /* IpfsService */]) === "function" && _b || Object])
    ], InputComponent);
    return InputComponent;
    var _a, _b;
}());

//# sourceMappingURL=input.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/ipfs.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IpfsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webtorrent__ = __webpack_require__("../../../../webtorrent/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webtorrent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_webtorrent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_buffer__ = __webpack_require__("../../../../node-libs-browser/node_modules/buffer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ipfs__ = __webpack_require__("../../../../ipfs/src/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ipfs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ipfs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_stream_buffers__ = __webpack_require__("../../../../stream-buffers/lib/streambuffer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_stream_buffers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_stream_buffers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utilities_jsencrypt__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/utilities/jsencrypt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utilities_jsencrypt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__utilities_jsencrypt__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * https://www.youtube.com/watch?v=iywaBOMvYLI
 */
var IpfsService = /** @class */ (function () {
    function IpfsService(http) {
        var _this = this;
        this.createNewConvergence = function (private_key) {
            _this.encrypt.setPrivateKey(private_key);
            var convergence = {
                "schema": "convergence",
                "files": "<convergence_encrypted_directory_ipfs_hash>",
            };
            // Encrypt the data with the public key.
            _this.enc = _this.encrypt.encrypt(JSON.stringify(convergence));
            console.log('Performing encryption test in browser.');
            console.log(_this.enc);
            var data = new Blob([JSON.stringify(_this.enc)], { type: 'text/plain' });
            _this.uploadIPFS(data).then(function (response) {
                console.log(response);
                // this.dec = this.encrypt.decrypt(JSON.parse(data));
                // // Now a simple check to see if the round-trip worked.
                // if (this.dec) {
                //   alert('Encryption working properly in this browser. Creating convergence (encrypted merkel tree on IPFS)');
                //   console.log(this.dec);
                // } else {
                //   alert('Something went wrong with the encryption');
                // }
            });
            // Add a retrieve verifications
            // this.ipfs_node.files.add(this.enc, (ipfs_hash) => {
            // });
        };
        this.loadConvergenceFromIPFSHash = function (public_key_ipfs_path) {
            return _this.ipfs_node.cat(public_key_ipfs_path, function (encrypted) {
                // Now decrypt the crypted text with the private key.
                _this.dec = _this.encrypt.decrypt(encrypted);
                // Convert from string back to JSON
                var decrypted_convergence = JSON.parse(_this.dec);
                // Now a simple check to see if the round-trip worked.
                if (decrypted_convergence) {
                    alert('Encryption working properly in this browser. Creating convergence (encrypted merkel tree on IPFS)');
                    console.log(decrypted_convergence);
                }
                else {
                    alert('Something went wrong with the encryption');
                }
            });
        };
        this.uploadIPFS = function (fileObj) {
            console.log('----------');
            console.log(fileObj);
            console.log('----------');
            return new Promise(function (resolve, reject) {
                _this.client.seed(fileObj, function (torrent) {
                    torrent.files[0].getBuffer(function (err, buffer) {
                        _this.progress = 0;
                        var myReadableStreamBuffer = new __WEBPACK_IMPORTED_MODULE_5_stream_buffers___default.a.ReadableStreamBuffer({
                            chunkSize: 900000 //determines data transfer rate
                        });
                        _this.ipfs_node.files.createAddStream(function (err, stream) {
                            console.log('ERR', err);
                            console.log('STREAM', stream);
                            stream.on('data', function (file) {
                                console.log('FILE', file);
                                resolve(file);
                            });
                            console.log('WRITE');
                            myReadableStreamBuffer.on('data', function (chunk) {
                                _this.progress += chunk.byteLength;
                                console.log('Progress', _this.progress);
                                myReadableStreamBuffer.resume();
                            });
                            stream.write(myReadableStreamBuffer);
                            myReadableStreamBuffer.put(__WEBPACK_IMPORTED_MODULE_3_buffer__["Buffer"].from(buffer));
                            myReadableStreamBuffer.stop();
                            myReadableStreamBuffer.on('end', function () {
                                console.log('stream ended.');
                                stream.end();
                            });
                            myReadableStreamBuffer.resume();
                        });
                    });
                });
            });
        };
        this.http = http;
        this.client = new __WEBPACK_IMPORTED_MODULE_2_webtorrent___default.a();
        this.ipfs_node = new __WEBPACK_IMPORTED_MODULE_4_ipfs___default.a({
            repo: 'repo-' + Math.random(),
            init: true,
            // init: false,
            // init: {
            //   bits: 1024 // size of the RSA key generated
            // },
            start: true,
            // start: false,
            EXPERIMENTAL: {
                pubsub: true,
                sharding: true,
                dht: true // enable KadDHT, currently not interopable with go-ipfs
            },
            config: {
                Addresses: {
                    Swarm: [
                        '/ip4/127.0.0.1/tcp/5001'
                    ]
                }
            },
            libp2p: {
                modules: {}
            }
        });
        // Events
        this.ipfs_node.on('ready', function (status) {
            console.log(status);
        }); // Node is ready to use when you first create it
        this.ipfs_node.on('error', function (err) { }); // Node has hit some error while initing/starting
        this.ipfs_node.on('init', function () { }); // Node has successfully finished initing the repo
        this.ipfs_node.on('start', function () { }); // Node has started
        this.ipfs_node.on('stop', function () { }); // Node has stopped
        // // Our encryption library for storing all files ( Security layer )
        this.encrypt = new __WEBPACK_IMPORTED_MODULE_6__utilities_jsencrypt__["JSEncrypt"]();
    }
    IpfsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], IpfsService);
    return IpfsService;
    var _a;
}());

//# sourceMappingURL=ipfs.service.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/test/test.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/test/test.component.html":
/***/ (function(module, exports) {

module.exports = "<form action=\"https://www.paypal.com/cgi-bin/webscr\" method=\"post\">\n\n    <!-- Identify your business so that you can collect the payments. -->\n    <input type=\"hidden\" name=\"business\"\n        value=\"donations@kcparkfriends.org\">\n\n    <!-- Specify a Donate button. -->\n    <input type=\"hidden\" name=\"cmd\" value=\"_donations\">\n\n    <!-- Specify details about the contribution -->\n    <input type=\"hidden\" name=\"item_name\" value=\"Friends of the Park\">\n    <input type=\"hidden\" name=\"item_number\" value=\"Fall Cleanup Campaign\">\n    <input type=\"hidden\" name=\"currency_code\" value=\"USD\">\n\n    <!-- Display the payment button. -->\n    <input type=\"image\" name=\"submit\"\n    src=\"https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png\"\n    alt=\"Donate\">\n    <img alt=\"\" width=\"1\" height=\"1\"\n    src=\"https://www.paypalobjects.com/en_US/i/scr/pixel.gif\" >\n\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/test/test.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TestComponent = /** @class */ (function () {
    function TestComponent() {
    }
    TestComponent.prototype.ngOnInit = function () {
    };
    TestComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-test',
            template: __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/test/test.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/test/test.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TestComponent);
    return TestComponent;
}());

;
//# sourceMappingURL=test.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/transfer/transfer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n\n}\n\nlabel{\n  display: inline-block;\n}\n\nlabel button{\n  margin-top: 20px;\n  margin-left: 20px;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n}\n\n\ninput[type=\"file\"]{\n  position: absolute;\n  top: 5px;\n  left: 5px;\n  text-align: right;\n  outline: none;\n  cursor: inherit;\n}\n\n\n#text {\n  text-align: left;\n  vertical-align: middle;\n  font-size: 60px;\n}\n\n\n#file-input:hover {\n  -webkit-filter: drop-shadow(0 0 10px white);\n          filter: drop-shadow(0 0 10px white);\n}\n\n.form-input {\n  margin-left: 20px;\n  margin-top: 10px;\n}\n\n.center {\noverflow: auto;\nheight: 200px;\n\n}\n\n.send svg{\nposition: absolute;\nbottom: 0;\nleft: 40%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/transfer/transfer.component.html":
/***/ (function(module, exports) {

module.exports = "<app-input style=\"display: block;\n    text-align: center;\n    width: 100%;\"></app-input>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/transfer/transfer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ipfs_service__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/ipfs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__email_service__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/email.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TransferComponent = /** @class */ (function () {
    function TransferComponent(ipfsService, emailService) {
        var _this = this;
        this.ipfsService = ipfsService;
        this.emailService = emailService;
        this.upload = function ($event) {
            var file = $event.target.files[0];
            console.log('file: ', file);
            _this.name = file.name;
            _this.parentSize = file.size;
            _this.ipfsService.uploadIPFS(file)
                .then(function (torrent) {
                _this.hashes.push(torrent);
                console.log(_this.hashes);
            });
        };
    }
    TransferComponent.prototype.ngOnInit = function () {
        this.hashes = [];
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], TransferComponent.prototype, "parentSize", void 0);
    TransferComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-transfer',
            template: __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/transfer/transfer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/transfer/transfer.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_2__email_service__["a" /* EmailService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ipfs_service__["a" /* IpfsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ipfs_service__["a" /* IpfsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__email_service__["a" /* EmailService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__email_service__["a" /* EmailService */]) === "function" && _b || Object])
    ], TransferComponent);
    return TransferComponent;
    var _a, _b;
}());

//# sourceMappingURL=transfer.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/files/ipfs-file-explorer/utilities/jsencrypt.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! JSEncrypt v2.3.1 | https://npmcdn.com/jsencrypt@2.3.1/LICENSE.txt */
(function (root, factory) {
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // Node, CommonJS-like
    factory(module.exports);
  } else {
    factory(root);
  }
})(this, function (exports) {
  // Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Basic JavaScript BN library - subset useful for RSA encryption.

// Bits per digit
  var dbits;

// JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }

// return new, unset BigInteger
  function nbi() { return new BigInteger(null); }

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);

  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }

// (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }

// (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+this.DV;
    else this.t = 0;
  }

// return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

// (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

// (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }

// (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }

// (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

// (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }

// (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }

// returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }

// (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }

// (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }

// (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }

// (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }

// (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }

// (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }

// (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }

// (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }

// Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }

// Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }

// xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }

// x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

// x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }

// r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }

// (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }

// protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

// public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

// Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Extended JavaScript BN functions, required for RSA private ops.

// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix

// (public)
  function bnClone() { var r = nbi(); this.copyTo(r); return r; }

// (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }

// (public) return value as byte
  function bnByteValue() { return (this.t==0)?this.s:(this[0]<<24)>>24; }

// (public) return value as short (assumes DB>=16)
  function bnShortValue() { return (this.t==0)?this.s:(this[0]<<16)>>16; }

// (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

// (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }

// (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }

// (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

// (protected) alternate constructor
  function bnpFromNumber(a,b,c) {
    if("number" == typeof b) {
      // new BigInteger(int,int,RNG)
      if(a < 2) this.fromInt(1);
      else {
        this.fromNumber(a,c);
        if(!this.testBit(a-1))	// force MSB set
          this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
        if(this.isEven()) this.dAddOffset(1,0); // force odd
        while(!this.isProbablePrime(b)) {
          this.dAddOffset(2,0);
          if(this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a-1),this);
        }
      }
    }
    else {
      // new BigInteger(int,RNG)
      var x = new Array(), t = a&7;
      x.length = (a>>3)+1;
      b.nextBytes(x);
      if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
      this.fromString(x,256);
    }
  }

// (public) convert to bigendian byte array
  function bnToByteArray() {
    var i = this.t, r = new Array();
    r[0] = this.s;
    var p = this.DB-(i*this.DB)%8, d, k = 0;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) != (this.s&this.DM)>>p)
        r[k++] = d|(this.s<<(this.DB-p));
      while(i >= 0) {
        if(p < 8) {
          d = (this[i]&((1<<p)-1))<<(8-p);
          d |= this[--i]>>(p+=this.DB-8);
        }
        else {
          d = (this[i]>>(p-=8))&0xff;
          if(p <= 0) { p += this.DB; --i; }
        }
        if((d&0x80) != 0) d |= -256;
        if(k == 0 && (this.s&0x80) != (d&0x80)) ++k;
        if(k > 0 || d != this.s) r[k++] = d;
      }
    }
    return r;
  }

  function bnEquals(a) { return(this.compareTo(a)==0); }
  function bnMin(a) { return(this.compareTo(a)<0)?this:a; }
  function bnMax(a) { return(this.compareTo(a)>0)?this:a; }

// (protected) r = this op a (bitwise)
  function bnpBitwiseTo(a,op,r) {
    var i, f, m = Math.min(a.t,this.t);
    for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);
    if(a.t < this.t) {
      f = a.s&this.DM;
      for(i = m; i < this.t; ++i) r[i] = op(this[i],f);
      r.t = this.t;
    }
    else {
      f = this.s&this.DM;
      for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
      r.t = a.t;
    }
    r.s = op(this.s,a.s);
    r.clamp();
  }

// (public) this & a
  function op_and(x,y) { return x&y; }
  function bnAnd(a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; }

// (public) this | a
  function op_or(x,y) { return x|y; }
  function bnOr(a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; }

// (public) this ^ a
  function op_xor(x,y) { return x^y; }
  function bnXor(a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; }

// (public) this & ~a
  function op_andnot(x,y) { return x&~y; }
  function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a,op_andnot,r); return r; }

// (public) ~this
  function bnNot() {
    var r = nbi();
    for(var i = 0; i < this.t; ++i) r[i] = this.DM&~this[i];
    r.t = this.t;
    r.s = ~this.s;
    return r;
  }

// (public) this << n
  function bnShiftLeft(n) {
    var r = nbi();
    if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);
    return r;
  }

// (public) this >> n
  function bnShiftRight(n) {
    var r = nbi();
    if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);
    return r;
  }

// return index of lowest 1-bit in x, x < 2^31
  function lbit(x) {
    if(x == 0) return -1;
    var r = 0;
    if((x&0xffff) == 0) { x >>= 16; r += 16; }
    if((x&0xff) == 0) { x >>= 8; r += 8; }
    if((x&0xf) == 0) { x >>= 4; r += 4; }
    if((x&3) == 0) { x >>= 2; r += 2; }
    if((x&1) == 0) ++r;
    return r;
  }

// (public) returns index of lowest 1-bit (or -1 if none)
  function bnGetLowestSetBit() {
    for(var i = 0; i < this.t; ++i)
      if(this[i] != 0) return i*this.DB+lbit(this[i]);
    if(this.s < 0) return this.t*this.DB;
    return -1;
  }

// return number of 1 bits in x
  function cbit(x) {
    var r = 0;
    while(x != 0) { x &= x-1; ++r; }
    return r;
  }

// (public) return number of set bits
  function bnBitCount() {
    var r = 0, x = this.s&this.DM;
    for(var i = 0; i < this.t; ++i) r += cbit(this[i]^x);
    return r;
  }

// (public) true iff nth bit is set
  function bnTestBit(n) {
    var j = Math.floor(n/this.DB);
    if(j >= this.t) return(this.s!=0);
    return((this[j]&(1<<(n%this.DB)))!=0);
  }

// (protected) this op (1<<n)
  function bnpChangeBit(n,op) {
    var r = BigInteger.ONE.shiftLeft(n);
    this.bitwiseTo(r,op,r);
    return r;
  }

// (public) this | (1<<n)
  function bnSetBit(n) { return this.changeBit(n,op_or); }

// (public) this & ~(1<<n)
  function bnClearBit(n) { return this.changeBit(n,op_andnot); }

// (public) this ^ (1<<n)
  function bnFlipBit(n) { return this.changeBit(n,op_xor); }

// (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }

// (public) this + a
  function bnAdd(a) { var r = nbi(); this.addTo(a,r); return r; }

// (public) this - a
  function bnSubtract(a) { var r = nbi(); this.subTo(a,r); return r; }

// (public) this * a
  function bnMultiply(a) { var r = nbi(); this.multiplyTo(a,r); return r; }

// (public) this^2
  function bnSquare() { var r = nbi(); this.squareTo(r); return r; }

// (public) this / a
  function bnDivide(a) { var r = nbi(); this.divRemTo(a,r,null); return r; }

// (public) this % a
  function bnRemainder(a) { var r = nbi(); this.divRemTo(a,null,r); return r; }

// (public) [this/a,this%a]
  function bnDivideAndRemainder(a) {
    var q = nbi(), r = nbi();
    this.divRemTo(a,q,r);
    return new Array(q,r);
  }

// (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }

// (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }

// A "null" reducer
  function NullExp() {}
  function nNop(x) { return x; }
  function nMulTo(x,y,r) { x.multiplyTo(y,r); }
  function nSqrTo(x,r) { x.squareTo(r); }

  NullExp.prototype.convert = nNop;
  NullExp.prototype.revert = nNop;
  NullExp.prototype.mulTo = nMulTo;
  NullExp.prototype.sqrTo = nSqrTo;

// (public) this^e
  function bnPow(e) { return this.exp(e,new NullExp()); }

// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
  function bnpMultiplyLowerTo(a,n,r) {
    var i = Math.min(this.t+a.t,n);
    r.s = 0; // assumes a,this >= 0
    r.t = i;
    while(i > 0) r[--i] = 0;
    var j;
    for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);
    for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);
    r.clamp();
  }

// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
  function bnpMultiplyUpperTo(a,n,r) {
    --n;
    var i = r.t = this.t+a.t-n;
    r.s = 0; // assumes a,this >= 0
    while(--i >= 0) r[i] = 0;
    for(i = Math.max(n-this.t,0); i < a.t; ++i)
      r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);
    r.clamp();
    r.drShiftTo(1,r);
  }

// Barrett modular reduction
  function Barrett(m) {
    // setup Barrett
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
    this.mu = this.r2.divide(m);
    this.m = m;
  }

  function barrettConvert(x) {
    if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);
    else if(x.compareTo(this.m) < 0) return x;
    else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }
  }

  function barrettRevert(x) { return x; }

// x = x mod m (HAC 14.42)
  function barrettReduce(x) {
    x.drShiftTo(this.m.t-1,this.r2);
    if(x.t > this.m.t+1) { x.t = this.m.t+1; x.clamp(); }
    this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);
    this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
    while(x.compareTo(this.r2) < 0) x.dAddOffset(1,this.m.t+1);
    x.subTo(this.r2,x);
    while(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }

// r = x^2 mod m; x != r
  function barrettSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = x*y mod m; x,y != r
  function barrettMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

  Barrett.prototype.convert = barrettConvert;
  Barrett.prototype.revert = barrettRevert;
  Barrett.prototype.reduce = barrettReduce;
  Barrett.prototype.mulTo = barrettMulTo;
  Barrett.prototype.sqrTo = barrettSqrTo;

// (public) this^e % m (HAC 14.85)
  function bnModPow(e,m) {
    var i = e.bitLength(), k, r = nbv(1), z;
    if(i <= 0) return r;
    else if(i < 18) k = 1;
    else if(i < 48) k = 3;
    else if(i < 144) k = 4;
    else if(i < 768) k = 5;
    else k = 6;
    if(i < 8)
      z = new Classic(m);
    else if(m.isEven())
      z = new Barrett(m);
    else
      z = new Montgomery(m);

    // precomputation
    var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
    g[1] = z.convert(this);
    if(k > 1) {
      var g2 = nbi();
      z.sqrTo(g[1],g2);
      while(n <= km) {
        g[n] = nbi();
        z.mulTo(g2,g[n-2],g[n]);
        n += 2;
      }
    }

    var j = e.t-1, w, is1 = true, r2 = nbi(), t;
    i = nbits(e[j])-1;
    while(j >= 0) {
      if(i >= k1) w = (e[j]>>(i-k1))&km;
      else {
        w = (e[j]&((1<<(i+1))-1))<<(k1-i);
        if(j > 0) w |= e[j-1]>>(this.DB+i-k1);
      }

      n = k;
      while((w&1) == 0) { w >>= 1; --n; }
      if((i -= n) < 0) { i += this.DB; --j; }
      if(is1) {	// ret == 1, don't bother squaring or multiplying it
        g[w].copyTo(r);
        is1 = false;
      }
      else {
        while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }
        if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }
        z.mulTo(r2,g[w],r);
      }

      while(j >= 0 && (e[j]&(1<<i)) == 0) {
        z.sqrTo(r,r2); t = r; r = r2; r2 = t;
        if(--i < 0) { i = this.DB-1; --j; }
      }
    }
    return z.revert(r);
  }

// (public) gcd(this,a) (HAC 14.54)
  function bnGCD(a) {
    var x = (this.s<0)?this.negate():this.clone();
    var y = (a.s<0)?a.negate():a.clone();
    if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }
    var i = x.getLowestSetBit(), g = y.getLowestSetBit();
    if(g < 0) return x;
    if(i < g) g = i;
    if(g > 0) {
      x.rShiftTo(g,x);
      y.rShiftTo(g,y);
    }
    while(x.signum() > 0) {
      if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);
      if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);
      if(x.compareTo(y) >= 0) {
        x.subTo(y,x);
        x.rShiftTo(1,x);
      }
      else {
        y.subTo(x,y);
        y.rShiftTo(1,y);
      }
    }
    if(g > 0) y.lShiftTo(g,y);
    return y;
  }

// (protected) this % n, n < 2^26
  function bnpModInt(n) {
    if(n <= 0) return 0;
    var d = this.DV%n, r = (this.s<0)?n-1:0;
    if(this.t > 0)
      if(d == 0) r = this[0]%n;
      else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;
    return r;
  }

// (public) 1/this % m (HAC 14.61)
  function bnModInverse(m) {
    var ac = m.isEven();
    if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
    var u = m.clone(), v = this.clone();
    var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
    while(u.signum() != 0) {
      while(u.isEven()) {
        u.rShiftTo(1,u);
        if(ac) {
          if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }
          a.rShiftTo(1,a);
        }
        else if(!b.isEven()) b.subTo(m,b);
        b.rShiftTo(1,b);
      }
      while(v.isEven()) {
        v.rShiftTo(1,v);
        if(ac) {
          if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }
          c.rShiftTo(1,c);
        }
        else if(!d.isEven()) d.subTo(m,d);
        d.rShiftTo(1,d);
      }
      if(u.compareTo(v) >= 0) {
        u.subTo(v,u);
        if(ac) a.subTo(c,a);
        b.subTo(d,b);
      }
      else {
        v.subTo(u,v);
        if(ac) c.subTo(a,c);
        d.subTo(b,d);
      }
    }
    if(v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
    if(d.compareTo(m) >= 0) return d.subtract(m);
    if(d.signum() < 0) d.addTo(m,d); else return d;
    if(d.signum() < 0) return d.add(m); else return d;
  }

  var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];
  var lplim = (1<<26)/lowprimes[lowprimes.length-1];

// (public) test primality with certainty >= 1-.5^t
  function bnIsProbablePrime(t) {
    var i, x = this.abs();
    if(x.t == 1 && x[0] <= lowprimes[lowprimes.length-1]) {
      for(i = 0; i < lowprimes.length; ++i)
        if(x[0] == lowprimes[i]) return true;
      return false;
    }
    if(x.isEven()) return false;
    i = 1;
    while(i < lowprimes.length) {
      var m = lowprimes[i], j = i+1;
      while(j < lowprimes.length && m < lplim) m *= lowprimes[j++];
      m = x.modInt(m);
      while(i < j) if(m%lowprimes[i++] == 0) return false;
    }
    return x.millerRabin(t);
  }

// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
  function bnpMillerRabin(t) {
    var n1 = this.subtract(BigInteger.ONE);
    var k = n1.getLowestSetBit();
    if(k <= 0) return false;
    var r = n1.shiftRight(k);
    t = (t+1)>>1;
    if(t > lowprimes.length) t = lowprimes.length;
    var a = nbi();
    for(var i = 0; i < t; ++i) {
      //Pick bases at random, instead of starting at 2
      a.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);
      var y = a.modPow(r,this);
      if(y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
        var j = 1;
        while(j++ < k && y.compareTo(n1) != 0) {
          y = y.modPowInt(2,this);
          if(y.compareTo(BigInteger.ONE) == 0) return false;
        }
        if(y.compareTo(n1) != 0) return false;
      }
    }
    return true;
  }

// protected
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.fromNumber = bnpFromNumber;
  BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
  BigInteger.prototype.changeBit = bnpChangeBit;
  BigInteger.prototype.addTo = bnpAddTo;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
  BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
  BigInteger.prototype.modInt = bnpModInt;
  BigInteger.prototype.millerRabin = bnpMillerRabin;

// public
  BigInteger.prototype.clone = bnClone;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.byteValue = bnByteValue;
  BigInteger.prototype.shortValue = bnShortValue;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.toByteArray = bnToByteArray;
  BigInteger.prototype.equals = bnEquals;
  BigInteger.prototype.min = bnMin;
  BigInteger.prototype.max = bnMax;
  BigInteger.prototype.and = bnAnd;
  BigInteger.prototype.or = bnOr;
  BigInteger.prototype.xor = bnXor;
  BigInteger.prototype.andNot = bnAndNot;
  BigInteger.prototype.not = bnNot;
  BigInteger.prototype.shiftLeft = bnShiftLeft;
  BigInteger.prototype.shiftRight = bnShiftRight;
  BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
  BigInteger.prototype.bitCount = bnBitCount;
  BigInteger.prototype.testBit = bnTestBit;
  BigInteger.prototype.setBit = bnSetBit;
  BigInteger.prototype.clearBit = bnClearBit;
  BigInteger.prototype.flipBit = bnFlipBit;
  BigInteger.prototype.add = bnAdd;
  BigInteger.prototype.subtract = bnSubtract;
  BigInteger.prototype.multiply = bnMultiply;
  BigInteger.prototype.divide = bnDivide;
  BigInteger.prototype.remainder = bnRemainder;
  BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
  BigInteger.prototype.modPow = bnModPow;
  BigInteger.prototype.modInverse = bnModInverse;
  BigInteger.prototype.pow = bnPow;
  BigInteger.prototype.gcd = bnGCD;
  BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

// JSBN-specific extension
  BigInteger.prototype.square = bnSquare;

// BigInteger interfaces not implemented in jsbn:

// BigInteger(int signum, byte[] magnitude)
// double doubleValue()
// float floatValue()
// int hashCode()
// long longValue()
// static BigInteger valueOf(long val)

// prng4.js - uses Arcfour as a PRNG

  function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array();
  }

// Initialize arcfour context from key, an array of ints, each from [0..255]
  function ARC4init(key) {
    var i, j, t;
    for(i = 0; i < 256; ++i)
      this.S[i] = i;
    j = 0;
    for(i = 0; i < 256; ++i) {
      j = (j + this.S[i] + key[i % key.length]) & 255;
      t = this.S[i];
      this.S[i] = this.S[j];
      this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
  }

  function ARC4next() {
    var t;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[(t + this.S[this.i]) & 255];
  }

  Arcfour.prototype.init = ARC4init;
  Arcfour.prototype.next = ARC4next;

// Plug in your RNG constructor here
  function prng_newstate() {
    return new Arcfour();
  }

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
  var rng_psize = 256;

// Random number generator - requires a PRNG backend, e.g. prng4.js
  var rng_state;
  var rng_pool;
  var rng_pptr;

// Initialize the pool with junk if needed.
  if(rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if(window.crypto && window.crypto.getRandomValues) {
      // Extract entropy (2048 bits) from RNG if available
      var z = new Uint32Array(256);
      window.crypto.getRandomValues(z);
      for (t = 0; t < z.length; ++t)
        rng_pool[rng_pptr++] = z[t] & 255;
    }

    // Use mouse events for entropy, if we do not have enough entropy by the time
    // we need it, entropy will be generated by Math.random.
    var onMouseMoveListener = function(ev) {
      this.count = this.count || 0;
      if (this.count >= 256 || rng_pptr >= rng_psize) {
        if (window.removeEventListener)
          window.removeEventListener("mousemove", onMouseMoveListener, false);
        else if (window.detachEvent)
          window.detachEvent("onmousemove", onMouseMoveListener);
        return;
      }
      try {
        var mouseCoordinates = ev.x + ev.y;
        rng_pool[rng_pptr++] = mouseCoordinates & 255;
        this.count += 1;
      } catch (e) {
        // Sometimes Firefox will deny permission to access event properties for some reason. Ignore.
      }
    };
    if (window.addEventListener)
      window.addEventListener("mousemove", onMouseMoveListener, false);
    else if (window.attachEvent)
      window.attachEvent("onmousemove", onMouseMoveListener);

  }

  function rng_get_byte() {
    if(rng_state == null) {
      rng_state = prng_newstate();
      // At this point, we may not have collected enough entropy.  If not, fall back to Math.random
      while (rng_pptr < rng_psize) {
        var random = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = random & 255;
      }
      rng_state.init(rng_pool);
      for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
        rng_pool[rng_pptr] = 0;
      rng_pptr = 0;
    }
    // TODO: allow reseeding after first request
    return rng_state.next();
  }

  function rng_get_bytes(ba) {
    var i;
    for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
  }

  function SecureRandom() {}

  SecureRandom.prototype.nextBytes = rng_get_bytes;

// Depends on jsbn.js and rng.js

// Version 1.1: support utf-8 encoding in pkcs1pad2

// convert a (hex) string to a bignum object
  function parseBigInt(str,r) {
    return new BigInteger(str,r);
  }

  function linebrk(s,n) {
    var ret = "";
    var i = 0;
    while(i + n < s.length) {
      ret += s.substring(i,i+n) + "\n";
      i += n;
    }
    return ret + s.substring(i,s.length);
  }

  function byte2Hex(b) {
    if(b < 0x10)
      return "0" + b.toString(16);
    else
      return b.toString(16);
  }

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
  function pkcs1pad2(s,n) {
    if(n < s.length + 11) { // TODO: fix for utf-8
      console.error("Message too long for RSA");
      return null;
    }
    var ba = new Array();
    var i = s.length - 1;
    while(i >= 0 && n > 0) {
      var c = s.charCodeAt(i--);
      if(c < 128) { // encode using utf-8
        ba[--n] = c;
      }
      else if((c > 127) && (c < 2048)) {
        ba[--n] = (c & 63) | 128;
        ba[--n] = (c >> 6) | 192;
      }
      else {
        ba[--n] = (c & 63) | 128;
        ba[--n] = ((c >> 6) & 63) | 128;
        ba[--n] = (c >> 12) | 224;
      }
    }
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = new Array();
    while(n > 2) { // random non-zero pad
      x[0] = 0;
      while(x[0] == 0) rng.nextBytes(x);
      ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
  }

// "empty" RSA key constructor
  function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
  }

// Set the public key fields N and e from hex strings
  function RSASetPublic(N,E) {
    if(N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = parseBigInt(N,16);
      this.e = parseInt(E,16);
    }
    else
      console.error("Invalid RSA public key");
  }

// Perform raw public operation on "x": return x^e (mod n)
  function RSADoPublic(x) {
    return x.modPowInt(this.e, this.n);
  }

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
  function RSAEncrypt(text) {
    var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
    if(m == null) return null;
    var c = this.doPublic(m);
    if(c == null) return null;
    var h = c.toString(16);
    if((h.length & 1) == 0) return h; else return "0" + h;
  }

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
//function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
//}

// protected
  RSAKey.prototype.doPublic = RSADoPublic;

// public
  RSAKey.prototype.setPublic = RSASetPublic;
  RSAKey.prototype.encrypt = RSAEncrypt;
//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

// Depends on rsa.js and jsbn2.js

// Version 1.1: support utf-8 decoding in pkcs1unpad2

// Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
  function pkcs1unpad2(d,n) {
    var b = d.toByteArray();
    var i = 0;
    while(i < b.length && b[i] == 0) ++i;
    if(b.length-i != n-1 || b[i] != 2)
      return null;
    ++i;
    while(b[i] != 0)
      if(++i >= b.length) return null;
    var ret = "";
    while(++i < b.length) {
      var c = b[i] & 255;
      if(c < 128) { // utf-8 decode
        ret += String.fromCharCode(c);
      }
      else if((c > 191) && (c < 224)) {
        ret += String.fromCharCode(((c & 31) << 6) | (b[i+1] & 63));
        ++i;
      }
      else {
        ret += String.fromCharCode(((c & 15) << 12) | ((b[i+1] & 63) << 6) | (b[i+2] & 63));
        i += 2;
      }
    }
    return ret;
  }

// Set the private key fields N, e, and d from hex strings
  function RSASetPrivate(N,E,D) {
    if(N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = parseBigInt(N,16);
      this.e = parseInt(E,16);
      this.d = parseBigInt(D,16);
    }
    else
      console.error("Invalid RSA private key");
  }

// Set the private key fields N, e, d and CRT params from hex strings
  function RSASetPrivateEx(N,E,D,P,Q,DP,DQ,C) {
    if(N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = parseBigInt(N,16);
      this.e = parseInt(E,16);
      this.d = parseBigInt(D,16);
      this.p = parseBigInt(P,16);
      this.q = parseBigInt(Q,16);
      this.dmp1 = parseBigInt(DP,16);
      this.dmq1 = parseBigInt(DQ,16);
      this.coeff = parseBigInt(C,16);
    }
    else
      console.error("Invalid RSA private key");
  }

// Generate a new random private key B bits long, using public expt E
  function RSAGenerate(B,E) {
    var rng = new SecureRandom();
    var qs = B>>1;
    this.e = parseInt(E,16);
    var ee = new BigInteger(E,16);
    for(;;) {
      for(;;) {
        this.p = new BigInteger(B-qs,1,rng);
        if(this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) break;
      }
      for(;;) {
        this.q = new BigInteger(qs,1,rng);
        if(this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) break;
      }
      if(this.p.compareTo(this.q) <= 0) {
        var t = this.p;
        this.p = this.q;
        this.q = t;
      }
      var p1 = this.p.subtract(BigInteger.ONE);
      var q1 = this.q.subtract(BigInteger.ONE);
      var phi = p1.multiply(q1);
      if(phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
        this.n = this.p.multiply(this.q);
        this.d = ee.modInverse(phi);
        this.dmp1 = this.d.mod(p1);
        this.dmq1 = this.d.mod(q1);
        this.coeff = this.q.modInverse(this.p);
        break;
      }
    }
  }

// Perform raw private operation on "x": return x^d (mod n)
  function RSADoPrivate(x) {
    if(this.p == null || this.q == null)
      return x.modPow(this.d, this.n);

    // TODO: re-calculate any missing CRT params
    var xp = x.mod(this.p).modPow(this.dmp1, this.p);
    var xq = x.mod(this.q).modPow(this.dmq1, this.q);

    while(xp.compareTo(xq) < 0)
      xp = xp.add(this.p);
    return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
  }

// Return the PKCS#1 RSA decryption of "ctext".
// "ctext" is an even-length hex string and the output is a plain string.
  function RSADecrypt(ctext) {
    var c = parseBigInt(ctext, 16);
    var m = this.doPrivate(c);
    if(m == null) return null;
    return pkcs1unpad2(m, (this.n.bitLength()+7)>>3);
  }

// Return the PKCS#1 RSA decryption of "ctext".
// "ctext" is a Base64-encoded string and the output is a plain string.
//function RSAB64Decrypt(ctext) {
//  var h = b64tohex(ctext);
//  if(h) return this.decrypt(h); else return null;
//}

// protected
  RSAKey.prototype.doPrivate = RSADoPrivate;

// public
  RSAKey.prototype.setPrivate = RSASetPrivate;
  RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
  RSAKey.prototype.generate = RSAGenerate;
  RSAKey.prototype.decrypt = RSADecrypt;
//RSAKey.prototype.b64_decrypt = RSAB64Decrypt;

// Copyright (c) 2011  Kevin M Burns Jr.
// All Rights Reserved.
// See "LICENSE" for details.
//
// Extension to jsbn which adds facilities for asynchronous RSA key generation
// Primarily created to avoid execution timeout on mobile devices
//
// http://www-cs-students.stanford.edu/~tjw/jsbn/
//
// ---

  (function(){

// Generate a new random private key B bits long, using public expt E
    var RSAGenerateAsync = function (B, E, callback) {
      //var rng = new SeededRandom();
      var rng = new SecureRandom();
      var qs = B >> 1;
      this.e = parseInt(E, 16);
      var ee = new BigInteger(E, 16);
      var rsa = this;
      // These functions have non-descript names because they were originally for(;;) loops.
      // I don't know about cryptography to give them better names than loop1-4.
      var loop1 = function() {
        var loop4 = function() {
          if (rsa.p.compareTo(rsa.q) <= 0) {
            var t = rsa.p;
            rsa.p = rsa.q;
            rsa.q = t;
          }
          var p1 = rsa.p.subtract(BigInteger.ONE);
          var q1 = rsa.q.subtract(BigInteger.ONE);
          var phi = p1.multiply(q1);
          if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
            rsa.n = rsa.p.multiply(rsa.q);
            rsa.d = ee.modInverse(phi);
            rsa.dmp1 = rsa.d.mod(p1);
            rsa.dmq1 = rsa.d.mod(q1);
            rsa.coeff = rsa.q.modInverse(rsa.p);
            setTimeout(function(){callback()},0); // escape
          } else {
            setTimeout(loop1,0);
          }
        };
        var loop3 = function() {
          rsa.q = nbi();
          rsa.q.fromNumberAsync(qs, 1, rng, function(){
            rsa.q.subtract(BigInteger.ONE).gcda(ee, function(r){
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                setTimeout(loop4,0);
              } else {
                setTimeout(loop3,0);
              }
            });
          });
        };
        var loop2 = function() {
          rsa.p = nbi();
          rsa.p.fromNumberAsync(B - qs, 1, rng, function(){
            rsa.p.subtract(BigInteger.ONE).gcda(ee, function(r){
              if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                setTimeout(loop3,0);
              } else {
                setTimeout(loop2,0);
              }
            });
          });
        };
        setTimeout(loop2,0);
      };
      setTimeout(loop1,0);
    };
    RSAKey.prototype.generateAsync = RSAGenerateAsync;

// Public API method
    var bnGCDAsync = function (a, callback) {
      var x = (this.s < 0) ? this.negate() : this.clone();
      var y = (a.s < 0) ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }
      var i = x.getLowestSetBit(),
        g = y.getLowestSetBit();
      if (g < 0) {
        callback(x);
        return;
      }
      if (i < g) g = i;
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      // Workhorse of the algorithm, gets called 200 - 800 times per 512 bit keygen.
      var gcda1 = function() {
        if ((i = x.getLowestSetBit()) > 0){ x.rShiftTo(i, x); }
        if ((i = y.getLowestSetBit()) > 0){ y.rShiftTo(i, y); }
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
        if(!(x.signum() > 0)) {
          if (g > 0) y.lShiftTo(g, y);
          setTimeout(function(){callback(y)},0); // escape
        } else {
          setTimeout(gcda1,0);
        }
      };
      setTimeout(gcda1,10);
    };
    BigInteger.prototype.gcda = bnGCDAsync;

// (protected) alternate constructor
    var bnpFromNumberAsync = function (a,b,c,callback) {
      if("number" == typeof b) {
        if(a < 2) {
          this.fromInt(1);
        } else {
          this.fromNumber(a,c);
          if(!this.testBit(a-1)){
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
          }
          if(this.isEven()) {
            this.dAddOffset(1,0);
          }
          var bnp = this;
          var bnpfn1 = function(){
            bnp.dAddOffset(2,0);
            if(bnp.bitLength() > a) bnp.subTo(BigInteger.ONE.shiftLeft(a-1),bnp);
            if(bnp.isProbablePrime(b)) {
              setTimeout(function(){callback()},0); // escape
            } else {
              setTimeout(bnpfn1,0);
            }
          };
          setTimeout(bnpfn1,0);
        }
      } else {
        var x = new Array(), t = a&7;
        x.length = (a>>3)+1;
        b.nextBytes(x);
        if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
        this.fromString(x,256);
      }
    };
    BigInteger.prototype.fromNumberAsync = bnpFromNumberAsync;

  })();
  var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64pad="=";

  function hex2b64(h) {
    var i;
    var c;
    var ret = "";
    for(i = 0; i+3 <= h.length; i+=3) {
      c = parseInt(h.substring(i,i+3),16);
      ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if(i+1 == h.length) {
      c = parseInt(h.substring(i,i+1),16);
      ret += b64map.charAt(c << 2);
    }
    else if(i+2 == h.length) {
      c = parseInt(h.substring(i,i+2),16);
      ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while((ret.length & 3) > 0) ret += b64pad;
    return ret;
  }

// convert a base64 string to hex
  function b64tohex(s) {
    var ret = ""
    var i;
    var k = 0; // b64 state, 0-3
    var slop;
    for(i = 0; i < s.length; ++i) {
      if(s.charAt(i) == b64pad) break;
      v = b64map.indexOf(s.charAt(i));
      if(v < 0) continue;
      if(k == 0) {
        ret += int2char(v >> 2);
        slop = v & 3;
        k = 1;
      }
      else if(k == 1) {
        ret += int2char((slop << 2) | (v >> 4));
        slop = v & 0xf;
        k = 2;
      }
      else if(k == 2) {
        ret += int2char(slop);
        ret += int2char(v >> 2);
        slop = v & 3;
        k = 3;
      }
      else {
        ret += int2char((slop << 2) | (v >> 4));
        ret += int2char(v & 0xf);
        k = 0;
      }
    }
    if(k == 1)
      ret += int2char(slop << 2);
    return ret;
  }

// convert a base64 string to a byte/number array
  function b64toBA(s) {
    //piggyback on b64tohex for now, optimize later
    var h = b64tohex(s);
    var i;
    var a = new Array();
    for(i = 0; 2*i < h.length; ++i) {
      a[i] = parseInt(h.substring(2*i,2*i+2),16);
    }
    return a;
  }

  /*! asn1-1.0.2.js (c) 2013 Kenji Urushima | kjur.github.com/jsrsasign/license
   */

  var JSX = JSX || {};
  JSX.env = JSX.env || {};

  var L = JSX, OP = Object.prototype, FUNCTION_TOSTRING = '[object Function]',ADD = ["toString", "valueOf"];

  JSX.env.parseUA = function(agent) {

    var numberify = function(s) {
        var c = 0;
        return parseFloat(s.replace(/\./g, function() {
          return (c++ == 1) ? '' : '.';
        }));
      },

      nav = navigator,
      o = {
        ie: 0,
        opera: 0,
        gecko: 0,
        webkit: 0,
        chrome: 0,
        mobile: null,
        air: 0,
        ipad: 0,
        iphone: 0,
        ipod: 0,
        ios: null,
        android: 0,
        webos: 0,
        caja: nav && nav.cajaVersion,
        secure: false,
        os: null

      },

      ua = agent || (navigator && navigator.userAgent),
      loc = window && window.location,
      href = loc && loc.href,
      m;

    o.secure = href && (href.toLowerCase().indexOf("https") === 0);

    if (ua) {

      if ((/windows|win32/i).test(ua)) {
        o.os = 'windows';
      } else if ((/macintosh/i).test(ua)) {
        o.os = 'macintosh';
      } else if ((/rhino/i).test(ua)) {
        o.os = 'rhino';
      }
      if ((/KHTML/).test(ua)) {
        o.webkit = 1;
      }
      m = ua.match(/AppleWebKit\/([^\s]*)/);
      if (m && m[1]) {
        o.webkit = numberify(m[1]);
        if (/ Mobile\//.test(ua)) {
          o.mobile = 'Apple'; // iPhone or iPod Touch
          m = ua.match(/OS ([^\s]*)/);
          if (m && m[1]) {
            m = numberify(m[1].replace('_', '.'));
          }
          o.ios = m;
          o.ipad = o.ipod = o.iphone = 0;
          m = ua.match(/iPad|iPod|iPhone/);
          if (m && m[0]) {
            o[m[0].toLowerCase()] = o.ios;
          }
        } else {
          m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
          if (m) {
            o.mobile = m[0];
          }
          if (/webOS/.test(ua)) {
            o.mobile = 'WebOS';
            m = ua.match(/webOS\/([^\s]*);/);
            if (m && m[1]) {
              o.webos = numberify(m[1]);
            }
          }
          if (/ Android/.test(ua)) {
            o.mobile = 'Android';
            m = ua.match(/Android ([^\s]*);/);
            if (m && m[1]) {
              o.android = numberify(m[1]);
            }
          }
        }
        m = ua.match(/Chrome\/([^\s]*)/);
        if (m && m[1]) {
          o.chrome = numberify(m[1]); // Chrome
        } else {
          m = ua.match(/AdobeAIR\/([^\s]*)/);
          if (m) {
            o.air = m[0]; // Adobe AIR 1.0 or better
          }
        }
      }
      if (!o.webkit) {
        m = ua.match(/Opera[\s\/]([^\s]*)/);
        if (m && m[1]) {
          o.opera = numberify(m[1]);
          m = ua.match(/Version\/([^\s]*)/);
          if (m && m[1]) {
            o.opera = numberify(m[1]); // opera 10+
          }
          m = ua.match(/Opera Mini[^;]*/);
          if (m) {
            o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
          }
        } else { // not opera or webkit
          m = ua.match(/MSIE\s([^;]*)/);
          if (m && m[1]) {
            o.ie = numberify(m[1]);
          } else { // not opera, webkit, or ie
            m = ua.match(/Gecko\/([^\s]*)/);
            if (m) {
              o.gecko = 1; // Gecko detected, look for revision
              m = ua.match(/rv:([^\s\)]*)/);
              if (m && m[1]) {
                o.gecko = numberify(m[1]);
              }
            }
          }
        }
      }
    }
    return o;
  };

  JSX.env.ua = JSX.env.parseUA();

  JSX.isFunction = function(o) {
    return (typeof o === 'function') || OP.toString.apply(o) === FUNCTION_TOSTRING;
  };

  JSX._IEEnumFix = (JSX.env.ua.ie) ? function(r, s) {
    var i, fname, f;
    for (i=0;i<ADD.length;i=i+1) {

      fname = ADD[i];
      f = s[fname];

      if (L.isFunction(f) && f!=OP[fname]) {
        r[fname]=f;
      }
    }
  } : function(){};

  JSX.extend = function(subc, superc, overrides) {
    if (!superc||!subc) {
      throw new Error("extend failed, please check that " +
        "all dependencies are included.");
    }
    var F = function() {}, i;
    F.prototype=superc.prototype;
    subc.prototype=new F();
    subc.prototype.constructor=subc;
    subc.superclass=superc.prototype;
    if (superc.prototype.constructor == OP.constructor) {
      superc.prototype.constructor=superc;
    }

    if (overrides) {
      for (i in overrides) {
        if (L.hasOwnProperty(overrides, i)) {
          subc.prototype[i]=overrides[i];
        }
      }

      L._IEEnumFix(subc.prototype, overrides);
    }
  };

  /*
   * asn1.js - ASN.1 DER encoder classes
   *
   * Copyright (c) 2013 Kenji Urushima (kenji.urushima@gmail.com)
   *
   * This software is licensed under the terms of the MIT License.
   * http://kjur.github.com/jsrsasign/license
   *
   * The above copyright and license notice shall be
   * included in all copies or substantial portions of the Software.
   */

  /**
   * @fileOverview
   * @name asn1-1.0.js
   * @author Kenji Urushima kenji.urushima@gmail.com
   * @version 1.0.2 (2013-May-30)
   * @since 2.1
   * @license <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
   */

  /**
   * kjur's class library name space
   * <p>
   * This name space provides following name spaces:
   * <ul>
   * <li>{@link KJUR.asn1} - ASN.1 primitive hexadecimal encoder</li>
   * <li>{@link KJUR.asn1.x509} - ASN.1 structure for X.509 certificate and CRL</li>
   * <li>{@link KJUR.crypto} - Java Cryptographic Extension(JCE) style MessageDigest/Signature
   * class and utilities</li>
   * </ul>
   * </p>
   * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
   * @name KJUR
   * @namespace kjur's class library name space
   */
  if (typeof KJUR == "undefined" || !KJUR) KJUR = {};

  /**
   * kjur's ASN.1 class library name space
   * <p>
   * This is ITU-T X.690 ASN.1 DER encoder class library and
   * class structure and methods is very similar to
   * org.bouncycastle.asn1 package of
   * well known BouncyCaslte Cryptography Library.
   *
   * <h4>PROVIDING ASN.1 PRIMITIVES</h4>
   * Here are ASN.1 DER primitive classes.
   * <ul>
   * <li>{@link KJUR.asn1.DERBoolean}</li>
   * <li>{@link KJUR.asn1.DERInteger}</li>
   * <li>{@link KJUR.asn1.DERBitString}</li>
   * <li>{@link KJUR.asn1.DEROctetString}</li>
   * <li>{@link KJUR.asn1.DERNull}</li>
   * <li>{@link KJUR.asn1.DERObjectIdentifier}</li>
   * <li>{@link KJUR.asn1.DERUTF8String}</li>
   * <li>{@link KJUR.asn1.DERNumericString}</li>
   * <li>{@link KJUR.asn1.DERPrintableString}</li>
   * <li>{@link KJUR.asn1.DERTeletexString}</li>
   * <li>{@link KJUR.asn1.DERIA5String}</li>
   * <li>{@link KJUR.asn1.DERUTCTime}</li>
   * <li>{@link KJUR.asn1.DERGeneralizedTime}</li>
   * <li>{@link KJUR.asn1.DERSequence}</li>
   * <li>{@link KJUR.asn1.DERSet}</li>
   * </ul>
   *
   * <h4>OTHER ASN.1 CLASSES</h4>
   * <ul>
   * <li>{@link KJUR.asn1.ASN1Object}</li>
   * <li>{@link KJUR.asn1.DERAbstractString}</li>
   * <li>{@link KJUR.asn1.DERAbstractTime}</li>
   * <li>{@link KJUR.asn1.DERAbstractStructured}</li>
   * <li>{@link KJUR.asn1.DERTaggedObject}</li>
   * </ul>
   * </p>
   * NOTE: Please ignore method summary and document of this namespace. This caused by a bug of jsdoc2.
   * @name KJUR.asn1
   * @namespace
   */
  if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) KJUR.asn1 = {};

  /**
   * ASN1 utilities class
   * @name KJUR.asn1.ASN1Util
   * @classs ASN1 utilities class
   * @since asn1 1.0.2
   */
  KJUR.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(i) {
      var h = i.toString(16);
      if ((h.length % 2) == 1) h = '0' + h;
      return h;
    };
    this.bigIntToMinTwosComplementsHex = function(bigIntegerValue) {
      var h = bigIntegerValue.toString(16);
      if (h.substr(0, 1) != '-') {
        if (h.length % 2 == 1) {
          h = '0' + h;
        } else {
          if (! h.match(/^[0-7]/)) {
            h = '00' + h;
          }
        }
      } else {
        var hPos = h.substr(1);
        var xorLen = hPos.length;
        if (xorLen % 2 == 1) {
          xorLen += 1;
        } else {
          if (! h.match(/^[0-7]/)) {
            xorLen += 2;
          }
        }
        var hMask = '';
        for (var i = 0; i < xorLen; i++) {
          hMask += 'f';
        }
        var biMask = new BigInteger(hMask, 16);
        var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
        h = biNeg.toString(16).replace(/^-/, '');
      }
      return h;
    };
    /**
     * get PEM string from hexadecimal data and header string
     * @name getPEMStringFromHex
     * @memberOf KJUR.asn1.ASN1Util
     * @function
     * @param {String} dataHex hexadecimal string of PEM body
     * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
     * @return {String} PEM formatted string of input data
     * @description
     * @example
     * var pem  = KJUR.asn1.ASN1Util.getPEMStringFromHex('616161', 'RSA PRIVATE KEY');
     * // value of pem will be:
     * -----BEGIN PRIVATE KEY-----
     * YWFh
     * -----END PRIVATE KEY-----
     */
    this.getPEMStringFromHex = function(dataHex, pemHeader) {
      var dataWA = CryptoJS.enc.Hex.parse(dataHex);
      var dataB64 = CryptoJS.enc.Base64.stringify(dataWA);
      var pemBody = dataB64.replace(/(.{64})/g, "$1\r\n");
      pemBody = pemBody.replace(/\r\n$/, '');
      return "-----BEGIN " + pemHeader + "-----\r\n" +
        pemBody +
        "\r\n-----END " + pemHeader + "-----\r\n";
    };
  };

// ********************************************************************
//  Abstract ASN.1 Classes
// ********************************************************************

// ********************************************************************

  /**
   * base class for ASN.1 DER encoder object
   * @name KJUR.asn1.ASN1Object
   * @class base class for ASN.1 DER encoder object
   * @property {Boolean} isModified flag whether internal data was changed
   * @property {String} hTLV hexadecimal string of ASN.1 TLV
   * @property {String} hT hexadecimal string of ASN.1 TLV tag(T)
   * @property {String} hL hexadecimal string of ASN.1 TLV length(L)
   * @property {String} hV hexadecimal string of ASN.1 TLV value(V)
   * @description
   */
  KJUR.asn1.ASN1Object = function() {
    var isModified = true;
    var hTLV = null;
    var hT = '00'
    var hL = '00';
    var hV = '';

    /**
     * get hexadecimal ASN.1 TLV length(L) bytes from TLV value(V)
     * @name getLengthHexFromValue
     * @memberOf KJUR.asn1.ASN1Object
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV length(L)
     */
    this.getLengthHexFromValue = function() {
      if (typeof this.hV == "undefined" || this.hV == null) {
        throw "this.hV is null or undefined.";
      }
      if (this.hV.length % 2 == 1) {
        throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
      }
      var n = this.hV.length / 2;
      var hN = n.toString(16);
      if (hN.length % 2 == 1) {
        hN = "0" + hN;
      }
      if (n < 128) {
        return hN;
      } else {
        var hNlen = hN.length / 2;
        if (hNlen > 15) {
          throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
        }
        var head = 128 + hNlen;
        return head.toString(16) + hN;
      }
    };

    /**
     * get hexadecimal string of ASN.1 TLV bytes
     * @name getEncodedHex
     * @memberOf KJUR.asn1.ASN1Object
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV
     */
    this.getEncodedHex = function() {
      if (this.hTLV == null || this.isModified) {
        this.hV = this.getFreshValueHex();
        this.hL = this.getLengthHexFromValue();
        this.hTLV = this.hT + this.hL + this.hV;
        this.isModified = false;
        //console.error("first time: " + this.hTLV);
      }
      return this.hTLV;
    };

    /**
     * get hexadecimal string of ASN.1 TLV value(V) bytes
     * @name getValueHex
     * @memberOf KJUR.asn1.ASN1Object
     * @function
     * @return {String} hexadecimal string of ASN.1 TLV value(V) bytes
     */
    this.getValueHex = function() {
      this.getEncodedHex();
      return this.hV;
    }

    this.getFreshValueHex = function() {
      return '';
    };
  };

// == BEGIN DERAbstractString ================================================
  /**
   * base class for ASN.1 DER string classes
   * @name KJUR.asn1.DERAbstractString
   * @class base class for ASN.1 DER string classes
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @property {String} s internal string of value
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERAbstractString = function(params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var s = null;
    var hV = null;

    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractString
     * @function
     * @return {String} string value of this string object
     */
    this.getString = function() {
      return this.s;
    };

    /**
     * set value by a string
     * @name setString
     * @memberOf KJUR.asn1.DERAbstractString
     * @function
     * @param {String} newS value by a string to set
     */
    this.setString = function(newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(this.s);
    };

    /**
     * set value by a hexadecimal string
     * @name setStringHex
     * @memberOf KJUR.asn1.DERAbstractString
     * @function
     * @param {String} newHexString value by a hexadecimal string to set
     */
    this.setStringHex = function(newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };

    this.getFreshValueHex = function() {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['str'] != "undefined") {
        this.setString(params['str']);
      } else if (typeof params['hex'] != "undefined") {
        this.setStringHex(params['hex']);
      }
    }
  };
  JSX.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
// == END   DERAbstractString ================================================

// == BEGIN DERAbstractTime ==================================================
  /**
   * base class for ASN.1 DER Generalized/UTCTime class
   * @name KJUR.asn1.DERAbstractTime
   * @class base class for ASN.1 DER Generalized/UTCTime class
   * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERAbstractTime = function(params) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
    var s = null;
    var date = null;

    // --- PRIVATE METHODS --------------------
    this.localDateToUTC = function(d) {
      utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      var utcDate = new Date(utc);
      return utcDate;
    };

    this.formatDate = function(dateObject, type) {
      var pad = this.zeroPadding;
      var d = this.localDateToUTC(dateObject);
      var year = String(d.getFullYear());
      if (type == 'utc') year = year.substr(2, 2);
      var month = pad(String(d.getMonth() + 1), 2);
      var day = pad(String(d.getDate()), 2);
      var hour = pad(String(d.getHours()), 2);
      var min = pad(String(d.getMinutes()), 2);
      var sec = pad(String(d.getSeconds()), 2);
      return year + month + day + hour + min + sec + 'Z';
    };

    this.zeroPadding = function(s, len) {
      if (s.length >= len) return s;
      return new Array(len - s.length + 1).join('0') + s;
    };

    // --- PUBLIC METHODS --------------------
    /**
     * get string value of this string object
     * @name getString
     * @memberOf KJUR.asn1.DERAbstractTime
     * @function
     * @return {String} string value of this time object
     */
    this.getString = function() {
      return this.s;
    };

    /**
     * set value by a string
     * @name setString
     * @memberOf KJUR.asn1.DERAbstractTime
     * @function
     * @param {String} newS value by a string to set such like "130430235959Z"
     */
    this.setString = function(newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(this.s);
    };

    /**
     * set value by a Date object
     * @name setByDateValue
     * @memberOf KJUR.asn1.DERAbstractTime
     * @function
     * @param {Integer} year year of date (ex. 2013)
     * @param {Integer} month month of date between 1 and 12 (ex. 12)
     * @param {Integer} day day of month
     * @param {Integer} hour hours of date
     * @param {Integer} min minutes of date
     * @param {Integer} sec seconds of date
     */
    this.setByDateValue = function(year, month, day, hour, min, sec) {
      var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
      this.setByDate(dateObject);
    };

    this.getFreshValueHex = function() {
      return this.hV;
    };
  };
  JSX.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
// == END   DERAbstractTime ==================================================

// == BEGIN DERAbstractStructured ============================================
  /**
   * base class for ASN.1 DER structured class
   * @name KJUR.asn1.DERAbstractStructured
   * @class base class for ASN.1 DER structured class
   * @property {Array} asn1Array internal array of ASN1Object
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERAbstractStructured = function(params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var asn1Array = null;

    /**
     * set value by array of ASN1Object
     * @name setByASN1ObjectArray
     * @memberOf KJUR.asn1.DERAbstractStructured
     * @function
     * @param {array} asn1ObjectArray array of ASN1Object to set
     */
    this.setByASN1ObjectArray = function(asn1ObjectArray) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array = asn1ObjectArray;
    };

    /**
     * append an ASN1Object to internal array
     * @name appendASN1Object
     * @memberOf KJUR.asn1.DERAbstractStructured
     * @function
     * @param {ASN1Object} asn1Object to add
     */
    this.appendASN1Object = function(asn1Object) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array.push(asn1Object);
    };

    this.asn1Array = new Array();
    if (typeof params != "undefined") {
      if (typeof params['array'] != "undefined") {
        this.asn1Array = params['array'];
      }
    }
  };
  JSX.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);


// ********************************************************************
//  ASN.1 Object Classes
// ********************************************************************

// ********************************************************************
  /**
   * class for ASN.1 DER Boolean
   * @name KJUR.asn1.DERBoolean
   * @class class for ASN.1 DER Boolean
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERBoolean = function() {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff";
  };
  JSX.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);

// ********************************************************************
  /**
   * class for ASN.1 DER Integer
   * @name KJUR.asn1.DERInteger
   * @class class for ASN.1 DER Integer
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>int - specify initial ASN.1 value(V) by integer value</li>
   * <li>bigint - specify initial ASN.1 value(V) by BigInteger object</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERInteger = function(params) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";

    /**
     * set value by Tom Wu's BigInteger object
     * @name setByBigInteger
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {BigInteger} bigIntegerValue to set
     */
    this.setByBigInteger = function(bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };

    /**
     * set value by integer value
     * @name setByInteger
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {Integer} integer value to set
     */
    this.setByInteger = function(intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };

    /**
     * set value by integer value
     * @name setValueHex
     * @memberOf KJUR.asn1.DERInteger
     * @function
     * @param {String} hexadecimal string of integer value
     * @description
     * <br/>
     * NOTE: Value shall be represented by minimum octet length of
     * two's complement representation.
     */
    this.setValueHex = function(newHexString) {
      this.hV = newHexString;
    };

    this.getFreshValueHex = function() {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['bigint'] != "undefined") {
        this.setByBigInteger(params['bigint']);
      } else if (typeof params['int'] != "undefined") {
        this.setByInteger(params['int']);
      } else if (typeof params['hex'] != "undefined") {
        this.setValueHex(params['hex']);
      }
    }
  };
  JSX.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);

// ********************************************************************
  /**
   * class for ASN.1 DER encoded BitString primitive
   * @name KJUR.asn1.DERBitString
   * @class class for ASN.1 DER encoded BitString primitive
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>bin - specify binary string (ex. '10111')</li>
   * <li>array - specify array of boolean (ex. [true,false,true,true])</li>
   * <li>hex - specify hexadecimal string of ASN.1 value(V) including unused bits</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERBitString = function(params) {
    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";

    /**
     * set ASN.1 value(V) by a hexadecimal string including unused bits
     * @name setHexValueIncludingUnusedBits
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {String} newHexStringIncludingUnusedBits
     */
    this.setHexValueIncludingUnusedBits = function(newHexStringIncludingUnusedBits) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = newHexStringIncludingUnusedBits;
    };

    /**
     * set ASN.1 value(V) by unused bit and hexadecimal string of value
     * @name setUnusedBitsAndHexValue
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {Integer} unusedBits
     * @param {String} hValue
     */
    this.setUnusedBitsAndHexValue = function(unusedBits, hValue) {
      if (unusedBits < 0 || 7 < unusedBits) {
        throw "unused bits shall be from 0 to 7: u = " + unusedBits;
      }
      var hUnusedBits = "0" + unusedBits;
      this.hTLV = null;
      this.isModified = true;
      this.hV = hUnusedBits + hValue;
    };

    /**
     * set ASN.1 DER BitString by binary string
     * @name setByBinaryString
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {String} binaryString binary value string (i.e. '10111')
     * @description
     * Its unused bits will be calculated automatically by length of
     * 'binaryValue'. <br/>
     * NOTE: Trailing zeros '0' will be ignored.
     */
    this.setByBinaryString = function(binaryString) {
      binaryString = binaryString.replace(/0+$/, '');
      var unusedBits = 8 - binaryString.length % 8;
      if (unusedBits == 8) unusedBits = 0;
      for (var i = 0; i <= unusedBits; i++) {
        binaryString += '0';
      }
      var h = '';
      for (var i = 0; i < binaryString.length - 1; i += 8) {
        var b = binaryString.substr(i, 8);
        var x = parseInt(b, 2).toString(16);
        if (x.length == 1) x = '0' + x;
        h += x;
      }
      this.hTLV = null;
      this.isModified = true;
      this.hV = '0' + unusedBits + h;
    };

    /**
     * set ASN.1 TLV value(V) by an array of boolean
     * @name setByBooleanArray
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {array} booleanArray array of boolean (ex. [true, false, true])
     * @description
     * NOTE: Trailing falses will be ignored.
     */
    this.setByBooleanArray = function(booleanArray) {
      var s = '';
      for (var i = 0; i < booleanArray.length; i++) {
        if (booleanArray[i] == true) {
          s += '1';
        } else {
          s += '0';
        }
      }
      this.setByBinaryString(s);
    };

    /**
     * generate an array of false with specified length
     * @name newFalseArray
     * @memberOf KJUR.asn1.DERBitString
     * @function
     * @param {Integer} nLength length of array to generate
     * @return {array} array of boolean faluse
     * @description
     * This static method may be useful to initialize boolean array.
     */
    this.newFalseArray = function(nLength) {
      var a = new Array(nLength);
      for (var i = 0; i < nLength; i++) {
        a[i] = false;
      }
      return a;
    };

    this.getFreshValueHex = function() {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['hex'] != "undefined") {
        this.setHexValueIncludingUnusedBits(params['hex']);
      } else if (typeof params['bin'] != "undefined") {
        this.setByBinaryString(params['bin']);
      } else if (typeof params['array'] != "undefined") {
        this.setByBooleanArray(params['array']);
      }
    }
  };
  JSX.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);

// ********************************************************************
  /**
   * class for ASN.1 DER OctetString
   * @name KJUR.asn1.DEROctetString
   * @class class for ASN.1 DER OctetString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DEROctetString = function(params) {
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
    this.hT = "04";
  };
  JSX.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);

// ********************************************************************
  /**
   * class for ASN.1 DER Null
   * @name KJUR.asn1.DERNull
   * @class class for ASN.1 DER Null
   * @extends KJUR.asn1.ASN1Object
   * @description
   * @see KJUR.asn1.ASN1Object - superclass
   */
  KJUR.asn1.DERNull = function() {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500";
  };
  JSX.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);

// ********************************************************************
  /**
   * class for ASN.1 DER ObjectIdentifier
   * @name KJUR.asn1.DERObjectIdentifier
   * @class class for ASN.1 DER ObjectIdentifier
   * @param {Array} params associative array of parameters (ex. {'oid': '2.5.4.5'})
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>oid - specify initial ASN.1 value(V) by a oid string (ex. 2.5.4.13)</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERObjectIdentifier = function(params) {
    var itox = function(i) {
      var h = i.toString(16);
      if (h.length == 1) h = '0' + h;
      return h;
    };
    var roidtox = function(roid) {
      var h = '';
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7) padLen = 0;
      var bPad = '';
      for (var i = 0; i < padLen; i++) bPad += '0';
      b = bPad + b;
      for (var i = 0; i < b.length - 1; i += 7) {
        var b8 = b.substr(i, 7);
        if (i != b.length - 7) b8 = '1' + b8;
        h += itox(parseInt(b8, 2));
      }
      return h;
    }

    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";

    /**
     * set value by a hexadecimal string
     * @name setValueHex
     * @memberOf KJUR.asn1.DERObjectIdentifier
     * @function
     * @param {String} newHexString hexadecimal value of OID bytes
     */
    this.setValueHex = function(newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };

    /**
     * set value by a OID string
     * @name setValueOidString
     * @memberOf KJUR.asn1.DERObjectIdentifier
     * @function
     * @param {String} oidString OID string (ex. 2.5.4.13)
     */
    this.setValueOidString = function(oidString) {
      if (! oidString.match(/^[0-9.]+$/)) {
        throw "malformed oid string: " + oidString;
      }
      var h = '';
      var a = oidString.split('.');
      var i0 = parseInt(a[0]) * 40 + parseInt(a[1]);
      h += itox(i0);
      a.splice(0, 2);
      for (var i = 0; i < a.length; i++) {
        h += roidtox(a[i]);
      }
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = h;
    };

    /**
     * set value by a OID name
     * @name setValueName
     * @memberOf KJUR.asn1.DERObjectIdentifier
     * @function
     * @param {String} oidName OID name (ex. 'serverAuth')
     * @since 1.0.1
     * @description
     * OID name shall be defined in 'KJUR.asn1.x509.OID.name2oidList'.
     * Otherwise raise error.
     */
    this.setValueName = function(oidName) {
      if (typeof KJUR.asn1.x509.OID.name2oidList[oidName] != "undefined") {
        var oid = KJUR.asn1.x509.OID.name2oidList[oidName];
        this.setValueOidString(oid);
      } else {
        throw "DERObjectIdentifier oidName undefined: " + oidName;
      }
    };

    this.getFreshValueHex = function() {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['oid'] != "undefined") {
        this.setValueOidString(params['oid']);
      } else if (typeof params['hex'] != "undefined") {
        this.setValueHex(params['hex']);
      } else if (typeof params['name'] != "undefined") {
        this.setValueName(params['name']);
      }
    }
  };
  JSX.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);

// ********************************************************************
  /**
   * class for ASN.1 DER UTF8String
   * @name KJUR.asn1.DERUTF8String
   * @class class for ASN.1 DER UTF8String
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERUTF8String = function(params) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
    this.hT = "0c";
  };
  JSX.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);

// ********************************************************************
  /**
   * class for ASN.1 DER NumericString
   * @name KJUR.asn1.DERNumericString
   * @class class for ASN.1 DER NumericString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERNumericString = function(params) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
    this.hT = "12";
  };
  JSX.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);

// ********************************************************************
  /**
   * class for ASN.1 DER PrintableString
   * @name KJUR.asn1.DERPrintableString
   * @class class for ASN.1 DER PrintableString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERPrintableString = function(params) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
    this.hT = "13";
  };
  JSX.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);

// ********************************************************************
  /**
   * class for ASN.1 DER TeletexString
   * @name KJUR.asn1.DERTeletexString
   * @class class for ASN.1 DER TeletexString
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERTeletexString = function(params) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
    this.hT = "14";
  };
  JSX.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);

// ********************************************************************
  /**
   * class for ASN.1 DER IA5String
   * @name KJUR.asn1.DERIA5String
   * @class class for ASN.1 DER IA5String
   * @param {Array} params associative array of parameters (ex. {'str': 'aaa'})
   * @extends KJUR.asn1.DERAbstractString
   * @description
   * @see KJUR.asn1.DERAbstractString - superclass
   */
  KJUR.asn1.DERIA5String = function(params) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
    this.hT = "16";
  };
  JSX.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);

// ********************************************************************
  /**
   * class for ASN.1 DER UTCTime
   * @name KJUR.asn1.DERUTCTime
   * @class class for ASN.1 DER UTCTime
   * @param {Array} params associative array of parameters (ex. {'str': '130430235959Z'})
   * @extends KJUR.asn1.DERAbstractTime
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string (ex.'130430235959Z')</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * <li>date - specify Date object.</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   * <h4>EXAMPLES</h4>
   * @example
   * var d1 = new KJUR.asn1.DERUTCTime();
   * d1.setString('130430125959Z');
   *
   * var d2 = new KJUR.asn1.DERUTCTime({'str': '130430125959Z'});
   *
   * var d3 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
   */
  KJUR.asn1.DERUTCTime = function(params) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
    this.hT = "17";

    /**
     * set value by a Date object
     * @name setByDate
     * @memberOf KJUR.asn1.DERUTCTime
     * @function
     * @param {Date} dateObject Date object to set ASN.1 value(V)
     */
    this.setByDate = function(dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, 'utc');
      this.hV = stohex(this.s);
    };

    if (typeof params != "undefined") {
      if (typeof params['str'] != "undefined") {
        this.setString(params['str']);
      } else if (typeof params['hex'] != "undefined") {
        this.setStringHex(params['hex']);
      } else if (typeof params['date'] != "undefined") {
        this.setByDate(params['date']);
      }
    }
  };
  JSX.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);

// ********************************************************************
  /**
   * class for ASN.1 DER GeneralizedTime
   * @name KJUR.asn1.DERGeneralizedTime
   * @class class for ASN.1 DER GeneralizedTime
   * @param {Array} params associative array of parameters (ex. {'str': '20130430235959Z'})
   * @extends KJUR.asn1.DERAbstractTime
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>str - specify initial ASN.1 value(V) by a string (ex.'20130430235959Z')</li>
   * <li>hex - specify initial ASN.1 value(V) by a hexadecimal string</li>
   * <li>date - specify Date object.</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERGeneralizedTime = function(params) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
    this.hT = "18";

    /**
     * set value by a Date object
     * @name setByDate
     * @memberOf KJUR.asn1.DERGeneralizedTime
     * @function
     * @param {Date} dateObject Date object to set ASN.1 value(V)
     * @example
     * When you specify UTC time, use 'Date.UTC' method like this:<br/>
     * var o = new DERUTCTime();
     * var date = new Date(Date.UTC(2015, 0, 31, 23, 59, 59, 0)); #2015JAN31 23:59:59
     * o.setByDate(date);
     */
    this.setByDate = function(dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, 'gen');
      this.hV = stohex(this.s);
    };

    if (typeof params != "undefined") {
      if (typeof params['str'] != "undefined") {
        this.setString(params['str']);
      } else if (typeof params['hex'] != "undefined") {
        this.setStringHex(params['hex']);
      } else if (typeof params['date'] != "undefined") {
        this.setByDate(params['date']);
      }
    }
  };
  JSX.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);

// ********************************************************************
  /**
   * class for ASN.1 DER Sequence
   * @name KJUR.asn1.DERSequence
   * @class class for ASN.1 DER Sequence
   * @extends KJUR.asn1.DERAbstractStructured
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>array - specify array of ASN1Object to set elements of content</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERSequence = function(params) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
    this.hT = "30";
    this.getFreshValueHex = function() {
      var h = '';
      for (var i = 0; i < this.asn1Array.length; i++) {
        var asn1Obj = this.asn1Array[i];
        h += asn1Obj.getEncodedHex();
      }
      this.hV = h;
      return this.hV;
    };
  };
  JSX.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);

// ********************************************************************
  /**
   * class for ASN.1 DER Set
   * @name KJUR.asn1.DERSet
   * @class class for ASN.1 DER Set
   * @extends KJUR.asn1.DERAbstractStructured
   * @description
   * <br/>
   * As for argument 'params' for constructor, you can specify one of
   * following properties:
   * <ul>
   * <li>array - specify array of ASN1Object to set elements of content</li>
   * </ul>
   * NOTE: 'params' can be omitted.
   */
  KJUR.asn1.DERSet = function(params) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, params);
    this.hT = "31";
    this.getFreshValueHex = function() {
      var a = new Array();
      for (var i = 0; i < this.asn1Array.length; i++) {
        var asn1Obj = this.asn1Array[i];
        a.push(asn1Obj.getEncodedHex());
      }
      a.sort();
      this.hV = a.join('');
      return this.hV;
    };
  };
  JSX.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);

// ********************************************************************
  /**
   * class for ASN.1 DER TaggedObject
   * @name KJUR.asn1.DERTaggedObject
   * @class class for ASN.1 DER TaggedObject
   * @extends KJUR.asn1.ASN1Object
   * @description
   * <br/>
   * Parameter 'tagNoNex' is ASN.1 tag(T) value for this object.
   * For example, if you find '[1]' tag in a ASN.1 dump,
   * 'tagNoHex' will be 'a1'.
   * <br/>
   * As for optional argument 'params' for constructor, you can specify *ANY* of
   * following properties:
   * <ul>
   * <li>explicit - specify true if this is explicit tag otherwise false
   *     (default is 'true').</li>
   * <li>tag - specify tag (default is 'a0' which means [0])</li>
   * <li>obj - specify ASN1Object which is tagged</li>
   * </ul>
   * @example
   * d1 = new KJUR.asn1.DERUTF8String({'str':'a'});
   * d2 = new KJUR.asn1.DERTaggedObject({'obj': d1});
   * hex = d2.getEncodedHex();
   */
  KJUR.asn1.DERTaggedObject = function(params) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = '';
    this.isExplicit = true;
    this.asn1Object = null;

    /**
     * set value by an ASN1Object
     * @name setString
     * @memberOf KJUR.asn1.DERTaggedObject
     * @function
     * @param {Boolean} isExplicitFlag flag for explicit/implicit tag
     * @param {Integer} tagNoHex hexadecimal string of ASN.1 tag
     * @param {ASN1Object} asn1Object ASN.1 to encapsulate
     */
    this.setASN1Object = function(isExplicitFlag, tagNoHex, asn1Object) {
      this.hT = tagNoHex;
      this.isExplicit = isExplicitFlag;
      this.asn1Object = asn1Object;
      if (this.isExplicit) {
        this.hV = this.asn1Object.getEncodedHex();
        this.hTLV = null;
        this.isModified = true;
      } else {
        this.hV = null;
        this.hTLV = asn1Object.getEncodedHex();
        this.hTLV = this.hTLV.replace(/^../, tagNoHex);
        this.isModified = false;
      }
    };

    this.getFreshValueHex = function() {
      return this.hV;
    };

    if (typeof params != "undefined") {
      if (typeof params['tag'] != "undefined") {
        this.hT = params['tag'];
      }
      if (typeof params['explicit'] != "undefined") {
        this.isExplicit = params['explicit'];
      }
      if (typeof params['obj'] != "undefined") {
        this.asn1Object = params['obj'];
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
      }
    }
  };
  JSX.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
// Hex JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
  (function (undefined) {
    "use strict";

    var Hex = {},
      decoder;

    Hex.decode = function(a) {
      var i;
      if (decoder === undefined) {
        var hex = "0123456789ABCDEF",
          ignore = " \f\n\r\t\u00A0\u2028\u2029";
        decoder = [];
        for (i = 0; i < 16; ++i)
          decoder[hex.charAt(i)] = i;
        hex = hex.toLowerCase();
        for (i = 10; i < 16; ++i)
          decoder[hex.charAt(i)] = i;
        for (i = 0; i < ignore.length; ++i)
          decoder[ignore.charAt(i)] = -1;
      }
      var out = [],
        bits = 0,
        char_count = 0;
      for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == '=')
          break;
        c = decoder[c];
        if (c == -1)
          continue;
        if (c === undefined)
          throw 'Illegal character at offset ' + i;
        bits |= c;
        if (++char_count >= 2) {
          out[out.length] = bits;
          bits = 0;
          char_count = 0;
        } else {
          bits <<= 4;
        }
      }
      if (char_count)
        throw "Hex encoding incomplete: 4 bits missing";
      return out;
    };

// export globals
    window.Hex = Hex;
  })();
// Base64 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
  (function (undefined) {
    "use strict";

    var Base64 = {},
      decoder;

    Base64.decode = function (a) {
      var i;
      if (decoder === undefined) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          ignore = "= \f\n\r\t\u00A0\u2028\u2029";
        decoder = [];
        for (i = 0; i < 64; ++i)
          decoder[b64.charAt(i)] = i;
        for (i = 0; i < ignore.length; ++i)
          decoder[ignore.charAt(i)] = -1;
      }
      var out = [];
      var bits = 0, char_count = 0;
      for (i = 0; i < a.length; ++i) {
        var c = a.charAt(i);
        if (c == '=')
          break;
        c = decoder[c];
        if (c == -1)
          continue;
        if (c === undefined)
          throw 'Illegal character at offset ' + i;
        bits |= c;
        if (++char_count >= 4) {
          out[out.length] = (bits >> 16);
          out[out.length] = (bits >> 8) & 0xFF;
          out[out.length] = bits & 0xFF;
          bits = 0;
          char_count = 0;
        } else {
          bits <<= 6;
        }
      }
      switch (char_count) {
        case 1:
          throw "Base64 encoding incomplete: at least 2 bits missing";
        case 2:
          out[out.length] = (bits >> 10);
          break;
        case 3:
          out[out.length] = (bits >> 16);
          out[out.length] = (bits >> 8) & 0xFF;
          break;
      }
      return out;
    };

    Base64.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;
    Base64.unarmor = function (a) {
      var m = Base64.re.exec(a);
      if (m) {
        if (m[1])
          a = m[1];
        else if (m[2])
          a = m[2];
        else
          throw "RegExp out of sync";
      }
      return Base64.decode(a);
    };

// export globals
    window.Base64 = Base64;
  })();
// ASN.1 JavaScript decoder
// Copyright (c) 2008-2013 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

  /*jshint browser: true, strict: true, immed: true, latedef: true, undef: true, regexdash: false */
  /*global oids */
  (function (undefined) {
    "use strict";

    var hardLimit = 100,
      ellipsis = "\u2026",
      DOM = {
        tag: function (tagName, className) {
          var t = document.createElement(tagName);
          t.className = className;
          return t;
        },
        text: function (str) {
          return document.createTextNode(str);
        }
      };

    function Stream(enc, pos) {
      if (enc instanceof Stream) {
        this.enc = enc.enc;
        this.pos = enc.pos;
      } else {
        this.enc = enc;
        this.pos = pos;
      }
    }
    Stream.prototype.get = function (pos) {
      if (pos === undefined)
        pos = this.pos++;
      if (pos >= this.enc.length)
        throw 'Requesting byte offset ' + pos + ' on a stream of length ' + this.enc.length;
      return this.enc[pos];
    };
    Stream.prototype.hexDigits = "0123456789ABCDEF";
    Stream.prototype.hexByte = function (b) {
      return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);
    };
    Stream.prototype.hexDump = function (start, end, raw) {
      var s = "";
      for (var i = start; i < end; ++i) {
        s += this.hexByte(this.get(i));
        if (raw !== true)
          switch (i & 0xF) {
            case 0x7: s += "  "; break;
            case 0xF: s += "\n"; break;
            default:  s += " ";
          }
      }
      return s;
    };
    Stream.prototype.parseStringISO = function (start, end) {
      var s = "";
      for (var i = start; i < end; ++i)
        s += String.fromCharCode(this.get(i));
      return s;
    };
    Stream.prototype.parseStringUTF = function (start, end) {
      var s = "";
      for (var i = start; i < end; ) {
        var c = this.get(i++);
        if (c < 128)
          s += String.fromCharCode(c);
        else if ((c > 191) && (c < 224))
          s += String.fromCharCode(((c & 0x1F) << 6) | (this.get(i++) & 0x3F));
        else
          s += String.fromCharCode(((c & 0x0F) << 12) | ((this.get(i++) & 0x3F) << 6) | (this.get(i++) & 0x3F));
      }
      return s;
    };
    Stream.prototype.parseStringBMP = function (start, end) {
      var str = ""
      for (var i = start; i < end; i += 2) {
        var high_byte = this.get(i);
        var low_byte = this.get(i + 1);
        str += String.fromCharCode( (high_byte << 8) + low_byte );
      }

      return str;
    };
    Stream.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
    Stream.prototype.parseTime = function (start, end) {
      var s = this.parseStringISO(start, end),
        m = this.reTime.exec(s);
      if (!m)
        return "Unrecognized time: " + s;
      s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
      if (m[5]) {
        s += ":" + m[5];
        if (m[6]) {
          s += ":" + m[6];
          if (m[7])
            s += "." + m[7];
        }
      }
      if (m[8]) {
        s += " UTC";
        if (m[8] != 'Z') {
          s += m[8];
          if (m[9])
            s += ":" + m[9];
        }
      }
      return s;
    };
    Stream.prototype.parseInteger = function (start, end) {
      //TODO support negative numbers
      var len = end - start;
      if (len > 4) {
        len <<= 3;
        var s = this.get(start);
        if (s === 0)
          len -= 8;
        else
          while (s < 128) {
            s <<= 1;
            --len;
          }
        return "(" + len + " bit)";
      }
      var n = 0;
      for (var i = start; i < end; ++i)
        n = (n << 8) | this.get(i);
      return n;
    };
    Stream.prototype.parseBitString = function (start, end) {
      var unusedBit = this.get(start),
        lenBit = ((end - start - 1) << 3) - unusedBit,
        s = "(" + lenBit + " bit)";
      if (lenBit <= 20) {
        var skip = unusedBit;
        s += " ";
        for (var i = end - 1; i > start; --i) {
          var b = this.get(i);
          for (var j = skip; j < 8; ++j)
            s += (b >> j) & 1 ? "1" : "0";
          skip = 0;
        }
      }
      return s;
    };
    Stream.prototype.parseOctetString = function (start, end) {
      var len = end - start,
        s = "(" + len + " byte) ";
      if (len > hardLimit)
        end = start + hardLimit;
      for (var i = start; i < end; ++i)
        s += this.hexByte(this.get(i)); //TODO: also try Latin1?
      if (len > hardLimit)
        s += ellipsis;
      return s;
    };
    Stream.prototype.parseOID = function (start, end) {
      var s = '',
        n = 0,
        bits = 0;
      for (var i = start; i < end; ++i) {
        var v = this.get(i);
        n = (n << 7) | (v & 0x7F);
        bits += 7;
        if (!(v & 0x80)) { // finished
          if (s === '') {
            var m = n < 80 ? n < 40 ? 0 : 1 : 2;
            s = m + "." + (n - m * 40);
          } else
            s += "." + ((bits >= 31) ? "bigint" : n);
          n = bits = 0;
        }
      }
      return s;
    };

    function ASN1(stream, header, length, tag, sub) {
      this.stream = stream;
      this.header = header;
      this.length = length;
      this.tag = tag;
      this.sub = sub;
    }
    ASN1.prototype.typeName = function () {
      if (this.tag === undefined)
        return "unknown";
      var tagClass = this.tag >> 6,
        tagConstructed = (this.tag >> 5) & 1,
        tagNumber = this.tag & 0x1F;
      switch (tagClass) {
        case 0: // universal
          switch (tagNumber) {
            case 0x00: return "EOC";
            case 0x01: return "BOOLEAN";
            case 0x02: return "INTEGER";
            case 0x03: return "BIT_STRING";
            case 0x04: return "OCTET_STRING";
            case 0x05: return "NULL";
            case 0x06: return "OBJECT_IDENTIFIER";
            case 0x07: return "ObjectDescriptor";
            case 0x08: return "EXTERNAL";
            case 0x09: return "REAL";
            case 0x0A: return "ENUMERATED";
            case 0x0B: return "EMBEDDED_PDV";
            case 0x0C: return "UTF8String";
            case 0x10: return "SEQUENCE";
            case 0x11: return "SET";
            case 0x12: return "NumericString";
            case 0x13: return "PrintableString"; // ASCII subset
            case 0x14: return "TeletexString"; // aka T61String
            case 0x15: return "VideotexString";
            case 0x16: return "IA5String"; // ASCII
            case 0x17: return "UTCTime";
            case 0x18: return "GeneralizedTime";
            case 0x19: return "GraphicString";
            case 0x1A: return "VisibleString"; // ASCII subset
            case 0x1B: return "GeneralString";
            case 0x1C: return "UniversalString";
            case 0x1E: return "BMPString";
            default:   return "Universal_" + tagNumber.toString(16);
          }
        case 1: return "Application_" + tagNumber.toString(16);
        case 2: return "[" + tagNumber + "]"; // Context
        case 3: return "Private_" + tagNumber.toString(16);
      }
    };
    ASN1.prototype.reSeemsASCII = /^[ -~]+$/;
    ASN1.prototype.content = function () {
      if (this.tag === undefined)
        return null;
      var tagClass = this.tag >> 6,
        tagNumber = this.tag & 0x1F,
        content = this.posContent(),
        len = Math.abs(this.length);
      if (tagClass !== 0) { // universal
        if (this.sub !== null)
          return "(" + this.sub.length + " elem)";
        //TODO: TRY TO PARSE ASCII STRING
        var s = this.stream.parseStringISO(content, content + Math.min(len, hardLimit));
        if (this.reSeemsASCII.test(s))
          return s.substring(0, 2 * hardLimit) + ((s.length > 2 * hardLimit) ? ellipsis : "");
        else
          return this.stream.parseOctetString(content, content + len);
      }
      switch (tagNumber) {
        case 0x01: // BOOLEAN
          return (this.stream.get(content) === 0) ? "false" : "true";
        case 0x02: // INTEGER
          return this.stream.parseInteger(content, content + len);
        case 0x03: // BIT_STRING
          return this.sub ? "(" + this.sub.length + " elem)" :
            this.stream.parseBitString(content, content + len);
        case 0x04: // OCTET_STRING
          return this.sub ? "(" + this.sub.length + " elem)" :
            this.stream.parseOctetString(content, content + len);
        //case 0x05: // NULL
        case 0x06: // OBJECT_IDENTIFIER
          return this.stream.parseOID(content, content + len);
        //case 0x07: // ObjectDescriptor
        //case 0x08: // EXTERNAL
        //case 0x09: // REAL
        //case 0x0A: // ENUMERATED
        //case 0x0B: // EMBEDDED_PDV
        case 0x10: // SEQUENCE
        case 0x11: // SET
          return "(" + this.sub.length + " elem)";
        case 0x0C: // UTF8String
          return this.stream.parseStringUTF(content, content + len);
        case 0x12: // NumericString
        case 0x13: // PrintableString
        case 0x14: // TeletexString
        case 0x15: // VideotexString
        case 0x16: // IA5String
        //case 0x19: // GraphicString
        case 0x1A: // VisibleString
          //case 0x1B: // GeneralString
          //case 0x1C: // UniversalString
          return this.stream.parseStringISO(content, content + len);
        case 0x1E: // BMPString
          return this.stream.parseStringBMP(content, content + len);
        case 0x17: // UTCTime
        case 0x18: // GeneralizedTime
          return this.stream.parseTime(content, content + len);
      }
      return null;
    };
    ASN1.prototype.toString = function () {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? 'null' : this.sub.length) + "]";
    };
    ASN1.prototype.print = function (indent) {
      if (indent === undefined) indent = '';
      document.writeln(indent + this);
      if (this.sub !== null) {
        indent += '  ';
        for (var i = 0, max = this.sub.length; i < max; ++i)
          this.sub[i].print(indent);
      }
    };
    ASN1.prototype.toPrettyString = function (indent) {
      if (indent === undefined) indent = '';
      var s = indent + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0)
        s += "+";
      s += this.length;
      if (this.tag & 0x20)
        s += " (constructed)";
      else if (((this.tag == 0x03) || (this.tag == 0x04)) && (this.sub !== null))
        s += " (encapsulates)";
      s += "\n";
      if (this.sub !== null) {
        indent += '  ';
        for (var i = 0, max = this.sub.length; i < max; ++i)
          s += this.sub[i].toPrettyString(indent);
      }
      return s;
    };
    ASN1.prototype.toDOM = function () {
      var node = DOM.tag("div", "node");
      node.asn1 = this;
      var head = DOM.tag("div", "head");
      var s = this.typeName().replace(/_/g, " ");
      head.innerHTML = s;
      var content = this.content();
      if (content !== null) {
        content = String(content).replace(/</g, "&lt;");
        var preview = DOM.tag("span", "preview");
        preview.appendChild(DOM.text(content));
        head.appendChild(preview);
      }
      node.appendChild(head);
      this.node = node;
      this.head = head;
      var value = DOM.tag("div", "value");
      s = "Offset: " + this.stream.pos + "<br/>";
      s += "Length: " + this.header + "+";
      if (this.length >= 0)
        s += this.length;
      else
        s += (-this.length) + " (undefined)";
      if (this.tag & 0x20)
        s += "<br/>(constructed)";
      else if (((this.tag == 0x03) || (this.tag == 0x04)) && (this.sub !== null))
        s += "<br/>(encapsulates)";
      //TODO if (this.tag == 0x03) s += "Unused bits: "
      if (content !== null) {
        s += "<br/>Value:<br/><b>" + content + "</b>";
        if ((typeof oids === 'object') && (this.tag == 0x06)) {
          var oid = oids[content];
          if (oid) {
            if (oid.d) s += "<br/>" + oid.d;
            if (oid.c) s += "<br/>" + oid.c;
            if (oid.w) s += "<br/>(warning!)";
          }
        }
      }
      value.innerHTML = s;
      node.appendChild(value);
      var sub = DOM.tag("div", "sub");
      if (this.sub !== null) {
        for (var i = 0, max = this.sub.length; i < max; ++i)
          sub.appendChild(this.sub[i].toDOM());
      }
      node.appendChild(sub);
      head.onclick = function () {
        node.className = (node.className == "node collapsed") ? "node" : "node collapsed";
      };
      return node;
    };
    ASN1.prototype.posStart = function () {
      return this.stream.pos;
    };
    ASN1.prototype.posContent = function () {
      return this.stream.pos + this.header;
    };
    ASN1.prototype.posEnd = function () {
      return this.stream.pos + this.header + Math.abs(this.length);
    };
    ASN1.prototype.fakeHover = function (current) {
      this.node.className += " hover";
      if (current)
        this.head.className += " hover";
    };
    ASN1.prototype.fakeOut = function (current) {
      var re = / ?hover/;
      this.node.className = this.node.className.replace(re, "");
      if (current)
        this.head.className = this.head.className.replace(re, "");
    };
    ASN1.prototype.toHexDOM_sub = function (node, className, stream, start, end) {
      if (start >= end)
        return;
      var sub = DOM.tag("span", className);
      sub.appendChild(DOM.text(
        stream.hexDump(start, end)));
      node.appendChild(sub);
    };
    ASN1.prototype.toHexDOM = function (root) {
      var node = DOM.tag("span", "hex");
      if (root === undefined) root = node;
      this.head.hexNode = node;
      this.head.onmouseover = function () { this.hexNode.className = "hexCurrent"; };
      this.head.onmouseout  = function () { this.hexNode.className = "hex"; };
      node.asn1 = this;
      node.onmouseover = function () {
        var current = !root.selected;
        if (current) {
          root.selected = this.asn1;
          this.className = "hexCurrent";
        }
        this.asn1.fakeHover(current);
      };
      node.onmouseout  = function () {
        var current = (root.selected == this.asn1);
        this.asn1.fakeOut(current);
        if (current) {
          root.selected = null;
          this.className = "hex";
        }
      };
      this.toHexDOM_sub(node, "tag", this.stream, this.posStart(), this.posStart() + 1);
      this.toHexDOM_sub(node, (this.length >= 0) ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent());
      if (this.sub === null)
        node.appendChild(DOM.text(
          this.stream.hexDump(this.posContent(), this.posEnd())));
      else if (this.sub.length > 0) {
        var first = this.sub[0];
        var last = this.sub[this.sub.length - 1];
        this.toHexDOM_sub(node, "intro", this.stream, this.posContent(), first.posStart());
        for (var i = 0, max = this.sub.length; i < max; ++i)
          node.appendChild(this.sub[i].toHexDOM(root));
        this.toHexDOM_sub(node, "outro", this.stream, last.posEnd(), this.posEnd());
      }
      return node;
    };
    ASN1.prototype.toHexString = function (root) {
      return this.stream.hexDump(this.posStart(), this.posEnd(), true);
    };
    ASN1.decodeLength = function (stream) {
      var buf = stream.get(),
        len = buf & 0x7F;
      if (len == buf)
        return len;
      if (len > 3)
        throw "Length over 24 bits not supported at position " + (stream.pos - 1);
      if (len === 0)
        return -1; // undefined
      buf = 0;
      for (var i = 0; i < len; ++i)
        buf = (buf << 8) | stream.get();
      return buf;
    };
    ASN1.hasContent = function (tag, len, stream) {
      if (tag & 0x20) // constructed
        return true;
      if ((tag < 0x03) || (tag > 0x04))
        return false;
      var p = new Stream(stream);
      if (tag == 0x03) p.get(); // BitString unused bits, must be in [0, 7]
      var subTag = p.get();
      if ((subTag >> 6) & 0x01) // not (universal or context)
        return false;
      try {
        var subLength = ASN1.decodeLength(p);
        return ((p.pos - stream.pos) + subLength == len);
      } catch (exception) {
        return false;
      }
    };
    ASN1.decode = function (stream) {
      if (!(stream instanceof Stream))
        stream = new Stream(stream, 0);
      var streamStart = new Stream(stream),
        tag = stream.get(),
        len = ASN1.decodeLength(stream),
        header = stream.pos - streamStart.pos,
        sub = null;
      if (ASN1.hasContent(tag, len, stream)) {
        // it has content, so we decode it
        var start = stream.pos;
        if (tag == 0x03) stream.get(); // skip BitString unused bits, must be in [0, 7]
        sub = [];
        if (len >= 0) {
          // definite length
          var end = start + len;
          while (stream.pos < end)
            sub[sub.length] = ASN1.decode(stream);
          if (stream.pos != end)
            throw "Content size is not correct for container starting at offset " + start;
        } else {
          // undefined length
          try {
            for (;;) {
              var s = ASN1.decode(stream);
              if (s.tag === 0)
                break;
              sub[sub.length] = s;
            }
            len = start - stream.pos;
          } catch (e) {
            throw "Exception while decoding undefined length content: " + e;
          }
        }
      } else
        stream.pos += len; // skip content
      return new ASN1(streamStart, header, len, tag, sub);
    };
    ASN1.test = function () {
      var test = [
        { value: [0x27],                   expected: 0x27     },
        { value: [0x81, 0xC9],             expected: 0xC9     },
        { value: [0x83, 0xFE, 0xDC, 0xBA], expected: 0xFEDCBA }
      ];
      for (var i = 0, max = test.length; i < max; ++i) {
        var pos = 0,
          stream = new Stream(test[i].value, 0),
          res = ASN1.decodeLength(stream);
        if (res != test[i].expected)
          document.write("In test[" + i + "] expected " + test[i].expected + " got " + res + "\n");
      }
    };

// export globals
    window.ASN1 = ASN1;
  })();
  /**
   * Retrieve the hexadecimal value (as a string) of the current ASN.1 element
   * @returns {string}
   * @public
   */
  ASN1.prototype.getHexStringValue = function () {
    var hexString = this.toHexString();
    var offset = this.header * 2;
    var length = this.length * 2;
    return hexString.substr(offset, length);
  };

  /**
   * Method to parse a pem encoded string containing both a public or private key.
   * The method will translate the pem encoded string in a der encoded string and
   * will parse private key and public key parameters. This method accepts public key
   * in the rsaencryption pkcs #1 format (oid: 1.2.840.113549.1.1.1).
   *
   * @todo Check how many rsa formats use the same format of pkcs #1.
   *
   * The format is defined as:
   * PublicKeyInfo ::= SEQUENCE {
 *   algorithm       AlgorithmIdentifier,
 *   PublicKey       BIT STRING
 * }
   * Where AlgorithmIdentifier is:
   * AlgorithmIdentifier ::= SEQUENCE {
 *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
 *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
 * }
   * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
   * RSAPublicKey ::= SEQUENCE {
 *   modulus           INTEGER,  -- n
 *   publicExponent    INTEGER   -- e
 * }
   * it's possible to examine the structure of the keys obtained from openssl using
   * an asn.1 dumper as the one used here to parse the components: http://lapo.it/asn1js/
   * @argument {string} pem the pem encoded string, can include the BEGIN/END header/footer
   * @private
   */
  RSAKey.prototype.parseKey = function (pem) {
    try {
      var modulus = 0;
      var public_exponent = 0;
      var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
      var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
      var asn1 = ASN1.decode(der);

      //Fixes a bug with OpenSSL 1.0+ private keys
      if(asn1.sub.length === 3){
        asn1 = asn1.sub[2].sub[0];
      }
      if (asn1.sub.length === 9) {

        // Parse the private key.
        modulus = asn1.sub[1].getHexStringValue(); //bigint
        this.n = parseBigInt(modulus, 16);

        public_exponent = asn1.sub[2].getHexStringValue(); //int
        this.e = parseInt(public_exponent, 16);

        var private_exponent = asn1.sub[3].getHexStringValue(); //bigint
        this.d = parseBigInt(private_exponent, 16);

        var prime1 = asn1.sub[4].getHexStringValue(); //bigint
        this.p = parseBigInt(prime1, 16);

        var prime2 = asn1.sub[5].getHexStringValue(); //bigint
        this.q = parseBigInt(prime2, 16);

        var exponent1 = asn1.sub[6].getHexStringValue(); //bigint
        this.dmp1 = parseBigInt(exponent1, 16);

        var exponent2 = asn1.sub[7].getHexStringValue(); //bigint
        this.dmq1 = parseBigInt(exponent2, 16);

        var coefficient = asn1.sub[8].getHexStringValue(); //bigint
        this.coeff = parseBigInt(coefficient, 16);

      }
      else if (asn1.sub.length === 2) {

        // Parse the public key.
        var bit_string = asn1.sub[1];
        var sequence = bit_string.sub[0];

        modulus = sequence.sub[0].getHexStringValue();
        this.n = parseBigInt(modulus, 16);
        public_exponent = sequence.sub[1].getHexStringValue();
        this.e = parseInt(public_exponent, 16);

      }
      else {
        return false;
      }
      return true;
    }
    catch (ex) {
      return false;
    }
  };

  /**
   * Translate rsa parameters in a hex encoded string representing the rsa key.
   *
   * The translation follow the ASN.1 notation :
   * RSAPrivateKey ::= SEQUENCE {
 *   version           Version,
 *   modulus           INTEGER,  -- n
 *   publicExponent    INTEGER,  -- e
 *   privateExponent   INTEGER,  -- d
 *   prime1            INTEGER,  -- p
 *   prime2            INTEGER,  -- q
 *   exponent1         INTEGER,  -- d mod (p1)
 *   exponent2         INTEGER,  -- d mod (q-1)
 *   coefficient       INTEGER,  -- (inverse of q) mod p
 * }
   * @returns {string}  DER Encoded String representing the rsa private key
   * @private
   */
  RSAKey.prototype.getPrivateBaseKey = function () {
    var options = {
      'array': [
        new KJUR.asn1.DERInteger({'int': 0}),
        new KJUR.asn1.DERInteger({'bigint': this.n}),
        new KJUR.asn1.DERInteger({'int': this.e}),
        new KJUR.asn1.DERInteger({'bigint': this.d}),
        new KJUR.asn1.DERInteger({'bigint': this.p}),
        new KJUR.asn1.DERInteger({'bigint': this.q}),
        new KJUR.asn1.DERInteger({'bigint': this.dmp1}),
        new KJUR.asn1.DERInteger({'bigint': this.dmq1}),
        new KJUR.asn1.DERInteger({'bigint': this.coeff})
      ]
    };
    var seq = new KJUR.asn1.DERSequence(options);
    return seq.getEncodedHex();
  };

  /**
   * base64 (pem) encoded version of the DER encoded representation
   * @returns {string} pem encoded representation without header and footer
   * @public
   */
  RSAKey.prototype.getPrivateBaseKeyB64 = function () {
    return hex2b64(this.getPrivateBaseKey());
  };

  /**
   * Translate rsa parameters in a hex encoded string representing the rsa public key.
   * The representation follow the ASN.1 notation :
   * PublicKeyInfo ::= SEQUENCE {
 *   algorithm       AlgorithmIdentifier,
 *   PublicKey       BIT STRING
 * }
   * Where AlgorithmIdentifier is:
   * AlgorithmIdentifier ::= SEQUENCE {
 *   algorithm       OBJECT IDENTIFIER,     the OID of the enc algorithm
 *   parameters      ANY DEFINED BY algorithm OPTIONAL (NULL for PKCS #1)
 * }
   * and PublicKey is a SEQUENCE encapsulated in a BIT STRING
   * RSAPublicKey ::= SEQUENCE {
 *   modulus           INTEGER,  -- n
 *   publicExponent    INTEGER   -- e
 * }
   * @returns {string} DER Encoded String representing the rsa public key
   * @private
   */
  RSAKey.prototype.getPublicBaseKey = function () {
    var options = {
      'array': [
        new KJUR.asn1.DERObjectIdentifier({'oid': '1.2.840.113549.1.1.1'}), //RSA Encryption pkcs #1 oid
        new KJUR.asn1.DERNull()
      ]
    };
    var first_sequence = new KJUR.asn1.DERSequence(options);

    options = {
      'array': [
        new KJUR.asn1.DERInteger({'bigint': this.n}),
        new KJUR.asn1.DERInteger({'int': this.e})
      ]
    };
    var second_sequence = new KJUR.asn1.DERSequence(options);

    options = {
      'hex': '00' + second_sequence.getEncodedHex()
    };
    var bit_string = new KJUR.asn1.DERBitString(options);

    options = {
      'array': [
        first_sequence,
        bit_string
      ]
    };
    var seq = new KJUR.asn1.DERSequence(options);
    return seq.getEncodedHex();
  };

  /**
   * base64 (pem) encoded version of the DER encoded representation
   * @returns {string} pem encoded representation without header and footer
   * @public
   */
  RSAKey.prototype.getPublicBaseKeyB64 = function () {
    return hex2b64(this.getPublicBaseKey());
  };

  /**
   * wrap the string in block of width chars. The default value for rsa keys is 64
   * characters.
   * @param {string} str the pem encoded string without header and footer
   * @param {Number} [width=64] - the length the string has to be wrapped at
   * @returns {string}
   * @private
   */
  RSAKey.prototype.wordwrap = function (str, width) {
    width = width || 64;
    if (!str) {
      return str;
    }
    var regex = '(.{1,' + width + '})( +|$\n?)|(.{1,' + width + '})';
    return str.match(RegExp(regex, 'g')).join('\n');
  };

  /**
   * Retrieve the pem encoded private key
   * @returns {string} the pem encoded private key with header/footer
   * @public
   */
  RSAKey.prototype.getPrivateKey = function () {
    var key = "-----BEGIN RSA PRIVATE KEY-----\n";
    key += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
    key += "-----END RSA PRIVATE KEY-----";
    return key;
  };

  /**
   * Retrieve the pem encoded public key
   * @returns {string} the pem encoded public key with header/footer
   * @public
   */
  RSAKey.prototype.getPublicKey = function () {
    var key = "-----BEGIN PUBLIC KEY-----\n";
    key += this.wordwrap(this.getPublicBaseKeyB64()) + "\n";
    key += "-----END PUBLIC KEY-----";
    return key;
  };

  /**
   * Check if the object contains the necessary parameters to populate the rsa modulus
   * and public exponent parameters.
   * @param {Object} [obj={}] - An object that may contain the two public key
   * parameters
   * @returns {boolean} true if the object contains both the modulus and the public exponent
   * properties (n and e)
   * @todo check for types of n and e. N should be a parseable bigInt object, E should
   * be a parseable integer number
   * @private
   */
  RSAKey.prototype.hasPublicKeyProperty = function (obj) {
    obj = obj || {};
    return (
      obj.hasOwnProperty('n') &&
      obj.hasOwnProperty('e')
    );
  };

  /**
   * Check if the object contains ALL the parameters of an RSA key.
   * @param {Object} [obj={}] - An object that may contain nine rsa key
   * parameters
   * @returns {boolean} true if the object contains all the parameters needed
   * @todo check for types of the parameters all the parameters but the public exponent
   * should be parseable bigint objects, the public exponent should be a parseable integer number
   * @private
   */
  RSAKey.prototype.hasPrivateKeyProperty = function (obj) {
    obj = obj || {};
    return (
      obj.hasOwnProperty('n') &&
      obj.hasOwnProperty('e') &&
      obj.hasOwnProperty('d') &&
      obj.hasOwnProperty('p') &&
      obj.hasOwnProperty('q') &&
      obj.hasOwnProperty('dmp1') &&
      obj.hasOwnProperty('dmq1') &&
      obj.hasOwnProperty('coeff')
    );
  };

  /**
   * Parse the properties of obj in the current rsa object. Obj should AT LEAST
   * include the modulus and public exponent (n, e) parameters.
   * @param {Object} obj - the object containing rsa parameters
   * @private
   */
  RSAKey.prototype.parsePropertiesFrom = function (obj) {
    this.n = obj.n;
    this.e = obj.e;

    if (obj.hasOwnProperty('d')) {
      this.d = obj.d;
      this.p = obj.p;
      this.q = obj.q;
      this.dmp1 = obj.dmp1;
      this.dmq1 = obj.dmq1;
      this.coeff = obj.coeff;
    }
  };

  /**
   * Create a new JSEncryptRSAKey that extends Tom Wu's RSA key object.
   * This object is just a decorator for parsing the key parameter
   * @param {string|Object} key - The key in string format, or an object containing
   * the parameters needed to build a RSAKey object.
   * @constructor
   */
  var JSEncryptRSAKey = function (key) {
    // Call the super constructor.
    RSAKey.call(this);
    // If a key key was provided.
    if (key) {
      // If this is a string...
      if (typeof key === 'string') {
        this.parseKey(key);
      }
      else if (
        this.hasPrivateKeyProperty(key) ||
        this.hasPublicKeyProperty(key)
      ) {
        // Set the values for the key.
        this.parsePropertiesFrom(key);
      }
    }
  };

// Derive from RSAKey.
  JSEncryptRSAKey.prototype = new RSAKey();

// Reset the contructor.
  JSEncryptRSAKey.prototype.constructor = JSEncryptRSAKey;


  /**
   *
   * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
   * possible parameters are:
   * - default_key_size        {number}  default: 1024 the key size in bit
   * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
   * - log                     {boolean} default: false whether log warn/error or not
   * @constructor
   */
  var JSEncrypt = function (options) {
    options = options || {};
    this.default_key_size = parseInt(options.default_key_size) || 1024;
    this.default_public_exponent = options.default_public_exponent || '010001'; //65537 default openssl public exponent for rsa key type
    this.log = options.log || false;
    // The private and public key.
    this.key = null;
  };

  /**
   * Method to set the rsa key parameter (one method is enough to set both the public
   * and the private key, since the private key contains the public key paramenters)
   * Log a warning if logs are enabled
   * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
   * @public
   */
  JSEncrypt.prototype.setKey = function (key) {
    if (this.log && this.key) {
      console.warn('A key was already set, overriding existing.');
    }
    this.key = new JSEncryptRSAKey(key);
  };

  /**
   * Proxy method for setKey, for api compatibility
   * @see setKey
   * @public
   */
  JSEncrypt.prototype.setPrivateKey = function (privkey) {
    // Create the key.
    this.setKey(privkey);
  };

  /**
   * Proxy method for setKey, for api compatibility
   * @see setKey
   * @public
   */
  JSEncrypt.prototype.setPublicKey = function (pubkey) {
    // Sets the public key.
    this.setKey(pubkey);
  };

  /**
   * Proxy method for RSAKey object's decrypt, decrypt the string using the private
   * components of the rsa key object. Note that if the object was not set will be created
   * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
   * @param {string} string base64 encoded crypted string to decrypt
   * @return {string} the decrypted string
   * @public
   */
  JSEncrypt.prototype.decrypt = function (string) {
    // Return the decrypted string.
    try {
      return this.getKey().decrypt(b64tohex(string));
    }
    catch (ex) {
      return false;
    }
  };

  /**
   * Proxy method for RSAKey object's encrypt, encrypt the string using the public
   * components of the rsa key object. Note that if the object was not set will be created
   * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
   * @param {string} string the string to encrypt
   * @return {string} the encrypted string encoded in base64
   * @public
   */
  JSEncrypt.prototype.encrypt = function (string) {
    // Return the encrypted string.
    try {
      return hex2b64(this.getKey().encrypt(string));
    }
    catch (ex) {
      return false;
    }
  };

  /**
   * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
   * will be created and returned
   * @param {callback} [cb] the callback to be called if we want the key to be generated
   * in an async fashion
   * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
   * @public
   */
  JSEncrypt.prototype.getKey = function (cb) {
    // Only create new if it does not exist.
    if (!this.key) {
      // Get a new private key.
      this.key = new JSEncryptRSAKey();
      if (cb && {}.toString.call(cb) === '[object Function]') {
        this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
        return;
      }
      // Generate the key.
      this.key.generate(this.default_key_size, this.default_public_exponent);
    }
    return this.key;
  };

  /**
   * Returns the pem encoded representation of the private key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the private key WITH header and footer
   * @public
   */
  JSEncrypt.prototype.getPrivateKey = function () {
    // Return the private representation of this key.
    return this.getKey().getPrivateKey();
  };

  /**
   * Returns the pem encoded representation of the private key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the private key WITHOUT header and footer
   * @public
   */
  JSEncrypt.prototype.getPrivateKeyB64 = function () {
    // Return the private representation of this key.
    return this.getKey().getPrivateBaseKeyB64();
  };


  /**
   * Returns the pem encoded representation of the public key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the public key WITH header and footer
   * @public
   */
  JSEncrypt.prototype.getPublicKey = function () {
    // Return the private representation of this key.
    return this.getKey().getPublicKey();
  };

  /**
   * Returns the pem encoded representation of the public key
   * If the key doesn't exists a new key will be created
   * @returns {string} pem encoded representation of the public key WITHOUT header and footer
   * @public
   */
  JSEncrypt.prototype.getPublicKeyB64 = function () {
    // Return the private representation of this key.
    return this.getKey().getPublicBaseKeyB64();
  };


  JSEncrypt.version = '2.3.1';
  exports.JSEncrypt = JSEncrypt;
});


/***/ }),

/***/ "../../../../../src/app/dashboard/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\" style=\"text-align:center;\">\n    <div class=\"col-sm-12\">\n      <i class=\"fa fa-cloud\" style=\"font-size:100px; width: 100%\"></i>\n      <h1>BitStream</h1>\n      <button class=\"btn btn-primary\" [routerLink]=\"['/files']\">Get started</button>\n      <h2 style=\"margin-top: 30px;\">Publish your files to the world anonymously and without censorship.</h2>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "i, h1, h2, button, p {\n  color: #fff; }\n\ni {\n  margin-top: 60px; }\n\nbody {\n  background: url(\"https://media.coindesk.com/uploads/2017/08/Blockstream_Satellite_Image.png\"); }\n\nbutton {\n  margin-top: 25px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginComponent = /** @class */ (function () {
    function LoginComponent() {
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/dashboard/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LoginComponent);
    return LoginComponent;
}());

//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/music/music.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>&#9776;</button>\n  <ul class=\"nav navbar-nav mr-auto d-md-down-none\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler\" href=\"#\" appSidebarToggler>&#9776;</a>\n    </li>\n  </ul>\n</header>\n\n<ol class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n  <li class=\"breadcrumb-item active\"><a href=\"#\">Music</a></li>\n</ol>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <app-sidebar></app-sidebar>\n  </div>\n\n  <main class=\"card\" style=\"width: 100%\">\n\n    <div class=\"container\">\n      <div class=\"row\" *ngIf=\"!uploadedMusic.length\">\n        <div class=\"col-sm-12\">\n          <h2>You have not uploaded any music.</h2>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"uploadedMusic && uploadedMusic.length\">\n        <div class=\"col-sm-12\">\n          <h2>Music</h2>\n        </div>\n      </div>\n\n      <div *ngFor=\"let file of uploadedMusic\">\n        <div class=\"row\">\n          <div class=\"col-sm-12\">\n            <audio controls>\n              <source src=\"https://ipfs.io/ipfs/{{file.url}}\" type=\"{{file.type}}\">\n              Your browser does not support the audio element.\n            </audio>\n          </div>\n          <div class=\"col-sm-12\" style=\"padding-top: 20px;\">\n            <div class=\"col-sm-6\"><strong>File Name:</strong></div>\n            <div class=\"col-sm-6\">{{file.name}}</div>\n            <br />\n            <div class=\"col-sm-6\"><strong>File Type:</strong></div>\n            <div class=\"col-sm-6\">{{file.type}}</div>\n            <br />\n            <br />\n            <br />\n            <div class=\"col-sm-6\">\n              <a href=\"https://ipfs.io/ipfs/{{file.url}}\" target=\"_blank\">\n                IPFS Link\n              </a>\n            </div>\n          </div>\n          <hr />\n        </div>\n      </div>\n\n    </div>\n\n  </main>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/music/music.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h2 {\n  margin-top: 40px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/music/music.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MusicComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MusicComponent = /** @class */ (function () {
    function MusicComponent() {
        this.uploadedFiles = localStorage.getItem('uploadedFiles') ? JSON.parse(localStorage.getItem('uploadedFiles')) : null;
        this.uploadedMusic = [];
        if (this.uploadedFiles) {
            for (var i = 0; i <= this.uploadedFiles.length; i++) {
                if (this.isAudio(this.uploadedFiles[i].name)) {
                    this.uploadedMusic.push(this.uploadedFiles[i]);
                }
            }
        }
    }
    MusicComponent.prototype.isAudio = function (type) {
        return type.indexOf('mp3') > 0 || type.indexOf('wav') > 0 || type.indexOf('ogg') > 0;
    };
    MusicComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-music',
            template: __webpack_require__("../../../../../src/app/dashboard/music/music.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/music/music.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MusicComponent);
    return MusicComponent;
}());

//# sourceMappingURL=music.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/network/network.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  network works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/network/network.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/network/network.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NetworkComponent = /** @class */ (function () {
    function NetworkComponent() {
    }
    NetworkComponent.prototype.ngOnInit = function () {
    };
    NetworkComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-network',
            template: __webpack_require__("../../../../../src/app/dashboard/network/network.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/network/network.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NetworkComponent);
    return NetworkComponent;
}());

//# sourceMappingURL=network.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/photos/photos.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>&#9776;</button>\n  <ul class=\"nav navbar-nav mr-auto d-md-down-none\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler\" href=\"#\" appSidebarToggler>&#9776;</a>\n    </li>\n  </ul>\n</header>\n\n<ol class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n  <li class=\"breadcrumb-item active\"><a href=\"#\">Gallery</a></li>\n</ol>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <app-sidebar active=\"photos\"></app-sidebar>\n  </div>\n  <main class=\"card\" style=\"width: 100%\">\n\n    <div class=\"container\">\n\n      <div class=\"row\" *ngIf=\"!uploadedPhotos.length\">\n        <div class=\"col-sm-12\">\n          <h2>You have not uploaded any photos.</h2>\n        </div>\n      </div>\n\n    </div>\n\n    <div class=\"container\">\n      <div class=\"row\"  *ngFor=\"let file of uploadedPhotos\">\n          <div class=\"col-sm-4 col-md-6\">\n            <img style=\"width:100%\" class=\"item\" src=\"https://ipfs.io/ipfs/{{file.url}}\" alt=\"{{file.name}}\" />\n          </div>\n          <div class=\"col-sm-8 col-md-6\" style=\"margin: 20px;\">\n            <div class=\"col-sm-6\"><strong>File Name:</strong></div>\n            <div class=\"col-sm-6\">{{file.name}}</div>\n            <br />\n            <div class=\"col-sm-6\"><strong>File Type:</strong></div>\n            <div class=\"col-sm-6\">{{file.type}}</div>\n            <br />\n            <br />\n            <br />\n            <div class=\"col-sm-6\">\n              <a href=\"https://ipfs.io/ipfs/{{file.url}}\" target=\"_blank\">\n                IPFS Link\n              </a>\n            </div>\n          </div>\n        <hr />\n      </div>\n    </div>\n  </main>\n</div>\n\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/photos/photos.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h2 {\n  margin-top: 40px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/photos/photos.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotosComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__files_ipfs_file_explorer_ipfs_service__ = __webpack_require__("../../../../../src/app/dashboard/files/ipfs-file-explorer/ipfs.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PhotosComponent = /** @class */ (function () {
    function PhotosComponent(ipfsService) {
        this.ipfsService = ipfsService;
        this.uploadedFiles = localStorage.getItem('uploadedFiles') ? JSON.parse(localStorage.getItem('uploadedFiles')) : null;
        this.uploadedPhotos = [];
        if (this.uploadedFiles) {
            for (var i = 0; i <= this.uploadedFiles.length; i++) {
                if (this.uploadedFiles[i] && this.uploadedFiles[i].name && this.isImage(this.uploadedFiles[i].name)) {
                    this.uploadedPhotos.push(this.uploadedFiles[i]);
                }
            }
        }
    }
    PhotosComponent.prototype.isImage = function (type) {
        return type.indexOf('jpg') > 0 ||
            type.indexOf('jpeg') > 0 ||
            type.indexOf('png') > 0 ||
            type.indexOf('ico') > 0;
    };
    PhotosComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-photos',
            template: __webpack_require__("../../../../../src/app/dashboard/photos/photos.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/photos/photos.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__files_ipfs_file_explorer_ipfs_service__["a" /* IpfsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__files_ipfs_file_explorer_ipfs_service__["a" /* IpfsService */]) === "function" && _a || Object])
    ], PhotosComponent);
    return PhotosComponent;
    var _a;
}());

//# sourceMappingURL=photos.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <nav class=\"sidebar-nav\">\n      <ul class=\"nav\">\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\">\n            <i class=\"icon-layers\"></i> Dashboard\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/files']\">\n            <i class=\"icon-briefcase\"></i> Recent Files\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/contacts']\">\n            <i class=\"icon-people\"></i> Contacts\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/music']\">\n            <i class=\"icon-music-tone\"></i> Music\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/video']\">\n            <i class=\"icon-film\"></i> Video\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/camera']\">\n            <i class=\"icon-camera\"></i> Camera\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/chat']\">\n            <i class=\"icon-speech\"></i> Chat\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/wallet']\">\n            <i class=\"icon-wallet\"></i> Wallet (Top up)\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/settings']\">\n            <i class=\"icon-settings\"></i> Settings\n          </a>\n        </li>\n      </ul>\n    </nav>\n  </div>\n\n  <main class=\"\">\n    <div class=\"animated fadeIn\" style=\"background-image: url('assets/img/background.jpeg'); background-repeat: no-repeat; min-height: 1000px; max-width: 100%; background-size: cover;\">\n\n      <div class=\"card\">\n\n      </div>\n\n    </div>\n  </main>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/settings.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/settings/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsComponent = /** @class */ (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__("../../../../../src/app/dashboard/settings/settings.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/settings/settings.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
}());

//# sourceMappingURL=settings.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/sidebar/sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"sidebar-nav\">\n  <ul class=\"nav\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link\" [routerLink]=\"['/files']\">\n        <i class=\"fa fa-folder-open\" aria-hidden=\"true\"></i> IPFS\n      </a>\n      <a class=\"nav-link\" [routerLink]=\"['/storage']\">\n        <i class=\"fa fa-cloud\" aria-hidden=\"true\"></i> WebTorrent\n      </a>\n    </li>\n  </ul>\n</nav>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/sidebar/sidebar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".nav-link i {\n  padding: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/sidebar/sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], SidebarComponent.prototype, "active", void 0);
    SidebarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__("../../../../../src/app/dashboard/sidebar/sidebar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/sidebar/sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SidebarComponent);
    return SidebarComponent;
}());

//# sourceMappingURL=sidebar.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/storage/storage.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>&#9776;</button>\n  <ul class=\"nav navbar-nav mr-auto d-md-down-none\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler\" href=\"#\" appSidebarToggler>&#9776;</a>\n    </li>\n  </ul>\n</header>\n\n<ol class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n  <li class=\"breadcrumb-item active\"><a href=\"#\">WebTorrent</a></li>\n</ol>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <app-sidebar active=\"storage\"></app-sidebar>\n  </div>\n  <main class=\"card\" style=\"width: 100%; padding-top: 40px;\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <h2>WebTorrent</h2>\n          <p>WebTorrent does not support all torrent protocols.\n            If you seed a file from this app it will be available for anyone else using WebTorrent as long as you are\n            connected to the network or someone else has a copy downloaded. </p>\n          <p>You can alternatively upload your files to IPFS and\n            share the torrent file. This allows people to seed and share the content even while you are offline. Any\n            torrent files created with content on IPFS cannot be censored.</p>\n        </div>\n        <div class=\"col-sm-12\" *ngIf=\"tor_client.torrents && tor_client.torrents.length\">\n          <ul *ngFor=\"let torrent of tor_client.torrents\">\n            <li><strong>Title: </strong>{{torrent.dn}}</li>\n            <li><strong>Download Speed: </strong>{{formatSizeUnits(torrent.downloadSpeed)}}</li>\n            <li><strong>Upload Speed: </strong>{{formatSizeUnits(torrent.uploadSpeed)}}</li>\n            <li><strong>No of Peers: </strong>{{torrent.numPeers ? torrent.numPeers : 0}}</li>\n            <li><strong>Progress: </strong>{{(torrent.progress *100).toFixed(1)}} %</li>\n          </ul>\n          <h3 *ngIf=\"tor_client.torrents.length && tor_client.torrents[0].files\">Files</h3>\n          <ul *ngIf=\"tor_client.torrents.length && tor_client.torrents[0].files\">\n            <li *ngFor=\"let file of tor_client.torrents[0].files\">{{file.name}}</li>\n          </ul>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <div class=\"content\">\n            <form class=\"navbar-form\">\n              <input class=\"form-control\" id=\"torrentId\" name=\"torrentId\" placeholder=\"magnet:\"\n                     value=\"magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent\">\n            </form>\n          </div>\n        </div>\n        <div class=\"col-sm-12\">\n          <button class=\"btn btn-info btn-search-torrents\" (click)=\"addTorrent()\">Download Using Magnet</button>\n        </div>\n\n        <div class=\"col-sm-12\">\n          <div class=\"row\">\n            <div class=\"results col-sm-12\">\n\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>\n\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/storage/storage.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".results video {\n  width: 100% !important; }\n\n.content {\n  text-align: center; }\n\n.search-button-container {\n  text-align: center; }\n\n.btn-search-torrents {\n  width: 100%; }\n\nbutton i {\n  font-size: 16px; }\n\n.results {\n  min-height: 200px;\n  margin-bottom: 80px;\n  margin-top: 80px;\n  padding: 20px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/storage/storage.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webtorrent__ = __webpack_require__("../../../../webtorrent/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webtorrent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_webtorrent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StorageComponent = /** @class */ (function () {
    function StorageComponent(http) {
        this.http = http;
        this.torrents = [];
        this.activeTorrentInfo = '';
        /**
         * WebTorrent Client Set Up
         */
        this.tor_client = new __WEBPACK_IMPORTED_MODULE_1_webtorrent__();
        this.tor_client.on('error', function (err) {
            console.error('ERROR: ' + err.message);
        });
        this.tor_client.on('torrent', function (torrent) {
            this.activeTorrentInfo = 'Torrent info hash: ' + torrent.infoHash + ' ' +
                '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
                '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>';
            torrent.on('download', function (bytes) {
                console.log('just downloaded: ' + bytes);
                console.log('total downloaded: ' + torrent.downloaded);
                console.log('download speed: ' + torrent.downloadSpeed);
                console.log('progress: ' + torrent.progress);
            });
            // Print out progress every 5 seconds
            var interval = setInterval(function () {
                console.log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%');
                this.progress = (torrent.progress * 100).toFixed(1);
            }, 5000);
            torrent.on('done', function () {
                console.log('Progress: 100%');
                clearInterval(interval);
            });
            torrent.on('noPeers', function (announceType) {
                console.log('No peers for this torrent ;(');
            });
            // Render all files into to the page
            torrent.files.forEach(function (file) {
                // I think file is a blob
                file.appendTo('.results');
                console.log('(Blob URLs only work if the file is loaded from a server. "http://localhost" works. "file://" does not.)');
                file.getBlobURL(function (err, url) {
                    if (err)
                        return err.message;
                    console.log('File done.');
                    console.log('<a href="' + url + '">Download full file: ' + file.name + '</a>');
                });
            });
        });
    }
    StorageComponent.prototype.addTorrent = function () {
        var torrentId = document.querySelector('input[name=torrentId]').value;
        this.tor_client.add(torrentId, null, function (torrent) {
            // Got torrent metadata!
            console.log('Client is downloading:', torrent.infoHash);
            torrent.files.forEach(function (file) {
                // Display the file by appending it to the DOM. Supports video, audio, images, and
                // more. Specify a container element (CSS selector or reference to DOM node).
                file.appendTo('.results');
            });
        });
        console.log(this.tor_client);
        this.results = [];
    };
    StorageComponent.prototype.formatSizeUnits = function (bytes) {
        if (bytes >= 1073741824) {
            bytes = (bytes / 1073741824).toFixed(2) + ' GB';
        }
        else if (bytes >= 1048576) {
            bytes = (bytes / 1048576).toFixed(2) + ' MB';
        }
        else if (bytes >= 1024) {
            bytes = (bytes / 1024).toFixed(2) + ' KB';
        }
        else if (bytes > 1) {
            bytes = bytes + ' bytes';
        }
        else if (bytes == 1) {
            bytes = bytes + ' byte';
        }
        else {
            bytes = '0 byte';
        }
        return bytes;
    };
    StorageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-storage',
            template: __webpack_require__("../../../../../src/app/dashboard/storage/storage.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/storage/storage.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
    ], StorageComponent);
    return StorageComponent;
    var _a;
}());

//# sourceMappingURL=storage.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/torrents/torrents.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <nav class=\"sidebar-nav\">\n      <ul class=\"nav\">\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\">\n            <i class=\"icon-layers\"></i> Dashboard\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/files']\">\n            <i class=\"icon-briefcase\"></i> Recent Files\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/contacts']\">\n            <i class=\"icon-people\"></i> Contacts\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/music']\">\n            <i class=\"icon-music-tone\"></i> Music\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/video']\">\n            <i class=\"icon-film\"></i> Video\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/camera']\">\n            <i class=\"icon-camera\"></i> Camera\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/chat']\">\n            <i class=\"icon-speech\"></i> Chat\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/wallet']\">\n            <i class=\"icon-wallet\"></i> Wallet (Top up)\n          </a>\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/settings']\">\n            <i class=\"icon-settings\"></i> Settings\n          </a>\n        </li>\n      </ul>\n    </nav>\n  </div>\n\n  <main class=\"\">\n    <div class=\"animated fadeIn container\" >\n\n      <!--\n\n\n            BUILT IN TORRENT CLIENT\n\n            STILL HAVE TO FIGURE OUT HOW IT'S GOING TO BE USED WITH IPFS.\n\n\n      -->\n\n\n      <div class=\"row\">\n\n        <div class=\"col-sm-12\">\n\n          <div class=\"card\">\n            Torrent client\n          </div>\n\n\n        </div>\n\n\n      </div>\n\n\n    </div>\n  </main>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/torrents/torrents.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/torrents/torrents.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TorrentsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TorrentsComponent = /** @class */ (function () {
    function TorrentsComponent() {
    }
    TorrentsComponent.prototype.ngOnInit = function () {
    };
    TorrentsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-torrents',
            template: __webpack_require__("../../../../../src/app/dashboard/torrents/torrents.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/torrents/torrents.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TorrentsComponent);
    return TorrentsComponent;
}());

//# sourceMappingURL=torrents.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/video/video.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>&#9776;</button>\n  <ul class=\"nav navbar-nav mr-auto d-md-down-none\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler\" href=\"#\" appSidebarToggler>&#9776;</a>\n    </li>\n  </ul>\n</header>\n\n<ol class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n  <li class=\"breadcrumb-item active\"><a href=\"#\">Movies</a></li>\n</ol>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <app-sidebar></app-sidebar>\n  </div>\n  <main class=\"card\" style=\"width: 100%\">\n\n    <div class=\"container\">\n      <div class=\"row\" *ngIf=\"!uploadedFiles\">\n        <div class=\"col-sm-12\">\n          <h2>You have not uploaded any videos.</h2>\n        </div>\n      </div>\n\n      <div *ngFor=\"let file of uploadedFiles\">\n        <div class=\"row\" *ngIf=\"isVideo(file)\">\n          <div class=\"col-sm-12\">\n            <video controls=\"\" poster=\"data:image/gif,AAAA\">\n              <source src=\"https://ipfs.io/ipfs/{{file.url}}\">\n            </video>\n          </div>\n          <div class=\"col-sm-12\" style=\"padding-top: 20px;\">\n            <div class=\"col-sm-6\"><strong>File Name:</strong></div>\n            <div class=\"col-sm-6\">{{file.name}}</div>\n            <br />\n            <div class=\"col-sm-6\"><strong>File Type:</strong></div>\n            <div class=\"col-sm-6\">{{file.type}}</div>\n            <br />\n            <br />\n            <br />\n            <div class=\"col-sm-6\">\n              <a href=\"https://ipfs.io/ipfs/{{file.url}}\" target=\"_blank\">\n                IPFS Link\n              </a>\n            </div>\n          </div>\n          <hr />\n        </div>\n      </div>\n\n    </div>\n\n  </main>\n</div>\n\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/video/video.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h2 {\n  margin-top: 40px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/video/video.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var VideoComponent = /** @class */ (function () {
    function VideoComponent() {
        this.uploadedFiles = localStorage.getItem('uploadedFiles') ? JSON.parse(localStorage.getItem('uploadedFiles')) : null;
    }
    VideoComponent.prototype.isVideo = function (file) {
        return file.name.indexOf('mp4') > 0 ||
            file.name.indexOf('avi') > 0 ||
            file.name.indexOf('swf') > 0 ||
            file.name.indexOf('asf') > 0 ||
            file.name.indexOf('flv') > 0 ||
            file.name.indexOf('mkv') > 0;
    };
    VideoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-video',
            template: __webpack_require__("../../../../../src/app/dashboard/video/video.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/video/video.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], VideoComponent);
    return VideoComponent;
}());

//# sourceMappingURL=video.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/vr/vr.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>&#9776;</button>\n  <ul class=\"nav navbar-nav mr-auto d-md-down-none\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler\" href=\"#\" appSidebarToggler>&#9776;</a>\n    </li>\n  </ul>\n</header>\n\n<ol class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n  <li class=\"breadcrumb-item active\"><a href=\"#\">VR</a></li>\n</ol>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <app-sidebar active=\"photos\"></app-sidebar>\n  </div>\n  <main style=\"width: 100%\">\n\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <p>\n            AFRAME VR COMING SOON - MAVIGATING FILES AND PERFORMING IOT TRANSACTIONS OVER BLUETOOTH ETC.\n          </p>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>\n\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/vr/vr.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/vr/vr.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VrComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var VrComponent = /** @class */ (function () {
    function VrComponent() {
    }
    VrComponent.prototype.ngOnInit = function () {
    };
    VrComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-vr',
            template: __webpack_require__("../../../../../src/app/dashboard/vr/vr.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/vr/vr.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], VrComponent);
    return VrComponent;
}());

//# sourceMappingURL=vr.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/wallet/wallet.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>&#9776;</button>\n  <ul class=\"nav navbar-nav mr-auto d-md-down-none\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler\" href=\"#\" appSidebarToggler>&#9776;</a>\n    </li>\n  </ul>\n</header>\n\n<ol class=\"breadcrumb\">\n  <li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n  <li class=\"breadcrumb-item active\"><a href=\"#\">Wallet</a></li>\n</ol>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <app-sidebar></app-sidebar>\n  </div>\n  <main class=\"\">\n    <div class=\"animated fadeIn\" style=\"background-image: url('assets/img/background.jpeg'); background-repeat: no-repeat; min-height: 1000px; max-width: 100%; background-size: cover;\">\n      <div class=\"card wallet-setup\">\n        <div class=\"container\">\n          <div class=\"row\">\n            <div class=\"col-sm-6\">\n              <button class=\"btn btn-primary\" (click)=\"setUpBitcoinWallet()\" *ngIf=\"!BTC_PRIVATE_KEY\">\n                Set up your Bitcoin Wallet\n              </button>\n              <br /><br />\n              <div class=\"btc-wallet\" *ngIf=\"BTC_PRIVATE_KEY\">\n                <h3>Your Bitcoin Wallet</h3>\n                <p>\n                  Your balance : 0.87 BTC <br />\n                </p>\n                <p>\n                  Wallet Address : {{BTC_PUBLIC_KEY}} <br />\n                </p>\n\n                <input type=\"text\" placeholder=\"Destination Address\">\n                <button (click)=\"createBitcoinTransaction()\">Send funds to address</button>\n\n              </div>\n            </div>\n            <div class=\"col-sm-6\">\n              <button class=\"btn btn-primary\" (click)=\"setupLitecoinWallet()\" *ngIf=\"!LTC_PRIVATE_KEY\">\n                Set up your Litecoin Wallet\n              </button>\n              <br /><br />\n              <div class=\"ltc-wallet\" *ngIf=\"LTC_PRIVATE_KEY\">\n                <h3>Your Litecoin Wallet</h3>\n                <p>\n                  Wallet Address : {{LTC_PRIVATE_KEY}} <br />\n                </p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"card wallet-setup\">\n        <div class=\"container\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <p>Enjoying the app? Buy me a coffee!</p>\n              <p>\n                Bitcoin - 15zyHCqLufCuM271vj2hVYj8BaUXpPM5Yh <br />\n                Ethereum - 0x13599A07c0500604ED0FC3F82F7AA2Fc1eBD4222 <br />\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/wallet/wallet.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "button {\n  margin-top: 40px;\n  margin-bottom: 40px; }\n\n.wallet-setup {\n  padding: 25px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/wallet/wallet.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bitcoinjs_lib__ = __webpack_require__("../../../../bitcoinjs-lib/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bitcoinjs_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bitcoinjs_lib__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 *
 *   The wallet component (serverless)
 *   https://github.com/bitcoinjs/bitcoinjs-lib
 */
var WalletComponent = /** @class */ (function () {
    function WalletComponent() {
    }
    WalletComponent.prototype.ngOnInit = function () {
        this.BTC_PRIVATE_KEY = localStorage.getItem('btc_private_key');
        this.BTC_PUBLIC_KEY = localStorage.getItem('btc_public_key');
        this.LTC_PRIVATE_KEY = localStorage.getItem('ltc_private_key');
        this.LTC_PUBLIC_KEY = localStorage.getItem('ltc_public_key');
    };
    WalletComponent.prototype.setUpBitcoinWallet = function () {
        var keyPair = __WEBPACK_IMPORTED_MODULE_1_bitcoinjs_lib__["ECPair"].makeRandom();
        // Print your private key (in WIF format)
        console.log(keyPair.toWIF());
        this.BTC_PRIVATE_KEY = keyPair.toWIF();
        localStorage.setItem('btc_private_key', this.BTC_PRIVATE_KEY);
        // Print your public key address
        console.log(keyPair.getAddress());
        this.BTC_PUBLIC_KEY = keyPair.getAddress();
        localStorage.setItem('btc_public_key', this.BTC_PUBLIC_KEY);
    };
    WalletComponent.prototype.setupLitecoinWallet = function () {
        var litecoin = __WEBPACK_IMPORTED_MODULE_1_bitcoinjs_lib__["networks"].litecoin;
        var keyPair = __WEBPACK_IMPORTED_MODULE_1_bitcoinjs_lib__["ECPair"].makeRandom({ network: litecoin });
        var wif = keyPair.toWIF();
        console.log(wif);
        this.LTC_PRIVATE_KEY = wif;
        localStorage.setItem('ltc_private_key', this.LTC_PRIVATE_KEY);
        var address = keyPair.getAddress();
        // Print your public key address
        console.log(address);
        this.LTC_PUBLIC_KEY = address;
        localStorage.setItem('ltc_public_key', this.LTC_PUBLIC_KEY);
    };
    WalletComponent.prototype.createBitcoinTransaction = function () {
        var tx = new __WEBPACK_IMPORTED_MODULE_1_bitcoinjs_lib__["TransactionBuilder"]();
        // Add the input (who is paying):
        // [previous transaction hash, index of the output to use]
        var txId = 'aa94ab02c182214f090e99a0d57021caffd0f195a81c24602b1028b130b63e31';
        tx.addInput(txId, 0);
        // Add the output (who to pay to):
        // [payee's address, amount in satoshis]
        tx.addOutput("1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK", 15000);
        // Initialize a private key using WIF
        var privateKeyWIF = 'L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy';
        var keyPair = __WEBPACK_IMPORTED_MODULE_1_bitcoinjs_lib__["ECPair"].fromWIF(privateKeyWIF);
        // Sign the first input with the new key
        tx.sign(0, keyPair);
        // Print transaction serialized as hex
        console.log(tx.build().toHex());
        // => 0100000001313eb630b128102b60241ca895f1d0ffca21 ...
        // You could now push the transaction onto the Bitcoin network manually
        // (see https://blockchain.info/pushtx)
    };
    WalletComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-wallet',
            template: __webpack_require__("../../../../../src/app/dashboard/wallet/wallet.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dashboard/wallet/wallet.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], WalletComponent);
    return WalletComponent;
}());

//# sourceMappingURL=wallet.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/aside.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsideToggleDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
* Allows the aside to be toggled via click.
*/
var AsideToggleDirective = /** @class */ (function () {
    function AsideToggleDirective() {
    }
    AsideToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('aside-menu-hidden');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AsideToggleDirective.prototype, "toggleOpen", null);
    AsideToggleDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appAsideMenuToggler]',
        }),
        __metadata("design:paramtypes", [])
    ], AsideToggleDirective);
    return AsideToggleDirective;
}());

//# sourceMappingURL=aside.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/breadcrumb.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumbsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BreadcrumbsComponent = /** @class */ (function () {
    function BreadcrumbsComponent(router, route) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.router.events.filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]; }).subscribe(function (event) {
            _this.breadcrumbs = [];
            var currentRoute = _this.route.root, url = '';
            do {
                var childrenRoutes = currentRoute.children;
                currentRoute = null;
                childrenRoutes.forEach(function (route) {
                    if (route.outlet === 'primary') {
                        var routeSnapshot = route.snapshot;
                        url += '/' + routeSnapshot.url.map(function (segment) { return segment.path; }).join('/');
                        _this.breadcrumbs.push({
                            label: route.snapshot.data,
                            url: url
                        });
                        currentRoute = route;
                    }
                });
            } while (currentRoute);
        });
    }
    BreadcrumbsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-breadcrumbs',
            template: "\n  <ng-template ngFor let-breadcrumb [ngForOf]=\"breadcrumbs\" let-last = last>\n    <li class=\"breadcrumb-item\"\n        *ngIf=\"breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/'||breadcrumb.label.title&&last\"\n        [ngClass]=\"{active: last}\">\n      <a *ngIf=\"!last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</a>\n      <span *ngIf=\"last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</span>\n    </li>\n  </ng-template>"
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object])
    ], BreadcrumbsComponent);
    return BreadcrumbsComponent;
    var _a, _b;
}());

//# sourceMappingURL=breadcrumb.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/nav-dropdown.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NavDropdownDirective */
/* unused harmony export NavDropdownToggleDirective */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NAV_DROPDOWN_DIRECTIVES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavDropdownDirective = /** @class */ (function () {
    function NavDropdownDirective(el) {
        this.el = el;
    }
    NavDropdownDirective.prototype.toggle = function () {
        this.el.nativeElement.classList.toggle('open');
    };
    NavDropdownDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appNavDropdown]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], NavDropdownDirective);
    return NavDropdownDirective;
    var _a;
}());

/**
* Allows the dropdown to be toggled via click.
*/
var NavDropdownToggleDirective = /** @class */ (function () {
    function NavDropdownToggleDirective(dropdown) {
        this.dropdown = dropdown;
    }
    NavDropdownToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        this.dropdown.toggle();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavDropdownToggleDirective.prototype, "toggleOpen", null);
    NavDropdownToggleDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appNavDropdownToggle]'
        }),
        __metadata("design:paramtypes", [NavDropdownDirective])
    ], NavDropdownToggleDirective);
    return NavDropdownToggleDirective;
}());

var NAV_DROPDOWN_DIRECTIVES = [NavDropdownDirective, NavDropdownToggleDirective];
//# sourceMappingURL=nav-dropdown.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sidebar.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SidebarToggleDirective */
/* unused harmony export SidebarMinimizeDirective */
/* unused harmony export MobileSidebarToggleDirective */
/* unused harmony export SidebarOffCanvasCloseDirective */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SIDEBAR_TOGGLE_DIRECTIVES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
* Allows the sidebar to be toggled via click.
*/
var SidebarToggleDirective = /** @class */ (function () {
    function SidebarToggleDirective() {
    }
    SidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-hidden');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarToggleDirective.prototype, "toggleOpen", null);
    SidebarToggleDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appSidebarToggler]'
        }),
        __metadata("design:paramtypes", [])
    ], SidebarToggleDirective);
    return SidebarToggleDirective;
}());

var SidebarMinimizeDirective = /** @class */ (function () {
    function SidebarMinimizeDirective() {
    }
    SidebarMinimizeDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-minimized');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarMinimizeDirective.prototype, "toggleOpen", null);
    SidebarMinimizeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appSidebarMinimizer]'
        }),
        __metadata("design:paramtypes", [])
    ], SidebarMinimizeDirective);
    return SidebarMinimizeDirective;
}());

var MobileSidebarToggleDirective = /** @class */ (function () {
    function MobileSidebarToggleDirective() {
    }
    // Check if element has class
    MobileSidebarToggleDirective.prototype.hasClass = function (target, elementClassName) {
        return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
    };
    MobileSidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-mobile-show');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MobileSidebarToggleDirective.prototype, "toggleOpen", null);
    MobileSidebarToggleDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appMobileSidebarToggler]'
        }),
        __metadata("design:paramtypes", [])
    ], MobileSidebarToggleDirective);
    return MobileSidebarToggleDirective;
}());

/**
* Allows the off-canvas sidebar to be closed via click.
*/
var SidebarOffCanvasCloseDirective = /** @class */ (function () {
    function SidebarOffCanvasCloseDirective() {
    }
    // Check if element has class
    SidebarOffCanvasCloseDirective.prototype.hasClass = function (target, elementClassName) {
        return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
    };
    // Toggle element class
    SidebarOffCanvasCloseDirective.prototype.toggleClass = function (elem, elementClassName) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (this.hasClass(elem, elementClassName)) {
            while (newClass.indexOf(' ' + elementClassName + ' ') >= 0) {
                newClass = newClass.replace(' ' + elementClassName + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
        else {
            elem.className += ' ' + elementClassName;
        }
    };
    SidebarOffCanvasCloseDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        if (this.hasClass(document.querySelector('body'), 'sidebar-off-canvas')) {
            this.toggleClass(document.querySelector('body'), 'sidebar-opened');
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarOffCanvasCloseDirective.prototype, "toggleOpen", null);
    SidebarOffCanvasCloseDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appSidebarClose]'
        }),
        __metadata("design:paramtypes", [])
    ], SidebarOffCanvasCloseDirective);
    return SidebarOffCanvasCloseDirective;
}());

var SIDEBAR_TOGGLE_DIRECTIVES = [
    SidebarToggleDirective,
    SidebarMinimizeDirective,
    SidebarOffCanvasCloseDirective,
    MobileSidebarToggleDirective
];
//# sourceMappingURL=sidebar.directive.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false,
    apiUrl: "http://localhost:8080"
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../chart.js/node_modules/moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../chart.js/node_modules/moment/locale/af.js",
	"./af.js": "../../../../chart.js/node_modules/moment/locale/af.js",
	"./ar": "../../../../chart.js/node_modules/moment/locale/ar.js",
	"./ar-dz": "../../../../chart.js/node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../chart.js/node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "../../../../chart.js/node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../chart.js/node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "../../../../chart.js/node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../chart.js/node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "../../../../chart.js/node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../chart.js/node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "../../../../chart.js/node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../chart.js/node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "../../../../chart.js/node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../chart.js/node_modules/moment/locale/ar-tn.js",
	"./ar.js": "../../../../chart.js/node_modules/moment/locale/ar.js",
	"./az": "../../../../chart.js/node_modules/moment/locale/az.js",
	"./az.js": "../../../../chart.js/node_modules/moment/locale/az.js",
	"./be": "../../../../chart.js/node_modules/moment/locale/be.js",
	"./be.js": "../../../../chart.js/node_modules/moment/locale/be.js",
	"./bg": "../../../../chart.js/node_modules/moment/locale/bg.js",
	"./bg.js": "../../../../chart.js/node_modules/moment/locale/bg.js",
	"./bn": "../../../../chart.js/node_modules/moment/locale/bn.js",
	"./bn.js": "../../../../chart.js/node_modules/moment/locale/bn.js",
	"./bo": "../../../../chart.js/node_modules/moment/locale/bo.js",
	"./bo.js": "../../../../chart.js/node_modules/moment/locale/bo.js",
	"./br": "../../../../chart.js/node_modules/moment/locale/br.js",
	"./br.js": "../../../../chart.js/node_modules/moment/locale/br.js",
	"./bs": "../../../../chart.js/node_modules/moment/locale/bs.js",
	"./bs.js": "../../../../chart.js/node_modules/moment/locale/bs.js",
	"./ca": "../../../../chart.js/node_modules/moment/locale/ca.js",
	"./ca.js": "../../../../chart.js/node_modules/moment/locale/ca.js",
	"./cs": "../../../../chart.js/node_modules/moment/locale/cs.js",
	"./cs.js": "../../../../chart.js/node_modules/moment/locale/cs.js",
	"./cv": "../../../../chart.js/node_modules/moment/locale/cv.js",
	"./cv.js": "../../../../chart.js/node_modules/moment/locale/cv.js",
	"./cy": "../../../../chart.js/node_modules/moment/locale/cy.js",
	"./cy.js": "../../../../chart.js/node_modules/moment/locale/cy.js",
	"./da": "../../../../chart.js/node_modules/moment/locale/da.js",
	"./da.js": "../../../../chart.js/node_modules/moment/locale/da.js",
	"./de": "../../../../chart.js/node_modules/moment/locale/de.js",
	"./de-at": "../../../../chart.js/node_modules/moment/locale/de-at.js",
	"./de-at.js": "../../../../chart.js/node_modules/moment/locale/de-at.js",
	"./de-ch": "../../../../chart.js/node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "../../../../chart.js/node_modules/moment/locale/de-ch.js",
	"./de.js": "../../../../chart.js/node_modules/moment/locale/de.js",
	"./dv": "../../../../chart.js/node_modules/moment/locale/dv.js",
	"./dv.js": "../../../../chart.js/node_modules/moment/locale/dv.js",
	"./el": "../../../../chart.js/node_modules/moment/locale/el.js",
	"./el.js": "../../../../chart.js/node_modules/moment/locale/el.js",
	"./en-au": "../../../../chart.js/node_modules/moment/locale/en-au.js",
	"./en-au.js": "../../../../chart.js/node_modules/moment/locale/en-au.js",
	"./en-ca": "../../../../chart.js/node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "../../../../chart.js/node_modules/moment/locale/en-ca.js",
	"./en-gb": "../../../../chart.js/node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "../../../../chart.js/node_modules/moment/locale/en-gb.js",
	"./en-ie": "../../../../chart.js/node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "../../../../chart.js/node_modules/moment/locale/en-ie.js",
	"./en-nz": "../../../../chart.js/node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "../../../../chart.js/node_modules/moment/locale/en-nz.js",
	"./eo": "../../../../chart.js/node_modules/moment/locale/eo.js",
	"./eo.js": "../../../../chart.js/node_modules/moment/locale/eo.js",
	"./es": "../../../../chart.js/node_modules/moment/locale/es.js",
	"./es-do": "../../../../chart.js/node_modules/moment/locale/es-do.js",
	"./es-do.js": "../../../../chart.js/node_modules/moment/locale/es-do.js",
	"./es.js": "../../../../chart.js/node_modules/moment/locale/es.js",
	"./et": "../../../../chart.js/node_modules/moment/locale/et.js",
	"./et.js": "../../../../chart.js/node_modules/moment/locale/et.js",
	"./eu": "../../../../chart.js/node_modules/moment/locale/eu.js",
	"./eu.js": "../../../../chart.js/node_modules/moment/locale/eu.js",
	"./fa": "../../../../chart.js/node_modules/moment/locale/fa.js",
	"./fa.js": "../../../../chart.js/node_modules/moment/locale/fa.js",
	"./fi": "../../../../chart.js/node_modules/moment/locale/fi.js",
	"./fi.js": "../../../../chart.js/node_modules/moment/locale/fi.js",
	"./fo": "../../../../chart.js/node_modules/moment/locale/fo.js",
	"./fo.js": "../../../../chart.js/node_modules/moment/locale/fo.js",
	"./fr": "../../../../chart.js/node_modules/moment/locale/fr.js",
	"./fr-ca": "../../../../chart.js/node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../chart.js/node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "../../../../chart.js/node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../chart.js/node_modules/moment/locale/fr-ch.js",
	"./fr.js": "../../../../chart.js/node_modules/moment/locale/fr.js",
	"./fy": "../../../../chart.js/node_modules/moment/locale/fy.js",
	"./fy.js": "../../../../chart.js/node_modules/moment/locale/fy.js",
	"./gd": "../../../../chart.js/node_modules/moment/locale/gd.js",
	"./gd.js": "../../../../chart.js/node_modules/moment/locale/gd.js",
	"./gl": "../../../../chart.js/node_modules/moment/locale/gl.js",
	"./gl.js": "../../../../chart.js/node_modules/moment/locale/gl.js",
	"./gom-latn": "../../../../chart.js/node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../chart.js/node_modules/moment/locale/gom-latn.js",
	"./he": "../../../../chart.js/node_modules/moment/locale/he.js",
	"./he.js": "../../../../chart.js/node_modules/moment/locale/he.js",
	"./hi": "../../../../chart.js/node_modules/moment/locale/hi.js",
	"./hi.js": "../../../../chart.js/node_modules/moment/locale/hi.js",
	"./hr": "../../../../chart.js/node_modules/moment/locale/hr.js",
	"./hr.js": "../../../../chart.js/node_modules/moment/locale/hr.js",
	"./hu": "../../../../chart.js/node_modules/moment/locale/hu.js",
	"./hu.js": "../../../../chart.js/node_modules/moment/locale/hu.js",
	"./hy-am": "../../../../chart.js/node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "../../../../chart.js/node_modules/moment/locale/hy-am.js",
	"./id": "../../../../chart.js/node_modules/moment/locale/id.js",
	"./id.js": "../../../../chart.js/node_modules/moment/locale/id.js",
	"./is": "../../../../chart.js/node_modules/moment/locale/is.js",
	"./is.js": "../../../../chart.js/node_modules/moment/locale/is.js",
	"./it": "../../../../chart.js/node_modules/moment/locale/it.js",
	"./it.js": "../../../../chart.js/node_modules/moment/locale/it.js",
	"./ja": "../../../../chart.js/node_modules/moment/locale/ja.js",
	"./ja.js": "../../../../chart.js/node_modules/moment/locale/ja.js",
	"./jv": "../../../../chart.js/node_modules/moment/locale/jv.js",
	"./jv.js": "../../../../chart.js/node_modules/moment/locale/jv.js",
	"./ka": "../../../../chart.js/node_modules/moment/locale/ka.js",
	"./ka.js": "../../../../chart.js/node_modules/moment/locale/ka.js",
	"./kk": "../../../../chart.js/node_modules/moment/locale/kk.js",
	"./kk.js": "../../../../chart.js/node_modules/moment/locale/kk.js",
	"./km": "../../../../chart.js/node_modules/moment/locale/km.js",
	"./km.js": "../../../../chart.js/node_modules/moment/locale/km.js",
	"./kn": "../../../../chart.js/node_modules/moment/locale/kn.js",
	"./kn.js": "../../../../chart.js/node_modules/moment/locale/kn.js",
	"./ko": "../../../../chart.js/node_modules/moment/locale/ko.js",
	"./ko.js": "../../../../chart.js/node_modules/moment/locale/ko.js",
	"./ky": "../../../../chart.js/node_modules/moment/locale/ky.js",
	"./ky.js": "../../../../chart.js/node_modules/moment/locale/ky.js",
	"./lb": "../../../../chart.js/node_modules/moment/locale/lb.js",
	"./lb.js": "../../../../chart.js/node_modules/moment/locale/lb.js",
	"./lo": "../../../../chart.js/node_modules/moment/locale/lo.js",
	"./lo.js": "../../../../chart.js/node_modules/moment/locale/lo.js",
	"./lt": "../../../../chart.js/node_modules/moment/locale/lt.js",
	"./lt.js": "../../../../chart.js/node_modules/moment/locale/lt.js",
	"./lv": "../../../../chart.js/node_modules/moment/locale/lv.js",
	"./lv.js": "../../../../chart.js/node_modules/moment/locale/lv.js",
	"./me": "../../../../chart.js/node_modules/moment/locale/me.js",
	"./me.js": "../../../../chart.js/node_modules/moment/locale/me.js",
	"./mi": "../../../../chart.js/node_modules/moment/locale/mi.js",
	"./mi.js": "../../../../chart.js/node_modules/moment/locale/mi.js",
	"./mk": "../../../../chart.js/node_modules/moment/locale/mk.js",
	"./mk.js": "../../../../chart.js/node_modules/moment/locale/mk.js",
	"./ml": "../../../../chart.js/node_modules/moment/locale/ml.js",
	"./ml.js": "../../../../chart.js/node_modules/moment/locale/ml.js",
	"./mr": "../../../../chart.js/node_modules/moment/locale/mr.js",
	"./mr.js": "../../../../chart.js/node_modules/moment/locale/mr.js",
	"./ms": "../../../../chart.js/node_modules/moment/locale/ms.js",
	"./ms-my": "../../../../chart.js/node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "../../../../chart.js/node_modules/moment/locale/ms-my.js",
	"./ms.js": "../../../../chart.js/node_modules/moment/locale/ms.js",
	"./my": "../../../../chart.js/node_modules/moment/locale/my.js",
	"./my.js": "../../../../chart.js/node_modules/moment/locale/my.js",
	"./nb": "../../../../chart.js/node_modules/moment/locale/nb.js",
	"./nb.js": "../../../../chart.js/node_modules/moment/locale/nb.js",
	"./ne": "../../../../chart.js/node_modules/moment/locale/ne.js",
	"./ne.js": "../../../../chart.js/node_modules/moment/locale/ne.js",
	"./nl": "../../../../chart.js/node_modules/moment/locale/nl.js",
	"./nl-be": "../../../../chart.js/node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "../../../../chart.js/node_modules/moment/locale/nl-be.js",
	"./nl.js": "../../../../chart.js/node_modules/moment/locale/nl.js",
	"./nn": "../../../../chart.js/node_modules/moment/locale/nn.js",
	"./nn.js": "../../../../chart.js/node_modules/moment/locale/nn.js",
	"./pa-in": "../../../../chart.js/node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "../../../../chart.js/node_modules/moment/locale/pa-in.js",
	"./pl": "../../../../chart.js/node_modules/moment/locale/pl.js",
	"./pl.js": "../../../../chart.js/node_modules/moment/locale/pl.js",
	"./pt": "../../../../chart.js/node_modules/moment/locale/pt.js",
	"./pt-br": "../../../../chart.js/node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "../../../../chart.js/node_modules/moment/locale/pt-br.js",
	"./pt.js": "../../../../chart.js/node_modules/moment/locale/pt.js",
	"./ro": "../../../../chart.js/node_modules/moment/locale/ro.js",
	"./ro.js": "../../../../chart.js/node_modules/moment/locale/ro.js",
	"./ru": "../../../../chart.js/node_modules/moment/locale/ru.js",
	"./ru.js": "../../../../chart.js/node_modules/moment/locale/ru.js",
	"./sd": "../../../../chart.js/node_modules/moment/locale/sd.js",
	"./sd.js": "../../../../chart.js/node_modules/moment/locale/sd.js",
	"./se": "../../../../chart.js/node_modules/moment/locale/se.js",
	"./se.js": "../../../../chart.js/node_modules/moment/locale/se.js",
	"./si": "../../../../chart.js/node_modules/moment/locale/si.js",
	"./si.js": "../../../../chart.js/node_modules/moment/locale/si.js",
	"./sk": "../../../../chart.js/node_modules/moment/locale/sk.js",
	"./sk.js": "../../../../chart.js/node_modules/moment/locale/sk.js",
	"./sl": "../../../../chart.js/node_modules/moment/locale/sl.js",
	"./sl.js": "../../../../chart.js/node_modules/moment/locale/sl.js",
	"./sq": "../../../../chart.js/node_modules/moment/locale/sq.js",
	"./sq.js": "../../../../chart.js/node_modules/moment/locale/sq.js",
	"./sr": "../../../../chart.js/node_modules/moment/locale/sr.js",
	"./sr-cyrl": "../../../../chart.js/node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../chart.js/node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../chart.js/node_modules/moment/locale/sr.js",
	"./ss": "../../../../chart.js/node_modules/moment/locale/ss.js",
	"./ss.js": "../../../../chart.js/node_modules/moment/locale/ss.js",
	"./sv": "../../../../chart.js/node_modules/moment/locale/sv.js",
	"./sv.js": "../../../../chart.js/node_modules/moment/locale/sv.js",
	"./sw": "../../../../chart.js/node_modules/moment/locale/sw.js",
	"./sw.js": "../../../../chart.js/node_modules/moment/locale/sw.js",
	"./ta": "../../../../chart.js/node_modules/moment/locale/ta.js",
	"./ta.js": "../../../../chart.js/node_modules/moment/locale/ta.js",
	"./te": "../../../../chart.js/node_modules/moment/locale/te.js",
	"./te.js": "../../../../chart.js/node_modules/moment/locale/te.js",
	"./tet": "../../../../chart.js/node_modules/moment/locale/tet.js",
	"./tet.js": "../../../../chart.js/node_modules/moment/locale/tet.js",
	"./th": "../../../../chart.js/node_modules/moment/locale/th.js",
	"./th.js": "../../../../chart.js/node_modules/moment/locale/th.js",
	"./tl-ph": "../../../../chart.js/node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../chart.js/node_modules/moment/locale/tl-ph.js",
	"./tlh": "../../../../chart.js/node_modules/moment/locale/tlh.js",
	"./tlh.js": "../../../../chart.js/node_modules/moment/locale/tlh.js",
	"./tr": "../../../../chart.js/node_modules/moment/locale/tr.js",
	"./tr.js": "../../../../chart.js/node_modules/moment/locale/tr.js",
	"./tzl": "../../../../chart.js/node_modules/moment/locale/tzl.js",
	"./tzl.js": "../../../../chart.js/node_modules/moment/locale/tzl.js",
	"./tzm": "../../../../chart.js/node_modules/moment/locale/tzm.js",
	"./tzm-latn": "../../../../chart.js/node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../chart.js/node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../chart.js/node_modules/moment/locale/tzm.js",
	"./uk": "../../../../chart.js/node_modules/moment/locale/uk.js",
	"./uk.js": "../../../../chart.js/node_modules/moment/locale/uk.js",
	"./ur": "../../../../chart.js/node_modules/moment/locale/ur.js",
	"./ur.js": "../../../../chart.js/node_modules/moment/locale/ur.js",
	"./uz": "../../../../chart.js/node_modules/moment/locale/uz.js",
	"./uz-latn": "../../../../chart.js/node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../chart.js/node_modules/moment/locale/uz-latn.js",
	"./uz.js": "../../../../chart.js/node_modules/moment/locale/uz.js",
	"./vi": "../../../../chart.js/node_modules/moment/locale/vi.js",
	"./vi.js": "../../../../chart.js/node_modules/moment/locale/vi.js",
	"./x-pseudo": "../../../../chart.js/node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../chart.js/node_modules/moment/locale/x-pseudo.js",
	"./yo": "../../../../chart.js/node_modules/moment/locale/yo.js",
	"./yo.js": "../../../../chart.js/node_modules/moment/locale/yo.js",
	"./zh-cn": "../../../../chart.js/node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../chart.js/node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "../../../../chart.js/node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../chart.js/node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "../../../../chart.js/node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../chart.js/node_modules/moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../chart.js/node_modules/moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 35:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 36:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map