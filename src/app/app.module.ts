import { ScrollingModule } from '@angular/cdk/scrolling';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { initApp } from './app.init';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistResolver } from './playlist/playlist.resolver';
import { SpotifyInterceptor } from './spotify.interceptor';


const routes: Route[] = [
  {
    path: 'login',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    component: HomeComponent,
    path: 'home'
  },
  {
    component: PlaylistComponent,
    path: 'playlist/:id',
    resolve: {
      playlist: PlaylistResolver
    }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

const materialModules = [
  MatListModule,
  MatIconModule,
  MatButtonModule,
];

const cdkModules = [
  ScrollingModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PlaylistComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ...materialModules,
    ...cdkModules
  ],
  providers: [
    PlaylistResolver,
    { provide: APP_INITIALIZER, useFactory: initApp, deps: [AuthService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpotifyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
