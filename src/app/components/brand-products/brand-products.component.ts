import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.css'
})
export class BrandProductsComponent implements OnInit{
  brandId:any;
  products:any[]=[];
  filterForProducts:any[]=[];
  constructor(private _activatedRoute:ActivatedRoute,private _productService:ProductsService){}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next:(params)=>{this.brandId=params.get('id')}
    })
    this._productService.getProducts().subscribe({
      next:(response)=>{
        this.products=response.data;
        console.log(this.products);
        console.log(this.brandId);
        //product.subcategory[0]._id
        this.filterForProducts = this.products.filter(product => product.brand._id === this.brandId);
        console.log('filterForProducts',this.filterForProducts)
      }
      
    })
    
  }


}
