import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-cars',
  standalone: true,
  imports: [],
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.scss'
})
export class MyCarsComponent {

  cars: any = [];
  editIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcH4_RIEu-khWmdquzBeV317CoWz0Frbr_cUX_uV-oE4nY-2oQCwbYuVy8Cvzdyd5xIPk&usqp=CAU"
  deleteIcon = "https://cdn-icons-png.flaticon.com/512/1345/1345874.png";
  bidIcon = 'https://png.pngtree.com/png-clipart/20230918/original/pngtree-bidding-black-glyph-icon-vector-solid-cost-vector-png-image_12338368.png'
  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.getCarsDetails();
  }

  getCarsDetails() {
    // get cars
    this.customerService.getMyCars(StorageService.getUserId()).subscribe((response) => {
      console.log(response);
      this.cars = response;
    })
  }

  deleteMyCar(id: string) {
    this.customerService.deleteMyCar(id).subscribe((res) => {
      console.log(res);
      this.getCarsDetails();
    })
  }

  editMyCar(id: string) {
    this.customerService.getSelectedCarDetails(id).subscribe((res) => {
      console.log(res);
      this.router.navigate([`customer/post-car/${id}`], { state: { carData: res } });
    })
  }

  manageBid(carId: string) {
    this.router.navigate([`customer/manage-bids/${carId}`])
  }
}
