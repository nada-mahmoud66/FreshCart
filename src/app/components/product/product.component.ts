import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartServiceService } from '../../services/cart-service.service';
import { MessageService } from 'primeng/api';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
   @Input() products: Product[] = []; 
   @Input() paginationEnabled: boolean = true; 
  message:string='';
  currentPage: number = 1; 
  totalPages: number = 0; 
  limit: number = 40;
  constructor(private _productService:ProductsService,
    private _cartService:CartServiceService,private messageService:MessageService){}
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
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add product to cart!',
        });
      }
    })

  }
  ngOnInit(): void {
    if (this.paginationEnabled){
      this.loadProducts(this.currentPage);
    }
    
  }
  
  loadProducts(page: number): void {
    this._productService.getProducts(page,this.limit).subscribe({
      next:(response)=>{
        this.products=response.data;
        this.currentPage = response.metadata.currentPage; 
        this.totalPages = response.metadata.numberOfPages;
      }
    });
  }
 
  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.loadProducts(newPage);
    }
  }
  
  

}
