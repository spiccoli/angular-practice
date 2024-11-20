import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations'; // Animation imports
import { CommonModule } from '@angular/common'; // CommonModule for ngIf and other directives

@Component({
  selector: 'app-register',
  standalone: true,  // Marking the component as standalone
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('resize', [
      state('normal', style({
        transform: 'scale(1)', // Default scale when no error
        transition: 'transform 0.3s ease-in-out'
      })),
      state('error', style({
        transform: 'scale(1.05)', // Slightly enlarge the box when there is an error
        transition: 'transform 0.3s ease-in-out'
      })),
      transition('normal <=> error', [
        animate('0.3s ease-in-out') // Animation duration
      ])
    ])
  ],
  imports: [
    ReactiveFormsModule, 
    HttpClientModule, 
    CommonModule  // Import only CommonModule for ngIf, ngFor, etc.
  ]
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
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

  register() {
    if (this.registerForm.invalid) {
      // Mark all controls as touched so that the validation errors show up
      Object.values(this.registerForm.controls).forEach(control => control.markAsTouched());
      return;
    }
  
    const formData = this.registerForm.value;
    this.http
      .post('http://localhost:7777/register', formData)
      .pipe(
        catchError((error) => {
          alert('An error occurred: ' + error.message);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          alert('User registered successfully!');
        }
      });
  }
}
