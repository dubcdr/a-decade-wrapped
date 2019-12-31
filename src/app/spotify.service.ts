import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${this.baseUrl}/me`);
  }
}
