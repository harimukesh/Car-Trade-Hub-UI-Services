import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-my-cars',
  standalone: true,
  imports: [],
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.scss'
})
export class MyCarsComponent {

  cars: any = [];
  deleteIcon = "https://cdn-icons-png.flaticon.com/512/1345/1345874.png";
  constructor(private customerService: CustomerService) { }

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

}
