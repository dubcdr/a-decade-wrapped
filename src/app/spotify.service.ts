import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${this.baseUrl}/me`);
  }
  getPlaylist(id: string): Observable<object[]> {
    return this.http.get<object[]>(`${this.baseUrl}/playlists/${id}/tracks`).pipe(map(resp => resp['items']));
  }
}
