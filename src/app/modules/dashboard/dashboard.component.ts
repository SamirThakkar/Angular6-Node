import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

declare var require: any;

let _ = require('underscore');
let $ = require('jquery');

let _self = null;
//import * as io from 'socket.io-client';
//let io=require('io');


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  providers: []//,
  //changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
  }
}
