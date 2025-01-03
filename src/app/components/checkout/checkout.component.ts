import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
   cartId:string='';
   isloading:boolean=false;
   shippingAddressForm:FormGroup;
    constructor(private fb:FormBuilder,
      private _router:Router,private messageService:MessageService,private cartService:CartServiceService){
      
      this.shippingAddressForm=fb.group({
       
        details:fb.control(null,[Validators.required]),
        city:fb.control(null,[Validators.required]),
        phone:fb.control(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
        
    
      })
    }
  ngOnInit(): void {
    this.cartService.getCartDetails().subscribe((cartDetails) => {
      if (cartDetails) {
        // console.log('a7a 3',cartDetails);
        this.cartId = cartDetails._id; // Access the cart ID
        console.log('Cart ID:', this.cartId);
        console.log('Cart owner:', cartDetails.cartOwner);
        localStorage.setItem('cartOwner',cartDetails.cartOwner);
      } else {

        console.log('No cart details available');
      }
    });
  }
    
    get details(){
      return this.shippingAddressForm.get('details');
    }
    get city(){
      return this.shippingAddressForm.get('city');
    }
    get phone(){
      return this.shippingAddressForm.get('phone');
    }
    navigateToPage(url:string){
      window.location.href=url;
    }
    handleShippingForm(shippingAddress:FormGroup){
      this.isloading=true;
      console.log(shippingAddress.value);
      // '673ce222803e888e052e2334'
   
      this.cartService.onlinePayment(shippingAddress.value,this.cartId).subscribe({
        next:(response:any)=>{
          console.log(response.session.url);
          this.isloading=false;
          this.navigateToPage(response.session.url);
          console.log(this.cartId)

        },
        error:(err)=>{
          console.log(err)
        }
      })

    }


}
