import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { CartServiceService } from '../../services/cart-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  islogin:boolean;
  cartNumber:number=0;
  wishCount:number=0;
  constructor(private _authService:AuthService,private cartService:CartServiceService){
    this.islogin=false;
    // this.cartService.getLoggedUserCart().subscribe({
    //     next:(data)=>{
          
    //         this.cartService.numberOfCartITems.next(data.numOfCartItems);
    //       console.log(data)
    //       }
    //       ,
    //       error: (err) => {
    //         console.error('Error fetching cart:', err); // 
    //       },
    //   })
    cartService.numberOfCartITems.subscribe({
      next:(value)=>{
        this.cartNumber=value;
        console.log(value)}
    })
   
  }
  ngOnInit(): void {
    // this.cartService.getLoggedUserCart().subscribe({
    //   next:(data)=>{
        
    //       this.cartService.numberOfCartITems.next(data.numOfCartItems);
    //     console.log(data)
    //     }
    //     ,
    //   error:(err)=>console.log(err)
    // })
  
    this._authService.userData.subscribe({
      next:()=>{
      if(this._authService.userData.getValue()!==null){
        this.islogin=true;
        this.updateCartCount();
      }else{
        this.islogin=false;
      }
    }
    }
     
    )
    
    
  }
  updateCartCount() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cartService.numberOfCartITems.next(response.numOfCartItems); // Update the cart item count
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  logout(){
    this._authService.logout();
  }

}
