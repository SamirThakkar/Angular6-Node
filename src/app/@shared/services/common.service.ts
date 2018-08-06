import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
declare const require: any;
const Noty = require('noty');
declare let $;

/**
 * @Service CommonService
 * @description function to set the common services
 */
@Injectable()
export class CommonService {
  constructor(private router: Router){
  }

  /**
   * @method showNotification
   * @description function to show notification
   * @param message
   * @param type
   */
  showNotification({message,type='error'}) {
    new Noty({
      text: message,
      type: type,
      layout: 'topRight',
      theme    : 'metroui',
      timeout: 2000,
      progressBar: true,
      closeWith: ['click']
    }).show();
  }

  /**
   * @method scrollToError
   * @description function to scroll to the error part of the form
   * @params formName
   */
  scrollToError(formName){
    let headerHeight = 40 + 10;
    let $invalidElement = $($(`[name=${formName}] .ng-invalid:first,[name=${formName}] .invalid-element:first`)[0]);
    $('body').animate({
      scrollTop: $invalidElement.offset().top - headerHeight
    }, 200);
    $invalidElement.focus();
  }

  /**
   * @method refreshRoute
   * @description function to refresh the route
   * @param routeName
   */
  refreshRoute(routeName){
    this.router.navigate(['refresh']);
    setTimeout(()=>{
      this.router.navigate([routeName]);
    },200);
  }
}

