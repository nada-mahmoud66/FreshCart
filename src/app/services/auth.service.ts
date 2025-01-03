import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iuser } from '../interfaces/iuser';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData=new BehaviorSubject(null);

  constructor(private _httpClient:HttpClient,private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object) {
      // setTimeout(()=>{this.logout()},10000)
    //check if the user is in Browser or not
    if (isPlatformBrowser(this.platformId)){
       if(localStorage.getItem('userToken')!==null){
          this.decodeUserData();
        }
      
    }
    
   }
  register(userData:Iuser):Observable<any>{
    return this._httpClient.post<any>(`${environment.apiBaseUrl}/auth/signup`,userData)
  }
  login(userData:any):Observable<any>{
    return this._httpClient.post<any>(`${environment.apiBaseUrl}/auth/signin`,userData)
  }
  
  decodeUserData(){
    let encodedData=JSON.stringify(localStorage.getItem('userToken'));
    let decodedData:any=jwtDecode(encodedData);
    this.userData.next(decodedData);

  }
  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.router.navigate(['/auth/login'])
  }
}
