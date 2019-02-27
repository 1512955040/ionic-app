import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { MyApp } from './app.component';
import { ReceiptPage } from '../pages/receipt/receipt';
import { PopoverPage } from '../pages/popover/popover';
import { WriteworkPage } from '../pages/writework/writework';

import { DetailPage } from '../pages/detail/detail';
import { BackPage } from "../pages/back/back";
import { LayoutPage } from "../pages/layout/layout";
import { HttpSerProvider } from '../providers/http-ser';
//手机摄像头调用
import { Camera } from '@ionic-native/camera';
import {File} from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
@NgModule({
  declarations: [
    MyApp,
		LoginPage,
		ReceiptPage,
		PopoverPage,
		WriteworkPage,
		
		DetailPage,
		BackPage,
		LayoutPage,
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
		LoginPage,
		ReceiptPage,
		PopoverPage,
		WriteworkPage,
		
		DetailPage,
		BackPage,
		LayoutPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
		HttpSerProvider,

	Camera,
	File,
	FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
