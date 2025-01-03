import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {
    selectedCategoryId:any;
    //productCategory:any;
    Products:any[]=[];
    filterForProducts:any[]=[];
    constructor(private _activatedRoute:ActivatedRoute,private _productService:ProductsService){}
    ngOnInit(): void {
      this._activatedRoute.paramMap.subscribe({
        next:(params)=>{this.selectedCategoryId=params.get('id')
          this.loadFilteredProducts();
        }
      })
      
    }
   
    loadFilteredProducts(): void {
      this._productService.getProducts().subscribe({
        next: (response) => {
          this.Products = response.data;
          this.filterForProducts = this.Products.filter(product => product.category._id === this.selectedCategoryId);
        }
      });
    }

}
