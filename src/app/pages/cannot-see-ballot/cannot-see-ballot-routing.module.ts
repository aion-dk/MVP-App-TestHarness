import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CannotSeeBallotPage } from './cannot-see-ballot.page';

const routes: Routes = [
  {
    path: '',
    component: CannotSeeBallotPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CannotSeeBallotPageRoutingModule {}
