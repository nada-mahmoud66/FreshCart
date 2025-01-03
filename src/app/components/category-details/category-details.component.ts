import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {
  categoryId:any;
  categoryDetails:any;
  subcategories:any[]=[];
  constructor(private _activatedRoute:ActivatedRoute,private _productService:ProductsService ){}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next:(params)=>{this.categoryId=params.get('id')}
    })
    this._productService.getcategoryDetails(this.categoryId).subscribe({
      next:(response)=>{this.categoryDetails=response.data}
    })
    this._productService.GetSubCategoriesOnCategory(this.categoryId).subscribe({
      next:(response)=>{this.subcategories=response.data}
    })
   }

}
