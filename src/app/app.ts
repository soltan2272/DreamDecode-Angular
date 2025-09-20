import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LoginComponent, RegisterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dream-decode-frontend');
  modal: 'login' | 'register' | null = null;

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
}
