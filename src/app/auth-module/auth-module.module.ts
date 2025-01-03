import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes=[
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},

];
@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    
    RouterModule.forChild(routes),
   

  ]
})

export class AuthModuleModule { }
