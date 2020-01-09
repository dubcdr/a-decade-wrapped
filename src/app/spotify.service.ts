import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, timer } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import * as SpotifyCurrent from './models/currently-playiong.spotify.model';
import * as SpotifyPlaylist from './models/playlist.spotify.model';

const myPlaylists = [
  '1mAKNVB2TgzPiKWJRdbEdq', // soundsOfTheDecade
  '4BzmTSG6ThJzH5mbwKO69u', // deepCuts
  '0vCBrla4aS8Fp3WUdNlxwe', // ed10
];

interface PlayReq {
  context_uri?: string;
  uris?: string[];
  offset?: { uri: string };
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly baseUrl = 'https://api.spotify.com/v1';
  private readonly playlists = ['4BzmTSG6ThJzH5mbwKO69u'];

  private _playlists$ = new BehaviorSubject<SpotifyPlaylist.Playlist[]>([]);
  private _currentlyPlaying$ = new BehaviorSubject<SpotifyCurrent.CurrentlyPlaying>(null);


  constructor(private http: HttpClient) { }

  get playlists$() {
    return this._playlists$.asObservable();
  }

  get currentlyPlaying$() {
    return this._currentlyPlaying$.asObservable();
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
    this._startCurrentlyPlaying();
  }

  playSong(id: string) {

  }

  playSongFromPlaylist(songUri: string, playlistUri: string) {
    const params: PlayReq = { context_uri: playlistUri, offset: { uri: songUri } }
    return this.http.put(`${this.baseUrl}/me/player/play`, params).pipe(
      delay(500),
      tap(_ => {
        this._updateCurrentlyPlaying();
      }),
    );
  }

  getPlaylist(id: string): Observable<SpotifyPlaylist.Playlist> {
    return this._loadPlaylist(id);
  }

  private _loadPlaylist(id: string): Observable<SpotifyPlaylist.Playlist> {
    return this.http.get<SpotifyPlaylist.Playlist>(`${this.baseUrl}/playlists/${id}`);
  }

  private _startCurrentlyPlaying() {
    timer(0, 30 * 1000).subscribe(_ => {
      this._updateCurrentlyPlaying();
    });
    this._updateCurrentlyPlaying();
  }

  private _updateCurrentlyPlaying() {
    console.log('updating');
    this.http.get<SpotifyCurrent.CurrentlyPlaying>(`${this.baseUrl}/me/player/currently-playing`).subscribe(resp => {
      this._currentlyPlaying$.next(resp);
    });
  }
}
