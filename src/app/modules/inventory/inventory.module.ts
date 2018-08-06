import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {InventoryUploadComponent} from "./update-inventory/inventory-upload.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InventoryService} from "./inventory.service";

let routes = [
    {
        path: '',
        component: InventoryUploadComponent
    },
    {
        path: 'uploads',
        component: InventoryUploadComponent
    }

    // {
    //     path: '',
    //     redirectTo: '/list',
    //     pathMatch: 'full'
    // },
];

@NgModule({
    declarations: [ InventoryUploadComponent],
    imports: [CommonModule, RouterModule, FormsModule],
    exports: [  InventoryUploadComponent],
    entryComponents: [],
    providers: [InventoryService]
})
export class inventoryModule {
    static ROUTES: any = routes;
}


