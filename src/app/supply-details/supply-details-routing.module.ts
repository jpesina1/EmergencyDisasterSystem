import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplyDetailsPage } from './supply-details.page';

const routes: Routes = [
  {
    path: '',
    component: SupplyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplyDetailsPageRoutingModule {}
