
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Platform } from "ionic-angular";//调试用
import { AlertController } from 'ionic-angular';
/*
  Generated class for the HttpSerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpSerProvider {
	 domain: string = "";  // 地址
   urls: object;
  constructor(private http: HttpClient,private platform: Platform,private alertCtrl: AlertController) {

  	
      // this.domain = "http://localhost:8101";  
//			 this.domain = "http://192.168.1.253:7081";  http://web.ekuter.com
				 // 是否是真机(仅调试用)
//		    if (this.platform.is("android")) {
//		        this.domain = "http://192.168.1.253:7081/"  
//			  } else {
			       this.domain = "http://192.168.1.253:7081/";  
//		    }
        	//接口
        this.urls={
        	//登录
      		loginAuth:this.domain+ "app/loginAuth",
      		//详情
      		order:this.domain+"app/order",
      		//点击拒单  权限审查
      		accountPermission:this.domain+"app/accountPermission",
      		//重新派工 点击确定
      		backOrder:this.domain+"app/backOrder/",
      		//待回单接口
      		myUncloseOrder:this.domain+"app/myUncloseOrder",
      		//已回单接口
      		myClosedOrder:this.domain+"app/myClosedOrder",
      		//退出登录
      		layout:this.domain+"/logout",
					//点击回单按钮接口
					orderBtn:this.domain+'app/accountPermission',
					//回单详情页接口
					orderDetails:this.domain+'app/order',
					//故障类别接口
					faultType:this.domain+'app/faultTypes',
					//回单提交接口
					submitWork:this.domain+'app/report/'
        }
 }
  	// get方法
    get(name: string, data?: object) {
        let paramData = new HttpParams();
        if (data) {
            let keys = Object.keys(data);

            keys.forEach((val) => {
                paramData = paramData.set(val, data[val]);
            });
            return this.http.get(this.urls[name], {params: paramData, withCredentials: true });
        } else {
            return this.http.get(this.urls[name],{ withCredentials: true });
        }
    }

    // post方法
    post(name: string, data?: object) {
        // 定义传送的数据对象
        let paramData = new HttpParams();
        if (data) {
            let objArr = Object.keys(data);
            for (let i = 0; i < objArr.length; i++) {
                // null和undefined处理成 ""
                if (data[objArr[i]] == null || data[objArr[i]] == undefined) {
                    data[objArr[i]] = "";
                }
              paramData = paramData.set(objArr[i], String(data[objArr[i]]));
            }
            	//返回带有数据的url 
            return this.http.post(this.urls[name],data,{withCredentials: true});
        } else {
            	//返回不带数据的url
            return this.http.post(this.urls[name],{withCredentials: true});
        }
    }
		// post方法
		post1(name: string,a:string,data?: object) {
				// 定义传送的数据对象
			
				let paramData = new HttpParams();
				if (data) {
							console.log(this.urls[name]+a)
							//返回带有数据的url 
						return this.http.post(this.urls[name]+a,data,{withCredentials: true});
				} else {
							//返回不带数据的url
						return this.http.post(this.urls[name],{withCredentials: true});
				}
		}
    
    doAlert(alertCtrol) {
	    let alert = this.alertCtrl.create({
	      title: '警告!',
	      subTitle: alertCtrol,
	      buttons: ['Ok']
	    });
    	alert.present();
  }
}
