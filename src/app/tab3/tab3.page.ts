import { Component, OnInit } from '@angular/core';
import { ShelterService, Shelter } from '../services/shelter.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SupplyService, Supply } from '../services/supply.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  shelters: Shelter[];
  supplies: Supply[];
  constructor(private shelterService: ShelterService,public afAuth: AngularFireAuth, private supplyService:SupplyService) {}

  ngOnInit(){
    this.shelterService.getShelters().subscribe(res => {
      this.shelters= res;
    });
    this.supplyService.getSupplies().subscribe(res => {
      this.supplies= res;
    });
  }

  remove(item){
    //this.shelterService.removeShelter(item.id);
    this.supplyService.removeSupply(item.id);
  }
  editSupply(item){
    
  }
}
