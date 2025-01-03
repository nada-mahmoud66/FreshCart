import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartDetails:any=null;
  // this.getLoggedUserCart().subscribe({
  //   next:(data)=>{
      
  //       this.numberOfCartITems.next(data.numOfCartItems);
  //     console.log(data)
  //     }
  //     ,
  //   error:(err)=>console.log(err)
  // })
  
  constructor(private _cartService:CartServiceService){}
  ngOnInit(): void {
    this._cartService.getLoggedUserCart().subscribe({
      next:(response)=>{

        this.cartDetails=response.data;
        
        this._cartService.setCartDetails(this.cartDetails);
        // this._cartService.numberOfCartITems.next(response.numOfCartItems)

        console.log(this.cartDetails);
       
      },
      error:(error)=>{console.log(error)}
    })
    
  }
  removeItem(productId:string){
    this._cartService.removeCartItem(productId).subscribe({
      next:(response)=>{this.cartDetails=response.data;
        this._cartService.numberOfCartITems.next(response.numOfCartItems);
      },
      error:(error)=>{console.log(error)}
    })
  }
  updateItemCount(productId:string,count:number){
    this._cartService.updateItemCount(productId,count).subscribe({
      next:(response)=>{this.cartDetails=response.data;
        console.log(response.data);
        this._cartService.numberOfCartITems.next(response.numOfCartItems);
      },
      error:(error)=>{console.log(error)}
    })

  }

}
