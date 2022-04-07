import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckYourPairingCodesPage } from './check-your-pairing-codes.page';

const routes: Routes = [
  {
    path: '',
    component: CheckYourPairingCodesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckYourPairingCodesPageRoutingModule {}
