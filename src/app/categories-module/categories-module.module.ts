import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from '../components/category/category.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailsComponent } from '../components/category-details/category-details.component';
import { SubcategoryComponent } from '../components/subcategory/subcategory.component';
import { CategoryProductsComponent } from '../components/category-products/category-products.component';
import { ProductsModuleModule } from '../products-module/products-module.module';
const routes: Routes = [
 {path:'category',component:CategoryComponent},
 {path:'categoryDetails/:id',component:CategoryDetailsComponent},
 {path:'categoryProducts/:id',component:CategoryProductsComponent},
 {path:'subcategory/:id',component:SubcategoryComponent}

];


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryDetailsComponent,
    SubcategoryComponent,
    CategoryProductsComponent

  ],
  imports: [
    CommonModule,
    CarouselModule,
    ProductsModuleModule,
    RouterModule.forChild(routes)
  ],
  
})
export class CategoriesModuleModule { }
