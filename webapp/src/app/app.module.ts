import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';

import { AppRoutingModule } from 'webapp/src/app/app-routing.module';
import { AppComponent } from 'webapp/src/app/app.component';
import { DashboardModule } from 'webapp/src/app/dashboard/dashboard.module';
import { LoginModule } from 'webapp/src/app/login/login.module';
import { httpInterceptorProviders } from 'webapp/src/app/interceptor';

// 配置 angular i18n
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'webapp/src/environments/environment';
import { AboutComponent } from 'webapp/src/app/about/about.component';
registerLocaleData(zh);

const ngZorroConfig: NzConfig = {
  message: { nzTop: 20, nzDuration: 3000 },
  notification: { nzTop: 20, nzDuration: 3000 },
};

@NgModule({
  declarations: [AppComponent, AboutComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    DashboardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    NzMessageService,
    httpInterceptorProviders,
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
