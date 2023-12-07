import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  getProducts():Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/api/v1/getProduct");
  }


  selectProduct(id:any,userId:any): Observable<any>{
    return this.http.post<any>(`http://localhost:3000/api/v1/product/${id}`,{userId});
  }


  deselectProduct(id:any,userId:any): Observable<any>{
    return this.http.post<any>(`http://localhost:3000/api/v1/deselect/${id}`,{userId})
  }


}
