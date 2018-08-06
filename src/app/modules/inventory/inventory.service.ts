import {Injectable} from '@angular/core';



import {DataService} from '../../@shared/services/data.service';


@Injectable()
export class InventoryService {

    constructor(public dataService: DataService) {
    }

    /**
     * @method updateInventory
     * @description function to upload file and update inventory.
     * @param data
     * @returns any
     */
    updateInventory(data) {
        console.log('data', data);
        return this.dataService.callAPI({
            url: '/api/upload-file',
            method: 'post',
            body: data,
            successMessage: 'Success.',
            errorMessage: 'Error.'
        });
    }
}
