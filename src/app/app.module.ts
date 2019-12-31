import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginResolver } from './login/login.resolver';
import { SpotifyInterceptor } from './spotify.interceptor';

const routes: Route[] = [
  {
    component: LoginComponent,
    path: 'login',
    resolve: {
      token: LoginResolver
    }
  },
  {
    component: HomeComponent,
    path: 'home'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFullpageModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginResolver,
    { provide: HTTP_INTERCEPTORS, useClass: SpotifyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
