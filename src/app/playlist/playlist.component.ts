import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as Spotify from '../models/playlist.spotify.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlist: Spotify.Playlist;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.playlist = this.route.snapshot.data['playlist'];
  }

}
