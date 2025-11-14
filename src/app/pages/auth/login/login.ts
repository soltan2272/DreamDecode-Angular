import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

 onSubmit() {
  this.authService.login({ email: this.email, password: this.password }).subscribe({
    next: (res) => {
      if (res.succeeded && res.role) {
        if(res.role==="Admin"){
          this.router.navigate(['/admin']);
        }
        else{
 this.router.navigate(['/add-dream']); 
        }
       
      } else {
        this.errorMessage = res.errors?.join(', ') || 'Login failed';
      }
    },
    error: (err) => {
       const errors = err.error?.errors;

  if (errors) {
    // Case 1: errors = { Password: ["msg"], Email: ["msg2"] }
    this.errorMessage = Object.values(errors).flat().join(', ');
  } else {
    this.errorMessage = 'Something went wrong.';
  }
    }
  });
}

}
