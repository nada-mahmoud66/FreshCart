import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authenGuard } from './guards/authen.guard';
import { AllordersComponent } from './components/allorders/allorders.component';
//import { authGuard } from './guards/auth.guard';
//import{authenGuard} from'./guards/authen.guard'


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',canMatch:[authenGuard],component:HomeComponent},
  {path:'allorders',canMatch:[authenGuard],component:AllordersComponent},
  {path:'auth',loadChildren:()=>import('./auth-module/auth-module.module').then(m=>m.AuthModuleModule)},
  {path:'products',loadChildren:()=>import('./products-module/products-module.module').then(m=>m.ProductsModuleModule),canMatch:[authenGuard]},
  {path:'cart',loadChildren:()=>import('./cart-module/cart-module.module').then(m=>m.CartModuleModule),canMatch:[authenGuard]},
  {path:'categories',loadChildren:()=>import('./categories-module/categories-module.module').then(m=>m.CategoriesModuleModule),canMatch:[authenGuard]},
  {path:'brands',loadChildren:()=>import('./brands-module/brands-module.module').then(m=>m.BrandsModuleModule),canMatch:[authenGuard]},
  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
