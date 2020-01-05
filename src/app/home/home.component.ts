import { Component, OnInit } from '@angular/core';
import { FullpageDirective } from '@fullpage/angular-fullpage/lib/fullpage.directive';
import { isNullOrUndefined } from 'util';

import { AuthService } from '../auth.service';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  config = {
    anchors: ['welcome', 'soundsOfDecade', 'deepCuts', 'edten'],
    menu: '#menu',
    afterResize: () => {
      console.log('After resize');
    },
    afterLoad: (origin, dest, dir) => {
      this.handleLoad(dest);
    }
  };
  title = 'decadeWrapped';
  fullpage_api: any;
  playlistItems: object[];

  constructor(private spotify: SpotifyService, private auth: AuthService) { }

  ngOnInit() {
    if (isNullOrUndefined(this.auth.token)) {
      this.auth.login();
    } else {
      this.spotify.getUser().subscribe(console.log)
    }
  }

  getRef(fullPageRef: FullpageDirective) {
    this.fullpage_api = fullPageRef;
  }

  handleLoad(dest) {
    this.spotify.getPlaylist('4BzmTSG6ThJzH5mbwKO69u').subscribe(resp => {
      console.log(resp);
      this.playlistItems = resp;
    });
  }
}
