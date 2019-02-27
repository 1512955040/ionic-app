import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,InfiniteScroll,PopoverController,Content } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { PopoverPage } from '../popover/popover';
import { LayoutPage } from '../layout/layout';
import { HttpSerProvider } from '../../providers/http-ser';
//import { MockProvider} from './provider';
/**
 * Generated class for the ReceiptPage page.
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {
  id:string;
  items=[];
  pageNum=1;
  querys:string;
  loadmore:boolean;
  distance:boolean;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public popoverCtrl:PopoverController,
  	public httpSer: HttpSerProvider,
//	private mockProvider: MockProvider
  ) {
  	console.log(this.navParams.data)
	for (let i = 0; i < 8; i++) {
      this.items.push( this.items.length );
   }

  }
  //默认待回单接口
  UncloseOrder(){
  	if(this.querys==undefined || this.querys==null){
  		this.querys=''
  	}
  	this.httpSer.get("myUncloseOrder",{
		query:this.querys,
		pageNum:this.pageNum
	}).subscribe((result)=>{
//  	console.log(result)
    	if(result['data']!==undefined && result['data']!==null && result['data'].length>0){
    		this.items=result['data']
	    	for(var i=0;i<this.items.length;i++){
	    		this.items[i].orderStatusStr=this.items[i].orderStatusStr.substring(0,1)
	    		if(this.items[i].solveSurplus!==null && this.items[i].solveSurplus!==undefined){
	    			if(this.items[i].solveSurplus>0){
	    				console.log(typeof(this.items[i].solveSurplus))
	    				this.items[i].distance=true
	    				this.items[i].solveSurplus=Math.floor(this.items[i].solveSurplus/60/24)+'天'+Math.floor(this.items[i].solveSurplus/60%24)+'时'+Math.floor(this.items[i].solveSurplus%60)+'分钟'
	    			}else{
	    				this.items[i].distance=false
	    				this.items[i].solveSurplus=Math.floor(-this.items[i].solveSurplus/60/24)+'天'+Math.floor(-this.items[i].solveSurplus/60%24)+'时'+Math.floor(-this.items[i].solveSurplus%60)+'分钟'
	    			}
	    		}
	    	}
    	}else{
    		this.items=[]
    	}
    	
    	
	},(err)=>{
		this.httpSer.doAlert(err.error.msg)
	})
  }
  	//已回单
	ClosedOrder(){
	  	this.httpSer.get("myClosedOrder",{
			query:this.querys,
			pageNum:this.pageNum
		}).subscribe((result)=>{
	    	if(result['data']!==undefined && result['data']!==null && result['data'].length>0){
	    		this.items=result['data']
		    	for(var i=0;i<this.items.length;i++){
	    			this.items[i].orderStatusStr=this.items[i].orderStatusStr.substring(0,1)
	    			if(this.items[i].solveSurplus!==null && this.items[i].solveSurplus!==undefined){
		    			if(this.items[i].solveSurplus>0){
		    				this.items[i].distance=true
 							this.items[i].solveSurplus=Math.floor(this.items[i].solveSurplus/60/24)+'天'+Math.floor(this.items[i].solveSurplus/60%24)+'时'+Math.floor(this.items[i].solveSurplus%60)+'分钟'
		    			}else{
		    				this.items[i].distance=false
 							this.items[i].solveSurplus=Math.floor(-this.items[i].solveSurplus/60/24)+'天'+Math.floor(-this.items[i].solveSurplus/60%24)+'时'+Math.floor(-this.items[i].solveSurplus%60)+'分钟'
		    			}
	    			}
	    		}
		    	console.log(this.items)
	    	}else{
	    		this.items=[]
	    	}
	    	
		},(err)=>{
			this.httpSer.doAlert(err.error.msg)
		})
	}
  doRefresh(refresher) {
//    console.log('Begin async operation', refresher);
    setTimeout(() => {
        if (this.pageNum<=1) {
      		this.pageNum=1
      	}else{
      		this.pageNum--;
      		this.UncloseOrder()
      	}
//    console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }
  
  
  doInfinite(infiniteScroll: InfiniteScroll) {
//	console.log(this.pageNum)
  	if (this.pageNum>=this.items[0].pages) {
      	this.pageNum=this.items[0].pages
//    	infiniteScroll.enable(false);
    }else{
      	this.pageNum++;
      	this.UncloseOrder()
      	this.toTop()
    }
 	setTimeout(() => {
//    for (let i = 0; i < 8; i++) {
//      this.items.push( this.items.length );
//    }
	  
//    if (this.items.length<8) {
////      infiniteScroll.enable(false);
//    }else{
//    	infiniteScroll.complete();
//    }
      infiniteScroll.complete();
    }, 500);
}
  	persentPopover(myEvent){
  		console.log(myEvent)
		let popover=this.popoverCtrl.create(PopoverPage,{query:this.querys,pageNum:this.pageNum});
		popover.present({
			ev:myEvent
		});
	}
  	persentPopovers(myEvent){
  		console.log(myEvent)
		let popover=this.popoverCtrl.create(LayoutPage);
		popover.present({
			ev:myEvent
		});
	}
  	//点击事件
   enterNext(id:string){
		this.navCtrl.push(DetailPage,{
			id:id,
			tabsn:this.navParams.data.tabs
		});
   }
   @ViewChild(Content) content: Content;
   toTop() {
	  	this.content.scrollToTop();
   }
  ionViewDidLoad() {
  	
  	this.pageNum=1;
  	if(this.navParams.data.querys==undefined && this.navParams.data.tabs==undefined){
  		this.UncloseOrder()
  	}else{
  		if(this.navParams.data.querys==undefined){
  			this.querys=""
  		}else{
  			this.querys=this.navParams.data.querys
  		}
  		if(this.navParams.data.tabs=='a'){
  			this.UncloseOrder()
  		}else if(this.navParams.data.tabs=='b'){
  			this.ClosedOrder()
  		}
  	}
    
  }
}
