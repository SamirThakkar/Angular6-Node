import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";



import {User} from './user';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {DataService} from '../../../@shared/services/data.service';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Injectable()
export class UserService  {
    constructor(private http: HttpClient,
                private dataService: DataService,
                private slimLoadingBarService: SlimLoadingBarService) {
    }


    addUserService(body: User) {
        return this.dataService.callAPI({
            url: '/root',
            body: body,
            method: 'post'
        })
    }

getusers(){
  return this.http.get(`https://jsonplaceholder.typicode.com/posts` );

}

    listUser() {
        return this.dataService.callAPI({
            url: '/root'
        })

        // .subscribe(result => {
          // this.dataObj = result.json();  return this.http.get(this.configUrl);
        // });
    }



    removeUser(id) {
        return this.dataService.callAPI({
            url:  '/root/' + id,
            method: 'delete',
            successMessage: 'deleteSuccess',
            errorMessage: 'deleteError'
        })
    }





    getUserById(id) {
        return this.dataService.callAPI({
            url: '/root/' + id
        })
    }



    updateUser(body: User, id) {
        return this.dataService.callAPI({
            url:'/root/' + id,
            body: body,
            successMessage: 'editSuccess',
            errorMessage: 'editError'
        })
    }

}


@Injectable()
export class GetUserResolve implements Resolve<any> {
    constructor(private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.getUserById(route.params['id']);
    }
}


