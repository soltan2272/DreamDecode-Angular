import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  get role(): string | null {
    return this.authService.getRole();
  }

  get isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }
}
