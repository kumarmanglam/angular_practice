import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:3000';  

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/login", { email, password });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/users");
  }

  getUser(id:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/users" + "/" +id);
  }

  addUser(user:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/users", user);
  }

  updateUser(user:any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "/users", user);
  }
}
