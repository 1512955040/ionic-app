import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpSerProvider } from '../../providers/http-ser';
import { AlertController } from 'ionic-angular';
import { BackPage } from '../back/back';
import { WriteworkPage } from '../writework/writework';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation. 15301234567
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
//providers: [HttpSerProvider]
})
export class DetailPage {
	datas:object;
	dispatchUuid:string;
  	constructor(
  		public navCtrl: NavController, 
  		public navParamsa: NavParams,
  		public httpSer: HttpSerProvider,
  		public alertCtrl: AlertController
  	) {
  		//console.log(this.navParamsa.data)
  	}
  	//当进入页面时触发
	ionViewDidLoad(){
		this.httpSer.get("order",{
      		id:this.navParamsa.data.id 
       }).subscribe((result)=>{
          	this.datas=result['data']
//        	console.log(result['data'])
        },(err)=>{
        	this.httpSer.doAlert(err.error.msg)
        })
       
	}
	
	doConfirm() {
    	let alert = this.alertCtrl.create({
      	title: '确定拒单吗?',
//    	message: '拒单之后要重新派工,你确定要拒单吗?',
      	buttons: [
        	{
          	text: '返回',
          		handler: () => {
            		console.log('Disagree clicked');
          		}
        	},
	    	{
	        	text: '确定',
	        	handler: () => {
	            	this.refuseDetail()
	        	}
	    	}
    	]
    });
    alert.present();
  }
	//点击拒单操作
	refuseDetail(){
		this.httpSer.get("accountPermission",{
      		orderUuid:this.navParamsa.data.id 
      }).subscribe((result)=>{
      		if(result['code']==200){
      			this.dispatchUuid=result['data']
      			this.navCtrl.push(BackPage,{
					dispatchUuid:this.dispatchUuid,
					orderUuid:this.navParamsa.data.id
				});
      		}  	
        },(err)=>{
        	this.httpSer.doAlert(err.error.msg)
        })
	}
	//点击回单操作
	pushMorePage(){
		this.httpSer.get("orderBtn",{
			orderUuid:this.navParamsa.data.id 
		}).subscribe((result)=>{
			if(result['code']==200){
				//console.log(result)
				this.navCtrl.push(WriteworkPage,{
					orderUuid:this.navParamsa.data.id,
					dispathUuid:result['data']

				})
			}
		},(err)=>{
        	this.httpSer.doAlert(err.error.msg)
       })
	
	}
}
