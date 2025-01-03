import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ProductsModuleModule } from './products-module/products-module.module';
import { CartModuleModule } from './cart-module/cart-module.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { headerInterceptor } from './interceptors/header.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MainSliderComponent,
    NotFoundComponent,
    AllordersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,  
    ToastrModule.forRoot()  ,
    CarouselModule,
    ToastModule,
    
    ProductsModuleModule,
    CartModuleModule
  ],
  providers: [
   
    
    provideClientHydration(),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor])),
    MessageService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
