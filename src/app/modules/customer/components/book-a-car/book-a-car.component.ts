import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-a-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-a-car.component.html',
  styleUrl: './book-a-car.component.scss'
})
export class BookACarComponent {


  id: any;
  car: any;
  bidForm!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.params["carId"];
  }


  ngOnInit() {
    this.bidForm = this.fb.group({
      price: [null, [Validators.required]]
    })
    const carDetails: any = this.getCar();
    if (carDetails.userId === StorageService.getUserId()) {
      this.router.navigate(['/customer/my-cars']);
    } else {
      this.car = carDetails;
    }
  }



  getCar() {
    return this.customerService.getSelectedCarDetails(this.id).subscribe((res) => {
      console.log(res);
      return res;
    })
  }


  onBid(formData: any) {
    const bidDetails = {
      carId: this.id,
      userId: StorageService.getUserId(),
      price: formData.price
    }
    this.customerService.bidACar(bidDetails).subscribe((res) => {
      console.log(res);
    })
  }
}
