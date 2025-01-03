import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent {
  cartOwner:string='';
  orders:any;
  constructor(private cartService:CartServiceService, @Inject(PLATFORM_ID) private platformId: Object){
   

  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      this.cartOwner=localStorage.getItem('cartOwner')||'';
    }
    
    //this.cartService.getCartDetails().subscribe((cartDetails) => {
      //if (cartDetails) {
      //console.log('a7a 4',cartDetails);
        //this.cartOwner = cartDetails.cartOwner; // Access the cart ID
        console.log(this.cartOwner);
        if(this.cartOwner){
          this.cartService.getOrders(this.cartOwner).subscribe({

            next:(response)=> {
              
              this.orders = response;
             console.log(this.orders);
            },
            error:(err)=>{console.log(err);}
          })
        }
        
      
      //} else {
       // console.error('No orders');
     // }
    //});
    
  }
  

}
