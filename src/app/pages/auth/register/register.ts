import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegisterDto } from '../../../services/authservice';
import { FormsModule } from '@angular/forms';   
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-register',
  standalone: true,
   imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const dto: RegisterDto = {
      fullName: this.fullName,
      email: this.email,
      password: this.password
    };

    this.authService.register(dto).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.router.navigate(['/']); 
        } else {
          this.errorMessage = res.errors?.join(', ') || 'Registration failed';
        }
      },
      error: (err) => {
        console.log(err);
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
