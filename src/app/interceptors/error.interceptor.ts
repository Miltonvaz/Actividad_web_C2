import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(handleErrorResponse))
};
function handleErrorResponse(error: HttpErrorResponse){
  const erroResponse = `Error status: ${error.status}, message: ${error.message}` 
  return throwError(()=> erroResponse)
}