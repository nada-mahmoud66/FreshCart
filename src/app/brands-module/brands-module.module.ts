import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from '../components/brands/brands.component';
import { RouterModule, Routes } from '@angular/router';
import { BrandProductsComponent } from '../components/brand-products/brand-products.component';
import { ProductsModuleModule } from '../products-module/products-module.module';
const routes: Routes = [
 {path:'brand',component:BrandsComponent},
 {path:'brandProducts/:id',component:BrandProductsComponent}

];



@NgModule({
  declarations: [
    BrandsComponent,
    BrandProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class BrandsModuleModule { }
