import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as Spotify from '../models/playlist.spotify.model';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlist: Spotify.Playlist;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) { }

  ngOnInit() {
    this.playlist = this.route.snapshot.data['playlist'];
  }

  playTrack(track: Spotify.Track) {
    this.spotify.playSongFromPlaylist(track.uri, this.playlist.uri).subscribe();
  }

  trackByFn(index, item: Spotify.Item) {
    return item.track.id; // or item.id
  }

}
