import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { SupplyService, Supply } from '../services/supply.service';

@Component({
  selector: 'app-supply-details',
  templateUrl: './supply-details.page.html',
  styleUrls: ['./supply-details.page.scss'],
})
export class SupplyDetailsPage implements OnInit {

  supply:Supply = {
    Name : "Test High School",
    Address: "123 Street",
    Shelter_ID:"Shelter X ",
    Delivery_Time: null,
    Shelter_Condition:null,
    Max_Population: 100,
    WaterBottles_24pk_16oz: 100,
    WaterPurificationTablets_20pk: 100,
    Canned_Chicken_7oz_8pk: 100,
    Canned_Tuna_7oz_12pk: 100,
    Canned_Spam_12oz_8pk: 100,
    Canned_Soup_Beef_Vegetable_11oz_12pk: 100,
    Canned_Soup_Chicken_Noodle_11oz_12pk: 100,
    Canned_Vegetable_Beets_106oz: 100,
    Canned_Vegetable_Carrot_106oz: 100,
    Canned_Vegetable_Corn_106oz: 100,
    Canned_Vegetable_GreenBean_106oz: 100,
    Canned_Vegetable_Mixed_106oz: 100,
    Crackers_Wheat_8pk: 100,
    Crackers_Original_8pk: 100,
    Dry_Granola_Bars_2pk: 100,
    Package_SaltedPeanuts_48pk_1oz: 100,
    Package_MixedNuts_48pk_1oz: 100,
    Package_TrailMix_24pk_2oz: 100,
    Peanut_Butter_16oz: 100,
  }
  Supply_ID = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private supplyService:SupplyService, private loadingController: LoadingController) { }
 
  
  ngOnInit(){
    this.Supply_ID = this.route.snapshot.params['id'];
    if (this.Supply_ID)  {
      this.loadSupply();
    }
  }
  async loadSupply() {
    const loading = await this.loadingController.create({
      message: 'Loading Supplies..'
    });
    await loading.present();
 
    this.supplyService.getSupply(this.Supply_ID).subscribe(res => {
      loading.dismiss();
      this.supply = res;
    });
  }
    async saveSupply() {
 
      const loading = await this.loadingController.create({
        message: 'Saving Supplies..'
      });
      await loading.present();
   
      if (this.Supply_ID) {
        this.supplyService.updateSupply(this.supply, this.Supply_ID).then(() => {
          loading.dismiss();
          this.nav.back();
      });
      } else {
        this.supplyService.addSupply(this.supply).then(() => {
          loading.dismiss();          
          this.nav.back();

        });
      }
    }
}
