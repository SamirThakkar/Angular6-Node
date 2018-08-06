
import {of as observableOf, Observable} from 'rxjs';

import {catchError, take, map} from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
    result: any;
    constructor(private authService: AuthService,
                private route: Router) {}

    canActivate() {
        return this.authService.isLoggedIn().pipe(
            map((r: Response) => {
                this.result = r;
                if (this.result.status === "success") {
                    localStorage.setItem('currentUser', JSON.stringify(this.result.data[0]));
                    return true;
                } else
                    return false;
            }),
            take(1),
            catchError(e => {
                if (window.location.hash == '#/login') {
                    return observableOf(true);
                }
                this.route.navigate(['login']);
                return observableOf(true);
            }),);
    }
}
