import { HttpInterceptorFn } from '@angular/common/http';

export const authAndRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  const authData = JSON.parse(localStorage.getItem('auth') as string);
  const token = authData?.accessToken?.value;
  const refreshToken = authData?.refreshToken?.value;

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  const refreshReq = req.clone({
    setHeaders: { Authorization: `Bearer ${refreshToken}` },
  });

  if (url.includes('/login') || url.includes('/register')) {
    return next(req);
  } else if (url.includes('/refresh-token')) {
    return next(refreshReq);
  } else {
    return next(authReq);
  }
};
