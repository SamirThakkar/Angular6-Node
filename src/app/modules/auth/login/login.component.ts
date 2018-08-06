import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
declare var require: any;

let $ = require('jquery');

import {Observable} from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  loginFailedMsg: String = '';

  constructor(private authService: AuthService,
              private route: Router,
              private titleService: Title,
              public fb: FormBuilder) {

    // this.titleService.setTitle("ESCAPE59");
    authService.isLoggedIn().subscribe(r => {
      if (r.status == 'success')
        route.navigate(['dashboard']);
    });

    this.myForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    $('body').addClass('loginBg');
  }


  doLogIn(email, password, event): void {
    event.preventDefault();
    this.authService.doLogin(email, password).then(res => {
      if (res.status == 'success') {
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        this.route.navigate(['dashboard']);
      }
      else {
        this.loginFailedMsg = res.message;
      }
    });
  }
}
