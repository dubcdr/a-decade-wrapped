import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  currentlyPlaying$ = this.spotify.currentlyPlaying$;

  constructor(private spotify: SpotifyService) { }

  ngOnInit() {

  }

}
