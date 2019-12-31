import { Component, OnInit } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';

import { AuthService } from './auth.service';
import { SpotifyService } from './spotify.service';

const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'https://accounts.spotify.com/authorize',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: '9257e01757d745c28ad9206c576042c1',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'user-read-private user-read-email',

  responseType: 'token'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private spotify: SpotifyService, private auth: AuthService) { }
  ngOnInit(): void {

  }

}
