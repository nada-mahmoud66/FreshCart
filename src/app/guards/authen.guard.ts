// import {Router ,CanMatchFn} from '@angular/router';
// import { inject } from '@angular/core';

// export const authenGuard: CanMatchFn = (route, state) => {
//   const router = inject(Router);
//   if(localStorage.getItem('userToken')){
//     return true;
//   }else{
//     router.navigate(['/auth/login']);
//     return false;
//   }
  
// };
import { Router, CanMatchFn } from '@angular/router';
import { inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authenGuard: CanMatchFn = (route, state) => {
  const router = inject(Router);

  // Check if the code is running in the browser
  if (isPlatformBrowser(inject(PLATFORM_ID))) {
    // Now it's safe to use localStorage
    if (localStorage.getItem('userToken')) {
      return true;
    } else {
      router.navigate(['/auth/login']);
      return false;
    }
  }

  // If not running in the browser (SSR), don't proceed with the check
  return true;  // or false based on your requirements for SSR
};

