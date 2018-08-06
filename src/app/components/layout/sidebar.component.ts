import {Component,OnInit} from '@angular/core';
declare var require: any;

let $=require('jquery');
@Component({
    selector:'sidebar',
  templateUrl:'./views/sidebar.html'/*,
    host:{
        'class':'app-aside hidden-xs bg-black'
    }*/
})
export class SidebarComponent{

    constructor() {

    }


}

