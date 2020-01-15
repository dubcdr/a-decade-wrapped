import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ColorThief from 'color-thief';

import * as Spotify from '../models/playlist.spotify.model';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, AfterViewInit {
  playlist: Spotify.Playlist;
  thief: ColorThief;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService, private renderer: Renderer2) { }

  ngOnInit() {
    this.playlist = this.route.snapshot.data['playlist'];
    this.thief = new ColorThief();
  }

  ngAfterViewInit() {
    document.querySelectorAll('img.track-img').forEach(img => {
      const result = this.thief.getColor(img);
      console.log('result', result);
    })
  }

  playTrack(track: Spotify.Track) {
    this.spotify.playSongFromPlaylist(track.uri, this.playlist.uri).subscribe();
  }

  trackByFn(index, item: Spotify.Item) {
    return item.track.id; // or item.id
  }

}
