import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../components/product/product.component';
import { RouterModule,Routes } from '@angular/router';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';



const routes: Routes=[
  {path:'product',component:ProductComponent},
  {path:'productDetails/:id',component:ProductDetailsComponent},
  
];
@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    
    RouterModule.forChild(routes)
  ],
  exports: [ ProductComponent]

})
export class ProductsModuleModule { }
