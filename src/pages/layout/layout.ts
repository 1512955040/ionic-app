import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, ViewController } from 'ionic-angular';
import { HttpSerProvider } from '../../providers/http-ser';
import { LoginPage } from '../login/login';
/**
 * Generated class for the LayoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-layout',
  templateUrl: 'layout.html',
})
export class LayoutPage {

  constructor(
  	public navCtrl: NavController, 
  	
  	public viewCtrl: ViewController,
  	public popoverCtrl:PopoverController,
  	public httpSer: HttpSerProvider,
  ) {
  	
  }
  layouts(){
  	this.viewCtrl.dismiss();
  	this.httpSer.get("layout").subscribe((result)=>{
	        this.navCtrl.push(LoginPage);
        },(err)=>{
        		this.httpSer.doAlert(err.error.msg)
        	})
  }
	
  ionViewDidLoad() {
    var s = document.querySelector('.popover-content');
    s['style'].marginTop = '20px';
    
  }

}
