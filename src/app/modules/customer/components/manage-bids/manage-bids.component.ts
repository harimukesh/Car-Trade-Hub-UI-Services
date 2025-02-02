import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-bids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-bids.component.html',
  styleUrl: './manage-bids.component.scss'
})
export class ManageBidsComponent {
  id: any;
  bids: any = [];
  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params["carId"];
  }

  ngOnInit() {
    this.getBidsByCarId();
  }

  getBidsByCarId() {
    this.customerService.getBidByCarId(this.id).subscribe((res) => {
      console.log(res);
      this.bids = res;
    })
  }
  changeBidAction(bidId: any, changeAction: any) {
    this.customerService.changeBidStatus(bidId, changeAction).subscribe((res) => {
      console.log(res);
      this.getBidsByCarId();
    })
  }
}
