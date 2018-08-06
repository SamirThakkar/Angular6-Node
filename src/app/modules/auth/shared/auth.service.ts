
import {catchError, take, map} from 'rxjs/operators';

import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Response} from "@angular/http";




import {DataService} from '../../../@shared/services/data.service';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient,
                private dataService: DataService) {
    }

    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    isLoggedIn(): Observable<any> {
        return this.http.post(`/check-login`, {}).pipe(
            map((r: Response) => r),
            take(1),
            catchError(this.handleError),);
    }

    doLogin(username, password): Promise<any> {
        return this.http
            .post('/login', JSON.stringify({username: username, password: password}), {headers: this.headers})
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    logOut(): Promise<any> {
        return this.http
            .get('/logout', {headers: this.headers})
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return observableThrowError(errMsg);

    }
}
