import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isloading:boolean=false;
  apiError:string='';
  registerForm:FormGroup;
  constructor(private fb:FormBuilder,private _authService:AuthService,
    private _router:Router,private messageService:MessageService){
    // if(localStorage.getItem('userToken')!==null){
    //   _router.navigate(['/home']);
    // }
    this.registerForm=fb.group({
      name:fb.control(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      email:fb.control(null,[Validators.required,Validators.email]),
      password:fb.control(null,[Validators.required,Validators.pattern(/^[A-z][a-z0-9]{5,10}$/)]),
      rePassword:fb.control(null,[Validators.required,Validators.pattern(/^[A-z][a-z0-9]{5,10}$/)]),
      phone:fb.control(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  
    },{ validator: this.rePasswordMatch.bind(this) })

  }
  get name(){
    return this.registerForm.get('name');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get rePassword(){
    return this.registerForm.get('rePassword');
  }
  get phone(){
    return this.registerForm.get('phone');
  }
  
  rePasswordMatch(registerForm:any){
    const password = registerForm.get('password');
    const rePassword = registerForm.get('rePassword');
    
    if (password?.value === rePassword?.value) {
      return null; 
    } else {
      rePassword?.setErrors({ passwordmatch: 'password and rePassword do not match' });
      return { passwordmatch: 'password and rePassword do not match' }; 
    }
  }
  handleRegister(registerForm:FormGroup){
    this.isloading=true;
    if(registerForm.valid){
      this._authService.register(registerForm.value).subscribe({
        next:(respo)=>{
          if(respo.message==='success'){
            this.isloading=false
            this._router.navigate(['/auth/login']);

          }
          },
          error: (err) => {
            this.isloading = false;
            this.apiError=err.error.message;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `${this.apiError}`,
            });
            
           
          }
      })

    }

  }

}
