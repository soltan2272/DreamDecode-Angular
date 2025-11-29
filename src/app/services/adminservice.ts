import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResult {
  succeeded: boolean;
  token?: string;
  role?: string;
  errors?: string[];
}

export interface DreamDto {
  dreamId: number;
  userId: string;
  dreamTitle: string;
  dreamDescription: string;
  submittedAt: string;
  isInterpreted: boolean;
  isPaid: boolean;
}

export interface InterpretationDto {
  interpretationId: number;
  dreamId: number;
  adminId: string;
  interpretationText: string;
  interpretedAt: string;
  // include dream (optional)
  dream?: DreamDto;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private base = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // Admin management
  getAdmins(): Observable<any> {
    return this.http.get(`${this.base}/Admin/all`);
  }

  addAdmin(dto: RegisterDto): Observable<AuthResult> {
    //POST /api/Admin/add
    return this.http.post<AuthResult>(`${this.base}/Admin/add`, dto);
  }

  deleteAdmin(email: string): Observable<any> {
    return this.http.delete(`${this.base}/Admin/delete?email=${encodeURIComponent(email)}`);
  }

  // Interpretation / dreams
  getPendingDreams(): Observable<DreamDto[]> {
    return this.http.get<DreamDto[]>(`${this.base}/Interpretation/pending`);
  }

  addInterpretation(payload: { dreamId: number; interpretationText: string }) {
    return this.http.post(`${this.base}/Interpretation/add`, payload, { responseType: 'text' });
  }

  getMyInterpretations(): Observable<InterpretationDto[]> {
    return this.http.get<InterpretationDto[]>(`${this.base}/Interpretation/my`);
  }
}
