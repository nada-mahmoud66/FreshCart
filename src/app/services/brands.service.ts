import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _httpClient:HttpClient) { }
  
   getBrands(page: number = 1, limit: number = 40): Observable<any> {
      return this._httpClient.get(
        `${environment.apiBaseUrl}/brands?page=${page}&limit=${limit}`
      );
    }

}
