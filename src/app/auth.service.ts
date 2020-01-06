import { Injectable } from '@angular/core';

import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = '9257e01757d745c28ad9206c576042c1';
  private spotifyUrl = 'https://accounts.spotify.com/authorize';

  private _token: string;

  constructor(private spotify: SpotifyService) { }

  get token(): string {
    return this._token;
  }

  login() {
    const scopes = [
      'user-read-private',
      'user-read-currently-playing',
      'user-top-read',
      'user-read-recently-played'

    ];
    const scopesString = encodeURIComponent(scopes.join(' '));
    const redirectUri = encodeURIComponent('http://localhost:4200');
    const url = `${this.spotifyUrl}?response_type=token&client_id=${this.clientId}&scope=${scopesString}&redirect_uri=${redirectUri}`;
    window.location.href = url;
  }

  handleToken(token: string) {
    this._token = token;
    this.spotify.loadPlaylists();
  }
}
