import { CommonService } from './services/common.service';
import { DataService } from './services/data.service';
// import { DataResolve } from "./services/data.resolve";
// import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
// import { StateResolve } from "./services/state.resolve";
import {NotificationService} from './services/notification.service';
import {LoadingBarService} from './services/loadingbar.service';
import {DataResolve} from './services/data.resolve';

/**
 * @Class SharedModule
 * @description class to manage the shared components and shared services
 */
export class SharedModule {
  static PROVIDERS = [
    CommonService,
    DataService,
    DataResolve,
    // StateResolve,
    NotificationService,
    LoadingBarService,
  ];

}
