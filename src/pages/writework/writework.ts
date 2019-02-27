import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';  //这三个该引的包还是要引哟！！！
import { HttpSerProvider } from '../../providers/http-ser';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the WriteworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-writework',
  templateUrl: 'writework.html',
})
export class WriteworkPage {
	  path: string[];
	  holePath: string[];
	  path0:string;
	  productType:string; 
	  productName:string;
	  productTypeId:string;
	  faultType1=[];
		fault:any;
	  status:any;
		protect:any;
		productId:any;
		desc:any;
	  access_token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXBpLXJlc291cmNlIl0sInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwiZXhwIjoxNTA5MTk2OTcyLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOWFmYmIyYWItMzdiYi00MTIyLTg2NDAtY2FmMDc1OTRmOGZkIiwiY2xpZW50X2lkIjoiY2xpZW50MiJ9.bJOpK0UjCI1ym32uerR_jKp4pv8aLaOxnTeK_DBjYZU';
	  fileTransfer: FileTransferObject = this.transfer.create(); 
	  constructor(public navCtrl: NavController,public navParams: NavParams,private camera: Camera,
	    private transfer: FileTransfer, private file: File,public httpSer: HttpSerProvider,public alertCtrl: AlertController) {
				this.path=[];
				this.holePath=[];
	  } 
	  //打开摄像头
	  openCamera() {    
	    const options: CameraOptions = {     
	      quality: 90,//相片质量 0 -100
	      destinationType: this.camera.DestinationType.DATA_URL, //DATA_URL 是 base64  FILE_URL 是文件路径
	      encodingType: this.camera.EncodingType.JPEG,
	      mediaType: this.camera.MediaType.PICTURE,
	      saveToPhotoAlbum: true,      //是否保存到相册
	      sourceType: this.camera.PictureSourceType.CAMERA ,  //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择选										择CAMERA : 拍照,
				
	  } 
	  this.camera.getPicture(options).then((imageData) => {   
	      let base64Image = 'data:image/jpeg;base64,' + imageData;     
	      this.path.push(base64Image);      //If it's file URI
		  this.path0=base64Image;
	      this.upload();
	    }, (err) => {
	      alert("获取图片失败");      // Handle error
	    });
	  } 
		//打开相册
		openPhotos(){
				const options: CameraOptions = {     
					quality: 90,//相片质量 0 -100
					destinationType: this.camera.DestinationType.DATA_URL, //DATA_URL 是 base64  FILE_URL 是文件路径
					encodingType: this.camera.EncodingType.JPEG,
					mediaType: this.camera.MediaType.PICTURE,
					saveToPhotoAlbum: true,      //是否保存到相册
					sourceType: this.camera.PictureSourceType.PHOTOLIBRARY ,  //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择选										择CAMERA : 拍照,
					
			} 
			this.camera.getPicture(options).then((imageData) => {   
					console.log("got file: " + imageData);      // If it's base64:
					let base64Image = 'data:image/jpeg;base64,' + imageData;     
					this.path.push(base64Image);      //If it's file URI
					this.path0=base64Image;
					this.upload();
				}, (err) => {
					alert("获取图片失败");      // Handle error
				});
		}
	  //文件上传
	  upload(){   
	    const apiPath = "http://192.168.1.253:7081/app/uploadFile" ;   
	    let options: FileUploadOptions = {     
	      fileKey: 'file',     
	      fileName: 'name.jpg',  //文件名称
	      headers: {},      // 如果要传参数，写这里
	      params: {       
	        maxSize: 5000000,       
	        modularName: 'CNL',       
	        allowType: 'jpg;png;pdf;doc;xls;xlsx;docx',
	      }
	    };   
	    this.fileTransfer.upload(this.path0, apiPath, options)
	    .then((data) => {       
	      console.log(data);
				alert("图片上传成功");
				this.status=true;
	    }, (err) => {
	      console.log(err);
				alert("图片上传失败");
				this.status=false;
	    });
	  }
	  //删除图片
	  deletePhoto(event: Event, i: number){
	  	let alert = this.alertCtrl.create({
	        	title: '确定删除当前图片吗?',
	  //    	message: '拒单之后要重新派工,你确定要拒单吗?',
	        	buttons: [
	          	{
	            	text: '取消',
	            		handler: () => {
	              		console.log('Disagree clicked');
	            		}
	          	},
	  	    	{
	  	        	text: '确定',
	  	        	handler: () => {
									this.holePath.push(this.path[i]);
									console.log(this.holePath);
								this.path.splice(i, 1);
	  	        	}
	  	    	}
	      	]
	      });
	      alert.present();
	  }
	  ionViewDidLoad(){
		console.log(this.navParams.data)
		this.httpSer.get("orderDetails",{
			id:this.navParams.data.orderUuid 
		}).subscribe((result)=>{
			this.productType=result['data']['productType'];
			this.productName=result['data']['productName'];
			this.productTypeId=result['data']['productTypeId'];
		},(err)=>{
        	this.httpSer.doAlert(err.error.msg)
       })
	   setTimeout(()=>{
		   this.faultTypeC();
	   },100)
	}
	
	 faultTypeC(){
		 this.httpSer.get("faultType",{
			 productTypeId:this.productTypeId 
		 }).subscribe((result)=>{
			 console.log(result)
			 this.faultType1=result['data'];
			 console.log(this.faultType1)
		 },(err)=>{
			 this.httpSer.doAlert(err.error.msg)
		 })
	 }
	
	 // 提交+this.navParams['data']['orderUuid']
	 submit(){
		 console.log(this.navParams['data']['orderUuid'])
		 var a=this.navParams['data']['orderUuid'];
		 var b="http://192.168.1.253:7081/app/report/"+a;
		 console.log(b);
		 
// 		this.http.post(b,{
// 			orderUuid:this.navParams.data.orderUuid,
// 			dispathUuid:this.navParams.data.dispathUuid,
// 			productType:this.productType,
// 			productName:this.productName,
// 			productUuid:this.productId,
// 			productTypeId:this.productTypeId,
// 			warrantyStatus:this.protect,
// 			disposeDescribes:this.desc,
// 			faultType:this.fault,
// 			delFileIds:this.holePath,
// 			fileIds:this.path
// 		},{ withCredentials: true }).subscribe((result)=>{
// 			if(result['code']==200){
// 				console.log(result['data'])
// 			}
// 		},(err)=>{
// 			console.log(err)
// 		 })
			
			this.httpSer.post1('submitWork',a,{
						orderUuid:this.navParams.data.orderUuid,
						dispathUuid:this.navParams.data.dispathUuid,
						productType:this.productType,
						productName:this.productName,
						productUuid:this.productId,
						productTypeId:this.productTypeId,
						warrantyStatus:this.protect,
						disposeDescribes:this.desc,
						faultType:this.fault,
						delFileIds:this.holePath,
						fileIds:this.path
					}).subscribe((result)=>{
						if(result['code']==200){
							console.log(result['data'])
						}
					},(err)=>{
						console.log(err)
					 })
			
			
			
			
			
			
	 }
}
