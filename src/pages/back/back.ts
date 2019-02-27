import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpSerProvider } from '../../providers/http-ser';
import { ReceiptPage } from '../receipt/receipt';
/**
 * Generated class for the BackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation. orderUuid dispatchUuid
 */

@IonicPage()
@Component({
  selector: 'page-back',
  templateUrl: 'back.html',
})
export class BackPage {
	textareaDetail:string;
	orderUuidThe:string;
  constructor(public navCtrl: NavController, public navParamsa: NavParams,public httpSer: HttpSerProvider) {
  		//console.log(this.navParamsa.data.dispatchUuid)
//		this.orderUuidThe=this.navParamsa.data.orderUuid
  }
  //点击取消返回上一页
  backLastPage(){
	this.navCtrl.pop();
  }
  //点击确定 backOrder
  nextListPage(){
	this.httpSer.get("backOrder",{
		reason:this.textareaDetail,
		orderUuid:this.navParamsa.data.orderUuid,
		dispatchUuid:this.navParamsa.data.dispatchUuid
	}
	).subscribe((result)=>{
    	console.log(result)
    	if(result['code']==200){
    		this.navCtrl.push(ReceiptPage);
    	}
	},(err)=>{
		this.httpSer.doAlert(err.error.msg)
	})
	
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad BackPage');
  }

}
