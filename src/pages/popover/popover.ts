import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { ReceiptPage } from '../receipt/receipt';
/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
	querys:string;
	tabs:string;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public viewCtrl: ViewController,
  	public popoverCtrl:PopoverController,
  ) {
  	console.log(this.navParams)
  }
  	//待回单
	Backdetails(){
		this.viewCtrl.dismiss();
	//	console.log(this.navParams.data.query)
		this.navCtrl.push(ReceiptPage,{
			querys:this.navParams.data.query,
			tabs:'a',
		});
	}
	
	//已回单
	Stildetails(){
		this.viewCtrl.dismiss();
		console.log(this.navParams.data.query)
		this.navCtrl.push(ReceiptPage,{
			querys:this.navParams.data.query,
			tabs:'b',
		});
	}
	
	
	
  ionViewDidLoad() {
  	
  }

}
