
import {from as observableFrom} from 'rxjs';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {UserService} from './user.service';

@Injectable()

export class UserResolver implements Resolve<any> {
    constructor(private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return observableFrom(this.userService.listUser());
    }
}
