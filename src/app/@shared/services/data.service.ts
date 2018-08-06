import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';



import {Observable} from 'rxjs/Rx';
import * as _ from 'lodash';
import {CommonService} from './common.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {Router} from '@angular/router';

declare var $: any;

@Injectable()
export class DataService {
  private headers = {};
  static httpCallCount = 0;

  constructor(private http: HttpClient,
              private router: Router,
              private commonService: CommonService,
              private slimLoadingBarService: SlimLoadingBarService) {
  }

  /**
   * @method callAPI
   * @description function to call the api
   * @param options
   * @returns {Promise<T>}
   */
  callAPI(options: any) {
    this.slimLoadingBarService.start();
    options.showSuccessMessage = _.isUndefined(options.showSuccessMessage) ? true : options.showSuccessMessage;
    options.showErrorMessage = _.isUndefined(options.showErrorMessage) ? true : options.showErrorMessage;
    let searchParams: HttpParams = new HttpParams();
    _.each(options.search, (value, key) => searchParams.set(key, value));
    return Observable.create((subscriber) => {
      let headers = new HttpHeaders(_.merge(options.headers, this.headers));
      this.http
        .request(options.method || 'get', options.url, {
          body: options.body,
          headers: headers,
          params: searchParams
        })
        .toPromise()
        .then((res: any) => {
          if (options.successMessage) {
            this.commonService.showNotification({message: options.successMessage, type: 'success'});
          }
          console.info('Got success in calling the API::' + options.url);
          subscriber.next(res);
          subscriber.complete();
          this.slimLoadingBarService.complete();
        }).catch((err) => {
        if (_.get(err, 'error.Code') === '1003') {
          if (options.url.indexOf('check-login') === -1) {
            this.router.navigate(['/login']);
          }
        } else {
          if (options.showErrorMessage) {
            options.errorMessage = _.get(err, 'error.Message') || options.errorMessage;
          } else {
            options.errorMessage = null;
          }
          if (options.errorMessage) {
            this.commonService.showNotification({message: options.errorMessage, type: 'error'});
          }
        }
        console.warn('Error in calling the API::' + options.url);
        console.warn('Error::', err);
        this.slimLoadingBarService.complete();
        subscriber.error(err);
      });
    });
  }
}
