import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { Category } from '../../interfaces/category';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories:Category[]=[];
  constructor(private _productService:ProductsService){}
  ngOnInit(): void {
    this._productService.getCategories().subscribe({
      next:(response)=>{this.categories=response.data}
    })
  }

}
