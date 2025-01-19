import { Component } from '@angular/core';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  totalCars: any = [];
  cars: any = [];
  listOfPincode: any = [];
  listOfCity: any = [];
  wishList: any = []
  unCheckedHeartImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNNIL_24u_OSFQvaRC_zM_24_-GJ9lkgTPIOtkNPOXt4oVaPOPiHSxVlsIY6-GeJEN7Ng&usqp=CAU";
  checkedHeartImg = "https://banner2.cleanpng.com/20180703/uco/kisspng-computer-icons-clip-art-worship-5b3b843f293b88.5229754215306271351689.jpg";
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getCarsDetails();
  }

  getCarsDetails() {
    // get cars
    this.adminService.getCarList().subscribe((response) => {
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

}
