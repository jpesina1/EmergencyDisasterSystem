import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShelterDetailsPageRoutingModule } from './shelter-details-routing.module';

import { ShelterDetailsPage } from './shelter-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShelterDetailsPageRoutingModule
  ],
  declarations: [ShelterDetailsPage]
})
export class ShelterDetailsPageModule {}
