import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckYourPairingCodesPageRoutingModule } from './check-your-pairing-codes-routing.module';

import { CheckYourPairingCodesPage } from './check-your-pairing-codes.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CheckYourPairingCodesPageRoutingModule],
  declarations: [CheckYourPairingCodesPage],
})
export class CheckYourPairingCodesPageModule {}
