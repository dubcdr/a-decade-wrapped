import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

import * as Spotify from './models/playlist.spotify.model';

const myPlaylists = [
  '1mAKNVB2TgzPiKWJRdbEdq', // soundsOfTheDecade
  '4BzmTSG6ThJzH5mbwKO69u', // deepCuts
  '0vCBrla4aS8Fp3WUdNlxwe', // ed10
];

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private readonly playlists = ['4BzmTSG6ThJzH5mbwKO69u'];

  private _playlists$ = new BehaviorSubject<Spotify.Playlist[]>([]);


  constructor(private http: HttpClient) {
  }

  get playlists$() {
    return this._playlists$.asObservable();
  }

  getUser() {
    return this.http.get(`${this.baseUrl}/me`);
  }

  loadPlaylists() {
    const playlists = myPlaylists.map(p => {
      return this._loadPlaylist(p);
    });
    forkJoin(playlists).subscribe((resps) => {
      this._playlists$.next(resps);
    });
  }

  getPlaylist(id: string): Observable<Spotify.Playlist> {
    return this._loadPlaylist(id);
  }

  private _loadPlaylist(id: string): Observable<Spotify.Playlist> {
    return this.http.get<Spotify.Playlist>(`${this.baseUrl}/playlists/${id}`);
    // .pipe(map(resp => resp['items']));
  }
}
