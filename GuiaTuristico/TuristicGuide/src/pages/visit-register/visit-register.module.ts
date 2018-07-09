import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitRegisterPage } from './visit-register';

@NgModule({
  declarations: [
    VisitRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitRegisterPage),
  ],
})
export class VisitRegisterPageModule {}
