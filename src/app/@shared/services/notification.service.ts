import { Injectable }    from '@angular/core';
declare var require: any;
let noty=require('noty');

@Injectable()
export class NotificationService {
	notifyMsg(text,type): void{
		noty({text: text,type:type,timeout:5000,killer:true});
	}
	getNotyObject():any{
		return noty;
	}
}
