import {Component} from '@angular/core';
import {User} from '../shared/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/user.service';
import {CommonService} from '../../../@shared/services/common.service';

@Component({
  selector: 'user-add',
  templateUrl: './add-user.component.html',
  providers: [UserService]
})

export class AddUserComponent {
  constructor(private userService: UserService,
              private commonService: CommonService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  userdata: User = new User('', '', '', true);


  ngOnInit() {

  }

  AddUser(userForm) {
    if (userForm.form.valid) {
      this.userService.addUserService(this.userdata).then(res => {
        console.log(res);
        if (res == 'User already exists') {
          // message = this.commonService.getMessage('user.existsuser');
          // this.commonService.setMessage(message, 'error');
          this.router.navigate(['user/add']);
        }
        else {
          // message = this.commonService.getMessage('user.addsuccess');
          // this.commonService.setMessage(message, 'success');
          this.router.navigate(['user/list']);
        }
      });
    }
  }
}

