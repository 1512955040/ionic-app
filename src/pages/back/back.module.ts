import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackPage } from './back';

@NgModule({
  declarations: [
    BackPage,
  ],
  imports: [
    IonicPageModule.forChild(BackPage),
  ],
})
export class BackPageModule {}
