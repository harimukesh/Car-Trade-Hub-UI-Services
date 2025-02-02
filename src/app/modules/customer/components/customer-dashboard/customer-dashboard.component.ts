import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { CustomerRoutingModule } from '../../customer-routing.module';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {

  totalCars: any = [];
  cars: any = [];
  listOfPincode: any = [];
  listOfCity: any = [];
  wishList: any = []
  unCheckedHeartImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNNIL_24u_OSFQvaRC_zM_24_-GJ9lkgTPIOtkNPOXt4oVaPOPiHSxVlsIY6-GeJEN7Ng&usqp=CAU";
  checkedHeartImg = "https://banner2.cleanpng.com/20180703/uco/kisspng-computer-icons-clip-art-worship-5b3b843f293b88.5229754215306271351689.jpg";
  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.getCarsDetails();
    this.getWishList();
  }

  getCarsDetails() {
    // get cars
    this.customerService.getCarList().subscribe((response) => {
      console.log(response);
      this.totalCars = response;
      this.cars = response;
      this.listOfPincode = Array.from(new Set((response as any[]).map(item => item.pincode)));
      this.listOfCity = Array.from(new Set((response as any[]).map(item => item.city)));
    })
  }

  onChangePincode(event: any) {
    console.log(event.target.value)
    const selectedPincode = event.target.value
    this.cars = (this.totalCars as any[]).filter(car => car.pincode == selectedPincode);
  }

  onChangeCity(event: any) {
    console.log(event.target.value)
    const selectedCity = event.target.value
    this.cars = (this.totalCars as any[]).filter(car => car.city == selectedCity);
  }

  getWishList() {
    this.customerService.getWishList(StorageService.getUserId()).subscribe((res: any) => {
      this.wishList = res.wishList
    })
  }

  isCarWishByCustomer(CarId: any): boolean {
    console.log(this.wishList.includes(CarId))
    return this.wishList.includes(CarId);
  }

  wishListClick(carId: any) {
    //this.wishListImg = this.checkedHeartImg;
  }

  proceedToBid(carId: string) {
    console.log(carId)
    this.router.navigate([`/customer/car/${carId}/book`])
  }

}
