import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { ToastService } from '../../../../auth/services/toast/toast.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {

  listOfBrands = ['Toyota', 'Honda', 'Suzuki', 'Nissan', 'Mitsubishi', 'Hyundai', 'Kia', 'Mercedes', 'BMW', 'Audi', 'Lexus', 'Chevrolet', 'Ford', 'Jeep', 'Land Rover', 'Range Rover', 'Porsche', 'Volkswagen', 'Volvo', 'Subaru', 'Mazda', 'Peugeot', 'Renault', 'Fiat', 'Citroen', 'Chery', 'Geely', 'BYD', 'Changan', 'Daihatsu', 'Faw', 'Haval', 'Isuzu', 'JAC', 'Karry', 'MG', 'Mini', 'Opel', 'Proton', 'Ssangyong', 'Tata', 'Tesla', 'Zotye', 'Zxauto', 'Alfa Romeo', 'Aston Martin', 'Bentley', 'Bugatti', 'Cadillac', 'Chrysler', 'Dodge', 'Ferrari', 'Fisker', 'GMC', 'Infiniti', 'Jaguar', 'Lamborghini', 'Maserati', 'McLaren', 'Rolls Royce', 'Saab', 'Scion', 'Smart', 'SRT', 'Wiesmann', 'Zenvo', 'Acura', 'Datsun', 'Hummer', 'Pontiac', 'Saturn', 'Shelby', 'SRT', 'Ssangyong', 'Suzuki', 'Tata', 'Tesla', 'Zotye', 'Zxauto', 'Alfa Romeo', 'Aston Martin', 'Bentley', 'Bugatti', 'Cadillac', 'Chrysler', 'Dodge', 'Ferrari', 'Fisker', 'GMC', 'Infiniti', 'Jaguar', 'Lamborghini', 'Maserati', 'McLaren', 'Rolls Royce', 'Saab', 'Scion', 'Smart', 'SRT', 'Wiesmann', 'Zenvo', 'Acura', 'Datsun', 'Hummer', 'Pontiac', 'Saturn', 'Shelby', 'SRT', 'Ssangyong', 'Suzuki', 'Tata', 'Tesla', 'Zotye', 'Zxauto', 'Alfa Romeo', 'Aston Martin', 'Bentley', 'Bugatti', 'Cadillac', 'Chrysler', 'Dodge', 'Ferrari', 'Fisker', 'GMC', 'Infiniti', 'Jaguar', 'Lamborghini', 'Maserati', 'McLaren', 'Rolls Royce', 'Saab', 'Scion', 'Smart', 'SRT', 'Wiesmann', 'Zenvo', 'Acura', 'Datsun', 'Hummer', 'Pontiac', 'Saturn', 'Shelby', 'SRT', 'Ssangyong', 'Suzuki', 'Tata', 'Tesla', 'Zotye', 'Zxauto', 'Alfa Romeo', 'Aston Martin', 'Bentley', 'Bugatti', 'Cadillac', 'Chrysler', 'Dodge', 'Ferrari', 'Fisker', 'GMC', 'Infiniti', 'Jaguar', 'Lamborghini', 'Maserati', 'McLaren', 'Rolls Royce', 'Saab', 'Scion', 'Smart', 'SRT', 'Wiesmann', 'Zenvo', 'Acura', 'Datsun', 'Hummer', 'Pontiac', 'Saturn', 'Shelby', 'SRT', 'Ssangyong', 'Suzuki', 'Tata', 'Tesla', 'Zotye', 'Zxauto', 'Alfa Romeo', 'Aston Martin', 'Bentley', 'Bugatti', 'Cadillac', 'Chrysler', 'Dodge', 'Ferrari', 'Fisker', 'GMC', 'Infiniti', 'Jaguar', 'Lamborghini', 'Maserati', 'McLaren', 'Rolls Royce', 'Saab', 'Scion', 'Smart', 'SRT', 'Wiesmann', 'Zenvo', 'Acura', 'Datsun', 'Hummer', 'Pontiac', 'Saturn', 'Shelby', 'SRT', 'Ssangyong', 'Suzuki', 'Tata', 'Tesla', 'Zotye', 'Zxauto', 'Alfa Romeo', 'Aston Martin', 'Bentley', 'Bugatti']
  listOfType = ['Electric', 'Petrol', 'Diesel', 'Hybrid', 'CNG'];
  listOfTransmission = ['Automatic', 'Manual'];
  listOfColor = ['Red', 'white', 'Blue', 'Black', 'Orange', 'Grey', 'Silver', 'Green', 'Yellow', 'Purple', 'Brown', 'Pink'];
  postCarForm!: FormGroup;
  selectedBrand: string = '';
  imagePreview: string | ArrayBuffer | null = 'https://as2.ftcdn.net/v2/jpg/11/46/60/07/1000_F_1146600786_ttuIazwHxmp5BsrfQs2P7pziqynpvQhD.jpg';
  selectedFile!: File | null;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router, private toastService: ToastService,) { }


  ngOnInit() {

    this.postCarForm = this.fb.group({
      brand: ["", [Validators.required, Validators.minLength(1)]],
      name: [null, [Validators.required]],
      year: [null, [Validators.required]],
      type: ["", [Validators.required]],
      transmission: ["", [Validators.required]],
      color: ["", [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
      pincode: [null, [Validators.required, Validators.minLength(6)]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      location: [null, [Validators.required]]
    });
  }


  onPostCar() {
    console.log(this.postCarForm?.value);
    const formData = new FormData();
    formData.append('brand', this.postCarForm?.value.brand);
    formData.append('name', this.postCarForm?.value.name);
    formData.append('year', this.postCarForm?.value.year);
    formData.append('type', this.postCarForm?.value.type);
    formData.append('transmission', this.postCarForm?.value.transmission);
    formData.append('color', this.postCarForm?.value.color);
    formData.append('price', this.postCarForm?.value.price);
    formData.append('description', this.postCarForm?.value.description);
    formData.append('pincode', this.postCarForm?.value.pincode);
    formData.append('city', this.postCarForm?.value.city);
    formData.append('location', this.postCarForm?.value.location);
    formData.append('state', this.postCarForm?.value.state);
    formData.append('userId', StorageService.getUserId());
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    console.log(formData);
    this.customerService.postCar(formData).subscribe((response) => {
      console.log(response);
      this.toastService.show('Car Posted Successfully', 'Dismiss');
      this.router.navigate(['/customer/dashboard']);
    }, (error) => {
      this.toastService.show('Something went wrong', 'Dismiss');
      console.log(error);
    });
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Update the image preview with the file content
      };

      reader.readAsDataURL(this.selectedFile); // Convert the file to a data URL for preview
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

}
