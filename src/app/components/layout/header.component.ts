import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../modules/auth/shared/auth.service';
import {DashboardService} from '../../modules/dashboard/dashboard.service';
import {LoadingBarService} from '../../@shared/services/loadingbar.service';

declare var require: any;
var $ = require('jquery');

@Component({
  selector: 'header',
  templateUrl: './views/header.html',
  host: {}
})
export class HeaderComponent implements OnInit {
  userName: string;

  constructor(private authService: AuthService,
              private route: Router,
              private dashboardService: DashboardService) {
  }

  logOut(e): void {
    e.preventDefault();
    this.authService.logOut().then(res => {
      localStorage.removeItem('currentUser');
      this.route.navigate(['login']);
    });
  }

  ngOnInit(): void {
    let currentUserData = JSON.parse(localStorage.currentUser);
    this.userName = currentUserData.name;
  }

}
