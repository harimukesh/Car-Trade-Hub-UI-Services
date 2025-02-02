import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-bids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-bids.component.html',
  styleUrl: './view-bids.component.scss'
})
export class ViewBidsComponent {
  bids: any = [];
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getMybids();
  }

  getMybids() {
    this.customerService.getMyBids(StorageService.getUserId()).subscribe((response) => {
      console.log(response);
      this.bids = response;
    })
  }
}
