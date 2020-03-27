import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShelterDetailsPage } from './shelter-details.page';

const routes: Routes = [
  {
    path: '',
    component: ShelterDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShelterDetailsPageRoutingModule {}
