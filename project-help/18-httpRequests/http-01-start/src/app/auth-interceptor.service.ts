import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // if (req.url){}
    // console.log('Request is on its way.');
    // console.log(req.url);

    const modifiedRequest = req.clone({
      // url: 'some-new-url'
      // headers: req.headers.append,
      headers: req.headers.append('Auth', 'xyz'),
    });
    // return next.handle(req);
    return next.handle(modifiedRequest);
    // .pipe(
    //   tap((event) => {
    //     console.log(event);
    //     if (event.type === HttpEventType.Response) {
    //       console.log('Response Arrived, body data: ');
    //       console.log(event.body);
    //     }
    //   })
    // );
  }
}
