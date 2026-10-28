
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appareil {
  _id?: string;
  nom: string;
  marque: string;
  categorie: string;
  description: string;
  prix: number;
  statut: 'On' | 'Off';
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3002/api/appareils';

  getAll(): Observable<Appareil[]> {
    return this.http.get<Appareil[]>(this.apiUrl);
  }

  getById(id: string): Observable<Appareil> {
    return this.http.get<Appareil>(`${this.apiUrl}/${id}`);
  }

  create(appareil: Omit<Appareil, '_id'>): Observable<Appareil> {
    return this.http.post<Appareil>(this.apiUrl, appareil);
  }

  update(id: string, appareil: Omit<Appareil, '_id'>): Observable<Appareil> {
    return this.http.put<Appareil>(`${this.apiUrl}/${id}`, appareil);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  switchAll(): Observable<{ message: string; count: number }> {
    return this.http.patch<{ message: string; count: number }>(
      `${this.apiUrl}/switch-all`,
      {}
    );
  }
}
