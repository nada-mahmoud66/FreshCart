import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isloading:boolean=false;
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private _authService:AuthService,
    private _router:Router,private messageService:MessageService){
    // if(localStorage.getItem('userToken')!==null){
    //   _router.navigate(['/home']);
    // }
    this.loginForm=fb.group({
     
      email:fb.control(null,[Validators.required,Validators.email]),
      password:fb.control(null,[Validators.required,Validators.pattern(/^[A-z][a-z0-9]{5,10}$/)]),
      
  
    })

  }
  
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  
  
  handleLogin(loginForm:FormGroup){
    this.isloading=true;
    if(loginForm.valid){
      this._authService.login(loginForm.value).subscribe({
        next:(response)=>{
          if(response.message==='success'){
            localStorage.setItem('userToken',response.token)
            this._authService.decodeUserData();
            this.isloading=false
            this._router.navigate(['/home']);

          }
          },
          error: (err) => {
            this.isloading = false;
            
            console.log(err.error.message);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${err.error.message}`,
            });
           
          }
      })

    }

  }

}
