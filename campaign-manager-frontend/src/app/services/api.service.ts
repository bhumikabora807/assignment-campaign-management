import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // -------- PAGES --------
  getPages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/pages`);
  }

  createPage(page: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/pages`, page);
  }

  // -------- CAMPAIGNS --------
  getCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/campaigns`);
  }

  createCampaign(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/campaigns`, data);
  }

  updateCampaign(id: string, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/campaigns/${id}`, data);
  }

  deleteCampaign(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/campaigns/${id}`);
  }
}