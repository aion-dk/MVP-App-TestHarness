import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CannotSeeBallotPageRoutingModule } from './cannot-see-ballot-routing.module';

import { CannotSeeBallotPage } from './cannot-see-ballot.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CannotSeeBallotPageRoutingModule],
  declarations: [CannotSeeBallotPage],
})
export class CannotSeeBallotPageModule {}
