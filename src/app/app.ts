import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthService } from './services/authservice';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LoginComponent, RegisterComponent, SpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dream-decode-frontend');
  modal: 'login' | 'register' | null = null;
  loggedIn = false;

  constructor(private router: Router, private authService: AuthService) {
    this.loggedIn = !!this.authService.getToken();
    this.authService.isLogged$.subscribe(v => {
      this.loggedIn = v;
    });
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.closeModal();
    });
  }

  get role(): string | null {
    return this.authService.getRole();
  }

  // isLoggedIn derived helper for templates that already reference it
  get isLoggedIn(): boolean { return !!this.authService.getToken(); }

  openModal(type: 'login' | 'register') {
    this.modal = type;
    try {
      if (typeof window !== 'undefined') {
        const hash = type === 'login' ? '#loginModal' : '#registerModal';
        if (window.location.hash !== hash) {
          window.location.hash = hash;
        }
      }
    } catch {}
  }

  closeModal() {
    this.modal = null;
    try {
      if (typeof window !== 'undefined' && window.location.hash) {
        window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
    } catch {
      // ignore if running in non-browser environments
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
