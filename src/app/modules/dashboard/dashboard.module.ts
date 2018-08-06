import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import {DashboardService} from "./dashboard.service";
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';


var routes = [{
    path: 'dashboard',
    component: DashboardComponent
},
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule,RouterModule],
    exports: [DashboardComponent],
    entryComponents: [  ],
    providers:[DashboardService]
})
export class DashboardModule {

    static ROUTES:any=routes;
}


