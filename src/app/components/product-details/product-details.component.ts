import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartServiceService } from '../../services/cart-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  constructor(private _activatedRoute:ActivatedRoute,private _productService:ProductsService,private _cartService:CartServiceService,private messageService:MessageService){}
  message:string='';
  productId:any;
  productDetails:any;
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next:(params)=>{this.productId=params.get('id')}
    })
    this._productService.getProductDetails(this.productId).subscribe({
      next:(response)=>{this.productDetails=response.data}

    })
    
  }
  addToCart(productId:string){
    this._cartService.addToCart(productId).subscribe({
      next:(response)=>{
        this._cartService.numberOfCartITems.next(response.numOfCartItems);
        console.log(response);
        this.message=response.message;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${this.message}!`,
        });
      },
      error:(err)=>{console.log(err);
        this.message=err.message
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${this.message}!`,
        });
      }
    })

  }

}
