import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { Brand } from '../../interfaces/brand';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  brands:Brand[]=[];
  currentPage: number = 1; 
  totalPages: number = 0; 
  limit: number = 40;
  constructor(private _brandsService:BrandsService){}
  ngOnInit(): void {
    this.loadBrands(this.currentPage);
  }
  loadBrands(page: number): void {
    this._brandsService.getBrands(page,this.limit).subscribe({
      next:(response)=>{
        this.brands=response.data;
        this.currentPage = response.metadata.currentPage; 
        this.totalPages = response.metadata.numberOfPages;
      }
    });
  }
 
  
 
  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.loadBrands(newPage);
    }
  }
  
}
