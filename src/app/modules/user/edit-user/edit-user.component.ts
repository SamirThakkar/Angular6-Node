import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from "../shared/user";
import {Router} from "@angular/router";
import {UserService} from "../shared/user.service";

@Component({
    selector: 'form-edit',
  templateUrl: './edit-user.component.html',
    providers: [UserService]
})
export class UserEditComponent {
    id: string;
    userdata: User = new User('','','',true);
    listOfRoles: Array<any> = [];

    constructor(private UserService: UserService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.UserService.getUserById(this.id)
                .then(res => {
                    this.userdata = res;
                })
        });
        this.listOfRoles = this.route.snapshot.data.listOfRoles.data;
        this.userdata = this.route.snapshot.data.anyuser;

    }

    updateUserName(userForm) {
        if (userForm.form.valid) {
            this.UserService.updateUser(this.userdata, this.id).then(() => {
                this.router.navigate(['/user']);
            });
        }
    }
}
