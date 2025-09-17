import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}


export interface LoginDto 
{ 
    email: string;
 password: string;
 }

export interface RegisterDto
 { 
    fullName: string; 
    email: string; 
    password: string; 
 }

export interface AuthResult
 {
  succeeded: boolean;
  token?: string;
  role?: string;
  errors?: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
   private tokenKey = 'token';

  setToken(token: string): void {
    if (isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  clearToken(): void {
    if (isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
  }
  private base = `${environment.apiUrl}/api/Auth`; 
  private _isLogged$ = new BehaviorSubject<boolean>(!!this.getToken());
  public isLogged$ = this._isLogged$.asObservable();

  constructor(private http: HttpClient) {}

  login(dto: LoginDto): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.base}/login`, dto)
      .pipe(tap(res => {
        if (res && res.succeeded && res.token) {
          localStorage.setItem('token', res.token);
          if (res.role) localStorage.setItem('role', res.role);
          this._isLogged$.next(true);
        }
      }));
  }

  register(dto: RegisterDto): Observable<AuthResult> {
    return this.http.post<AuthResult>(`${this.base}/register`, dto)
      .pipe(tap(res => {
        if (res && res.succeeded && res.token) {
          localStorage.setItem('token', res.token);
          if (res.role) localStorage.setItem('role', res.role);
          this._isLogged$.next(true);
        }
      }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this._isLogged$.next(false);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
