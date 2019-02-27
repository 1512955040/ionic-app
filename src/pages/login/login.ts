import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
//import { FormGroup, FormBuilder, Validators } from "@angular/forms";//提交form表单
//import { BackButtonProvider } from '../../providers/back-button/back-button';//硬件返回按钮
import { HttpSerProvider } from '../../providers/http-ser';
import { ReceiptPage } from '../receipt/receipt';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/*
 	BackButtonProviders//硬件返回按钮
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
//providers: [HttpSerProvider]
})
export class LoginPage {
	loginname:string;
	password:string;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public httpSer: HttpSerProvider
  ) {
  	
  }
    enterNext(){
    	if(this.loginname=='' || this.password==''){
    		this.httpSer.doAlert('账号或密码不能为空!')
    	}else{
    		this.httpSer.post("loginAuth",{
      			loginname:this.loginname,
      			password:this.password
        	}).subscribe((result)=>{
          		console.log(result)
            	if(result['code']==200){
        			this.navCtrl.push(ReceiptPage); 
//					this.navCtrl.push(LalalaPage);
            	}
        	},(err)=>{
        		this.httpSer.doAlert(err.error.msg)
        	})
    	}
    }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
