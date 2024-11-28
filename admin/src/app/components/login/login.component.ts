import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup ;

  constructor(private fb: FormBuilder,private loginService: ServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],  
      password: ['', [Validators.required]], 
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Data:', this.loginForm.value.email);
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(["/dashboard"]);
          // this.errorMessage = ''; // Clear any previous error messages
        },
        error => {
          console.error('Login failed', error);
          // this.errorMessage = 'Invalid username or password';
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}