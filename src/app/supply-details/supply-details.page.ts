import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { SupplyService, Supply } from '../services/supply.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-supply-details',
  templateUrl: './supply-details.page.html',
  styleUrls: ['./supply-details.page.scss'],
})
export class SupplyDetailsPage implements OnInit {

  supply: Supply = {
    Name: "Test High School",
    Address: "123 Street",
    Shelter_ID: "Shelter X ",
    Delivery_Time: null,
    Shelter_Condition: "Abundant",
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

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController,
    private supplyService: SupplyService,
    private loadingController: LoadingController) 
    { }


  ngOnInit() {
    this.Supply_ID = this.route.snapshot.params['id'];
    if (this.Supply_ID) {
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
      //var d = this.supply.Delivery_Time;
      //var n = d.toDate();
      //this.supply.Delivery_Time= n;
      var temp = this.supply.Delivery_Time.toDate();
      this.supply.Delivery_Time = temp;
      var SwaterB = this.supply.WaterBottles_24pk_16oz;
      var SwaterTab = this.supply.WaterPurificationTablets_20pk;
      var ScanChick = this.supply.Canned_Chicken_7oz_8pk;
      var ScanTuna = this.supply.Canned_Tuna_7oz_12pk;
      var ScanSpam = this.supply.Canned_Spam_12oz_8pk;
      var ScanBfVegSp = this.supply.Canned_Soup_Beef_Vegetable_11oz_12pk;
      var ScanChickSp = this.supply.Canned_Soup_Chicken_Noodle_11oz_12pk;
      var ScanBeets = this.supply.Canned_Vegetable_Beets_106oz;
      var ScanCarrot = this.supply.Canned_Vegetable_Carrot_106oz;
      var ScanCorn = this.supply.Canned_Vegetable_Corn_106oz;
      var ScanGBeans = this.supply.Canned_Vegetable_GreenBean_106oz;
      var ScanMixVeg = this.supply.Canned_Vegetable_Mixed_106oz;
      var SWheatCrker = this.supply.Crackers_Wheat_8pk;
      var SOrigCrker = this.supply.Crackers_Original_8pk;
      var SGranolaBar = this.supply.Dry_Granola_Bars_2pk;
      var SPeanuts = this.supply.Package_SaltedPeanuts_48pk_1oz;
      var SMixedNuts = this.supply.Package_MixedNuts_48pk_1oz;
      var STrailMix = this.supply.Package_TrailMix_24pk_2oz;
      var SPeanutButter = this.supply.Peanut_Butter_16oz;
      var Spopulation = this.supply.Max_Population;
      var Scond = this.supply.Shelter_Condition;


      var a = this.conditionCheck(Spopulation, Scond, SwaterB, SwaterTab, ScanChick, ScanTuna,
        ScanSpam, ScanBfVegSp, ScanChickSp, ScanBeets,
        ScanCarrot, ScanCorn, ScanGBeans, ScanMixVeg, SWheatCrker, SOrigCrker,
        SGranolaBar, SPeanuts, SMixedNuts, STrailMix, SPeanutButter);
      this.supply.Shelter_Condition = a;
    });
  }
  conditionCheck(Spopulation: number, Scond: string, SwaterB: number,
    SwaterTab: number, ScanChick: number, ScanTuna: number, ScanSpam: number,
    ScanBfVegSp: number, ScanChickSp: number, ScanBeets: number,
    ScanCarrot: number, ScanCorn: number, ScanGBeans: number, ScanMixVeg: number,
    SWheatCrker: number, SOrigCrker: number, SGranolaBar: number, SPeanuts: number,
    SMixedNuts: number, STrailMix: number, SPeanutButter: number) {
    var counter = 0;

    //var critical = Spopulation * .6;
    //var warning = Spopulation * 1;
    //var ample = Spopulation * 1.25;
    //var abundant = Spopulation * 1.5;
    //Water Bottle Check
    var check = SwaterB / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Water Purification Tabs
    check = SwaterTab / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Canned Chicken
    check = ScanChick / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Canned Tuna
    check = ScanTuna / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Canned Spam
    var check = ScanSpam / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Canned Beef Veg Soup
    check = ScanBfVegSp / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }

    //Canned Chicken Noodle Soup
    check = ScanChickSp / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Canned Beets
    check = ScanBeets / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Canned Chicken Carrots
    check = ScanCarrot / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Canned Corn
    check = ScanCorn / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Canned Green Beans
    check = ScanGBeans / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Canned Mixed Veggies
    check = ScanMixVeg / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Wheat Crackers
    check = SWheatCrker / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Original Crackers
    check = SOrigCrker / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Granola Bars
    check = SGranolaBar / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Salted Peanuts
    check = SPeanuts / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Mixed Nuts
    check = SMixedNuts / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Trail Mix
    check = STrailMix / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }
    //Peanut Butter
    check = SPeanutButter / Spopulation;
    if (check <= .6) {
      Scond = "Critical";
      return Scond;
    }
    else if (check > .6 && check < 1.0) {
      //Scond = "warning";
      counter += 2;
    }
    else if (check >= 1.0 && check <= 1.25) {
      //Scond = "ample";
      counter += 1;
    }
    else if (check > 1.25 && check <= 1.50) {
      //Scond = "abundant";
    }

    if (counter >= 20) {
      Scond = "Warning"
      return Scond;
    }
    else if (counter > 0 && counter < 20) {
      Scond = "Ample"
      return Scond;
    }
    else {
      Scond = "Abundant";
      return Scond;
    }
  }
  async resupplyRequest(){

  }

  async saveSupply() {

    const loading = await this.loadingController.create({
      message: 'Saving Supplies..'
    });
    await loading.present();

    if (this.Supply_ID) {
      this.supplyService.updateSupply(this.supply, this.Supply_ID).then(() => {
        loading.dismiss();
        
      var SwaterB = this.supply.WaterBottles_24pk_16oz;
      var SwaterTab = this.supply.WaterPurificationTablets_20pk;
      var ScanChick = this.supply.Canned_Chicken_7oz_8pk;
      var ScanTuna = this.supply.Canned_Tuna_7oz_12pk;
      var ScanSpam = this.supply.Canned_Spam_12oz_8pk;
      var ScanBfVegSp = this.supply.Canned_Soup_Beef_Vegetable_11oz_12pk;
      var ScanChickSp = this.supply.Canned_Soup_Chicken_Noodle_11oz_12pk;
      var ScanBeets = this.supply.Canned_Vegetable_Beets_106oz;
      var ScanCarrot = this.supply.Canned_Vegetable_Carrot_106oz;
      var ScanCorn = this.supply.Canned_Vegetable_Corn_106oz;
      var ScanGBeans = this.supply.Canned_Vegetable_GreenBean_106oz;
      var ScanMixVeg = this.supply.Canned_Vegetable_Mixed_106oz;
      var SWheatCrker = this.supply.Crackers_Wheat_8pk;
      var SOrigCrker = this.supply.Crackers_Original_8pk;
      var SGranolaBar = this.supply.Dry_Granola_Bars_2pk;
      var SPeanuts = this.supply.Package_SaltedPeanuts_48pk_1oz;
      var SMixedNuts = this.supply.Package_MixedNuts_48pk_1oz;
      var STrailMix = this.supply.Package_TrailMix_24pk_2oz;
      var SPeanutButter = this.supply.Peanut_Butter_16oz;
      var Spopulation = this.supply.Max_Population;
      var Scond = this.supply.Shelter_Condition;

        var a = this.conditionCheck(Spopulation, Scond, SwaterB, SwaterTab, ScanChick, ScanTuna,
          ScanSpam, ScanBfVegSp, ScanChickSp, ScanBeets,
          ScanCarrot, ScanCorn, ScanGBeans, ScanMixVeg, SWheatCrker, SOrigCrker,
          SGranolaBar, SPeanuts, SMixedNuts, STrailMix, SPeanutButter);
        this.supply.Shelter_Condition = a;

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
