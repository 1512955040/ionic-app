import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceiptPage } from './receipt';
//import { MockProvider } from './provider';

@NgModule({
  declarations: [
    ReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceiptPage),
  ],
})
export class ReceiptPageModule {}

