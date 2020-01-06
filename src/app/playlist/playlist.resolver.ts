import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { SpotifyService } from '../spotify.service';
import * as Spotify from './../models/playlist.spotify.model';

@Injectable()
export class PlaylistResolver implements Resolve<Spotify.Playlist> {
  constructor(private spotifyService: SpotifyService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.spotifyService.getPlaylist(route.paramMap.get('id'));
  }
}
