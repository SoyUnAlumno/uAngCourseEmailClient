import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { EmailCreateComponent } from './inobx/email-create/email-create.component';
import { EmailReplyComponent } from './inobx/email-reply/email-reply.component';
import { EmailIndexComponent } from './inobx/email-index/email-index.component';
import { EmailShowComponent } from './inobx/email-show/email-show.component';
@NgModule({
  declarations: [
    AppComponent,
    EmailCreateComponent,
    EmailReplyComponent,
    EmailIndexComponent,
    EmailShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [
    {
      // Overrides dependency injection system
provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
