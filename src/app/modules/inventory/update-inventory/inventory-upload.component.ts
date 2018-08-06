import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as moment from 'moment';
import {HttpClient} from "@angular/common/http";
import {InventoryService} from '../inventory.service';
import {LoadingBarService} from '../../../@shared/services/loadingbar.service';
import {NotificationService} from '../../../@shared/services/notification.service';

declare var require: any;

let _ = require('underscore');
let $ = require('jquery');
let _self = null;

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  providers: []//,
  //changeDetection: ChangeDetectionStrategy.Default
})
export class InventoryUploadComponent {
  filesToUpload: any = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private  http: HttpClient,
              private loadingBarService: LoadingBarService,
              private notificationService: NotificationService,
              private inventoryService: InventoryService) {
  }

  ngOnInit() {

  }


  uploadFile() {

    console.log(' this.filesToUpload', this.filesToUpload);

    let elementContentDigital = this.filesToUpload.elementContentDigital ? this.filesToUpload.elementContentDigital : '';
    var postData = new FormData();
    postData.append('elementContent', elementContentDigital, elementContentDigital.name);
    this.inventoryService.updateInventory(postData)
      .subscribe((result) => {
        console.log('result', result);
      });
  }

  downloadSKUInventory() {
    console.log('downloadSKUInventory called');
  }


  onFileUploadChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      let fileObj = event.target.files[0];
      let type = fileObj.type.split('/');
      console.log('TYPE IS==>> ::: ', type[0]);

      // if (type[0] == 'text')
      this.filesToUpload['elementContentDigital'] = fileObj;
    }
  }


}
