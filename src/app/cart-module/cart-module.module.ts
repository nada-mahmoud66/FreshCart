import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../components/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
 {path:'userCart',component:CartComponent},
 {path:'checkout',component:CheckoutComponent}

];


@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [CartComponent]

})
export class CartModuleModule { }
