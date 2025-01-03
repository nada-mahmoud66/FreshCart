import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CartServiceService  {
  numberOfCartITems=new BehaviorSubject(0);
  headers: any = {};
  cartDetailsSubject = new BehaviorSubject<any>(null);
  constructor(private _httpClient:HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {
    // if (isPlatformBrowser(this.platformId)) {
    //   const token = localStorage.getItem('userToken');
    //   if(token){
    //     this.headers = { token: token }; 
    //   }
     
    // }
   
      // this.getLoggedUserCart().subscribe({
      //   next:(data)=>{
          
      //       this.numberOfCartITems.next(data.numOfCartItems);
      //     console.log(data)
      //     }
      //     ,
      //     error: (err) => {
      //       console.error(' fetching cart:', err);  
      //     },
      // })
    
     
   }
  
   
  
  addToCart(productId:string):Observable<any>{
    return this._httpClient.post(`${environment.apiBaseUrl}/cart`,
      {productId:productId})
  }
  getLoggedUserCart():Observable<any>{
    return this._httpClient.get(`${environment.apiBaseUrl}/cart`)
  }
  
  // Setter for cart details
   setCartDetails(details: any) {
    console.log(details);
    this.cartDetailsSubject.next(details);
    console.log(details);
  }
   // Getter for cart details as an observable
   getCartDetails(): Observable<any> {
    return this.cartDetailsSubject.asObservable();
  }
  removeCartItem(productId:string):Observable<any>{
    return this._httpClient.delete(`${environment.apiBaseUrl}/cart/${productId}`)

  }
  updateItemCount(productId:string,count:number):Observable<any>{
    return this._httpClient.put(`${environment.apiBaseUrl}/cart/${productId}`,
      {count:count})

  }
  onlinePayment(shippingAdress:any,cartId:string){
  
    return this._httpClient.post(`${environment.apiBaseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,{
      shippingAddress:shippingAdress
    })
  }
  //6734bc9d803e888e0519dc0b
  getOrders(cartOwner:string): Observable<any> {
    return this._httpClient.get(
      `${environment.apiBaseUrl}/orders/user/${cartOwner}`
    );
  }
}
