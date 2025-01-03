import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent {
  selectedSubcategoryId:any;
  
  products:any[]=[];
  filteredProducts:any[]=[];
  constructor(private _activatedRoute:ActivatedRoute,private _productService:ProductsService){}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next:(params)=>{this.selectedSubcategoryId=params.get('id');
        this.loadFilteredProducts();
      }
    })
    
    
    
  }
  loadFilteredProducts(): void {
    this._productService.getProducts().subscribe({
      next:(response)=>{
        this.products=response.data;
        this.filteredProducts = this.products.filter(product => product.subcategory[0]._id == this.selectedSubcategoryId);
      }
      
    })
    
  }

}
