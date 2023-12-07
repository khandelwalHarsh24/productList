import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl='http://localhost:3000/api/v1'
  constructor(private http: HttpClient) { }

  getUser(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/api/v1/getuser");
  }


  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }

  getSingleUser(id:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/user/${id}`)
  }
}
