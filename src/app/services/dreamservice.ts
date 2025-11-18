import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AddDreamDto {
  title: string;
  description?: string | null;
  isPaid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DreamService {
  private baseUrl = `${environment.apiUrl}/api/dream`;

  constructor(private http: HttpClient) {}

  addDream(dto: AddDreamDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, dto);
  }

  getMyDreams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my-dreams`);
  }
}
