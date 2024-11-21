import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // CommonModule for ngIf and other directives
import { catchError, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private http: HttpClient) {}
  login() {
    if (this.loginForm.invalid) {
      // Mark all controls as touched so that the validation errors show up
      Object.values(this.loginForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    const formData = this.loginForm.value;
    this.http
      .post('http://localhost:7777/login', formData)
      .pipe(
        catchError((error) => {
          // Show an error message if there's an error
          console.log('An error occurred: ' + (error.error?.message || error.message));
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          document.body.innerHTML = '<h1 style="text-align: center; margin-top: 20%;">Success!</h1>';
          // You can store user data or JWT token here if necessary
        } else {
          alert('Login failed. Please check your credentials.');
        }
      });
  }
}
