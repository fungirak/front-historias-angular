import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PortafolioNoAuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url.includes('/portafolio')) {
      const headers = req.headers.delete('Authorization');
      // Si hay otros encabezados que no sean necesarios, también se pueden eliminar aquí
      const modifiedReq = req.clone({ headers });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
