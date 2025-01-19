import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  isSubmitted = false;


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isLoading = true;
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
      if (response.userId != null) {
        const user = {
          id: response.userId,
          role: response.userRole,
        }
        StorageService.saveUser(user);
        StorageService.saveToken(response.jwt);
        if (StorageService.isAdminLoggIn()) {
          console.log("Admin logged in");
          this.router.navigate(['/admin/dashboard']);
        }
        else if (StorageService.isCustomerLoggIn()) {
          console.log("Customer logged in");
          this.router.navigate(['/customer/dashboard']);
        }
      } else {
        this.toastService.show('Invalid credentials', 'Dismiss');
      }
      this.isLoading = false;
    }, (error) => {
      console.log(error);
      this.toastService.show('Invalid credentials', 'Dismiss');
      this.isLoading = false;
    });
    this.isSubmitted = true;
  }

  isValidField(field: string) {
    const control = this.loginForm.get(field);
    return (control?.dirty || control?.touched || this.isSubmitted) && control?.invalid;
  }

  isError(field: string) {
    const control = this.loginForm.get(field);
    return control?.hasError('required') && (control?.dirty || control?.touched || this.isSubmitted);
  }

  showToast() {
    this.toastService.show('This is a toast message!', 'Dismiss');
  }
}
