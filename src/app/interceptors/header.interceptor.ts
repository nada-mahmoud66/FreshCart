
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';


export const headerInterceptor: HttpInterceptorFn = (req, next) => {
 if (isPlatformBrowser(inject(PLATFORM_ID)))  {
    
    if (localStorage.getItem('userToken')!=null) {
      const token:any = localStorage.getItem('userToken');
      const updatedRequest = req.clone({
        setHeaders: {
          'token': token
        }
      });
      return next(updatedRequest);
    }
  }
  return next(req);
};
