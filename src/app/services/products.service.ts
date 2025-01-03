import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient:HttpClient) { }
  getCategories(): Observable<any> {
    return this._httpClient.get(
      `${environment.apiBaseUrl}/categories`
    );
  }
  getProducts(page: number = 1, limit: number = 40): Observable<any> {
    return this._httpClient.get(
      `${environment.apiBaseUrl}/products?page=${page}&limit=${limit}`
    );
  }
  getProductDetails(id:string):Observable<any>{
    return this._httpClient.get(
      `${environment.apiBaseUrl}/products/${id}`
    );

  }
  getcategoryDetails(id:string):Observable<any>{
    return this._httpClient.get(
      `${environment.apiBaseUrl}/categories/${id}`
    );

  }
  GetSubCategoriesOnCategory(id:string):Observable<any>{
    return this._httpClient.get(
      `${environment.apiBaseUrl}/categories/${id}/subcategories`
    );

  }
   getSpecificSubcategory(id:string):Observable<any>{
     return this._httpClient.get(
       `${environment.apiBaseUrl}/subcategories/${id}`
     );

   }
  
  
  
}
