import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Request, RequestSupplyService } from '../services/request-supply.service';

@Component({
  selector: 'app-request-supplies',
  templateUrl: './request-supplies.page.html',
  styleUrls: ['./request-supplies.page.scss'],
})
export class RequestSuppliesPage implements OnInit {

  currDate:any=new Date().toISOString();
  request:Request ={
    Time: this.currDate,
    Item: 'Water Bottles',
    Name : 'Highlands High School',
    ID:'string',
  }
  ID=null;
  constructor(private loadingController: LoadingController, private nav: NavController,private requestService: RequestSupplyService,) { }

  ngOnInit() {
  }
  async submitRequest(){
    const loading = await this.loadingController.create({
      message: 'Saving Request..'
    });
    await loading.present();


    if (this.ID) {
      this.requestService.updateRequest(this.request, this.ID).then(() => {
        loading.dismiss();
        this.nav.back();

      });
    } else {

      const now = new Date();
      this.request.Time = now;
      this.requestService.addRequest(this.request).then(() => {
        loading.dismiss();
        this.nav.back();

      });
    }
  }

}
