import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playlists$ = this.spotify.playlists$;

  constructor(private spotify: SpotifyService, private auth: AuthService) { }

  ngOnInit() {
  }
}
