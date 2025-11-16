import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css'],
  imports: [RouterOutlet, RouterLink]
})
export class UserDashboardComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
