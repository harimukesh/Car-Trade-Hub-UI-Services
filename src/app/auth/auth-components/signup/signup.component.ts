import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  isSubmitted = false;


  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [this.confirmationvalidator, Validators.minLength(6),]]
    });
  }

  confirmationvalidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) return { required: true };
    else if (control?.value !== this.signupForm.controls['password'].value) return { confirm: true, error: true };
    return {};

  }

  onSubmit() {
    this.isLoading = true;
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe((response) => {
      console.log(response);
      this.isLoading = false;
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    });
    this.isSubmitted = true;
  }

  isValidField(field: string) {
    const control = this.signupForm.get(field);
    return (control?.dirty || control?.touched || this.isSubmitted) && control?.invalid;
  }

  isError(field: string) {
    const control = this.signupForm.get(field);
    return control?.hasError('required') && (control?.dirty || control?.touched || this.isSubmitted);
  }


}

