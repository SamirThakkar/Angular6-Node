import {NgModule, Component} from "@angular/core";
import {APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutingModule} from './modules/app-routing.module';
import {BrowserModule, Title} from "@angular/platform-browser";
// import {HttpModule} from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {inventoryModule} from "./modules/inventory/inventory.module";
import {UserModule} from "./modules/user/user.module";
import {AppComponent} from './app.component';
import {SharedModule} from './@shared/shared.module';

declare var require: any;
let jQuery = require('jquery');


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    inventoryModule,
    UserModule
  ],
  exports: [],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }, {
      provide: LocationStrategy, useClass: HashLocationStrategy
    },
    SlimLoadingBarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
