/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonHttpInterceptor } from 'webapp/src/app/interceptor/common-http.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: CommonHttpInterceptor, multi: true }];
