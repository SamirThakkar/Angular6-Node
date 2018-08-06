import { Injectable }    from '@angular/core';
declare var require: any;
let nProgress=require('nprogress');

@Injectable()
export class LoadingBarService {
    start(){
        nProgress.start();
    }
    done(){
        nProgress.done();
    }
}
